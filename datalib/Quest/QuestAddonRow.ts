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
import { SQL } from "wotlkdata";

export function addonRow(id: number) {
    let addonrow = SQL.quest_template_addon.find({ID:id});
    if(addonrow !== undefined ) {
        return addonrow;
    }
    return SQL.quest_template_addon.add(id,{
        AllowableClasses: 0,
        ExclusiveGroup: 0,
        MaxLevel: 0,
        NextQuestID: 0,
        PrevQuestID: 0,
        ProvidedItemCount: 0,
        RequiredMaxRepFaction: 0,
        RequiredMaxRepValue: 0,
        RequiredMinRepFaction: 0,
        RequiredMinRepValue: 0,
        RequiredSkillID: 0,
        RequiredSkillPoints: 0,
        RewardMailDelay: 0,
        RewardMailTemplateID :0,
        SourceSpellID: 0,
        SpecialFlags: 0,
    });
}