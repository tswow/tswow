/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Cell } from "../../../data/cell/cells/Cell";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SQL } from "../../SQLFiles";
import { quest_template_addonRow } from "../../sql/quest_template_addon";
import { ClassMask } from "../Class/ClassRegistry";
import { MailTemplateRegistry } from "../Mail/MailTemplate";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { SpellRegistry } from "../Spell/Spells";
import { Quest } from "./Quest";
import { QuestRegistry } from "./Quests";
import { QuestSpecialFlags } from "./QuestSpecialFlags";

export class QuestRequiredReputation extends CellSystem<Quest> {
    @Transient
    private facCell: Cell<number,any>;
    @Transient
    private repCell: Cell<number,any>;

    constructor(owner: Quest, facCell: Cell<number,any>, repCell: Cell<number,any>) {
        super(owner);
        this.facCell = facCell;
        this.repCell = repCell;
    }

    get Faction() { return this.ownerWrap(this.facCell)}
    get Reputation() { return this.ownerWrap(this.repCell)}

    set(faction: number, reputation: number) {
        this.Faction.set(faction);
        this.Reputation.set(reputation);
        return this.owner;
    }
}

export class QuestRequiredSkill extends CellSystem<Quest> {
    @Transient
    private skillCell: Cell<number,any>;
    @Transient
    private pointsCell: Cell<number,any>;

    constructor(owner: Quest, facCell: Cell<number,any>, repCell: Cell<number,any>) {
        super(owner);
        this.skillCell = facCell;
        this.pointsCell = repCell;
    }

    get Skill() { return this.ownerWrap(this.skillCell)}
    get Points() { return this.ownerWrap(this.pointsCell)}

    set(skill: number, points: number) {
        this.Skill.set(skill);
        this.Points.set(points);
        return this.owner;
    }
}

export class QuestRewardMail extends CellSystem<Quest> {
    @Transient
    private templateCell: Cell<number,any>;
    @Transient
    private delayCell: Cell<number,any>;

    constructor(owner: Quest, templateCell: Cell<number,any>, delayCell: Cell<number,any>) {
        super(owner);
        this.templateCell = templateCell;
        this.delayCell = delayCell;
    }

    get MailTemplate() { return MailTemplateRegistry.ref(this.owner, this.templateCell); }
    get Delay() { return this.ownerWrap(this.delayCell)}

    set(skill: number, points: number) {
        this.templateCell.set(skill);
        this.delayCell.set(points);
        return this.owner;
    }
}

export class QuestAddon extends MaybeSQLEntity<Quest,quest_template_addonRow> {
    protected createSQL(): quest_template_addonRow {
        return SQL.quest_template_addon.add(this.owner.ID)
            .ExclusiveGroup.set(0)
            .AllowableClasses.set(0)
            .SourceSpellID.set(0)
            .PrevQuestID.set(0)
            .NextQuestID.set(0)
            .ProvidedItemCount.set(0)
            .RequiredMaxRepFaction.set(0)
            .RequiredMaxRepValue.set(0)
            .RequiredMinRepFaction.set(0)
            .RequiredMinRepValue.set(0)
            .RequiredSkillID.set(0)
            .RequiredSkillPoints.set(0)
            .RewardMailDelay.set(0)
            .RewardMailTemplateID.set(0)
            .SourceSpellID.set(0)
            .SpecialFlags.set(0)
    }
    protected findSQL(): quest_template_addonRow {
        return SQL.quest_template_addon.query({ID:this.owner.ID});
    }
    protected isValidSQL(sql: quest_template_addonRow): boolean {
        return sql.ID.get() === this.owner.ID;
    }

    get ClassMask() {
        return makeMaskCell32(ClassMask, this.owner, this.wrapSQL(0, sql=>sql.AllowableClasses))
    }

    get MaxLevel() {
        return this.wrapSQL(0, sql=>sql.MaxLevel);
    }

    get SourceSpell() {
        return SpellRegistry.ref(this.owner, this.wrapSQL(0, sql=>sql.SourceSpellID))
    }

    get PrevQuest() {
        return this.wrapSQL(0,sql=>sql.PrevQuestID);
    }

    get NextQuest() {
        return this.wrapSQL(0,sql=>sql.NextQuestID);
    }

    get ProvidedItemCount() {
        return this.wrapSQL(0,sql=>sql.ProvidedItemCount);
    }

    get SpecialFlags() {
        return makeMaskCell32(QuestSpecialFlags,this.owner, this.wrapSQL(0,sql=>sql.SpecialFlags));
    }

    get BreadcrumbForQuest() {
        return QuestRegistry.ref(this.owner,this.wrapSQL(0,sql=>sql.BreadcrumbForQuestId))
    }

    get ExclusiveGroup() {
        return this.wrapSQL(0,sql=>sql.ExclusiveGroup);
    }

    get MinReputation() {
        return new QuestRequiredReputation(
              this.owner
            , this.wrapSQL(0,sql=>sql.RequiredMinRepFaction)
            , this.wrapSQL(0,sql=>sql.RequiredMinRepValue)
        )
    }

    get MaxReputation() {
        return new QuestRequiredReputation(
              this.owner
            , this.wrapSQL(0,sql=>sql.RequiredMaxRepFaction)
            , this.wrapSQL(0,sql=>sql.RequiredMaxRepValue)
        )
    }

    get RequiredSkill() {
        return new QuestRequiredSkill(
              this.owner
            , this.wrapSQL(0,sql=>sql.RequiredSkillID)
            , this.wrapSQL(0,sql=>sql.RequiredSkillPoints)
        )
    }

    get RewardMail() {
        return new QuestRewardMail(
              this.owner
            , this.wrapSQL(0,sql=>sql.RewardMailTemplateID)
            , this.wrapSQL(0,sql=>sql.RewardMailDelay)
        )
    }
}