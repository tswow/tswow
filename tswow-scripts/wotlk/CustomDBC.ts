import { DBCFile } from "../data/dbc/DBCFile";
import { loc_constructor } from "../data/primitives";
import { dataset } from "../data/Settings";
import { SqlTable } from "../data/sql/SQLTable";
import { BroadcastTextDBCFile, BroadcastTextRow } from "./custom_dbc/BroadcastText";
import { CreatureDBCFile, CreatureRow } from "./custom_dbc/Creature";
import { CreatureTemplateDBCFile, CreatureTemplateRow } from "./custom_dbc/CreatureTemplate";
import { GameObjectDBCFile, GameObjectRow } from "./custom_dbc/GameObject";
import { GameObjectTemplateDBCFile, GameObjectTemplateRow } from "./custom_dbc/GameObjectTemplate";
import { ItemTemplateDBCFile, ItemTemplateRow } from "./custom_dbc/ItemTemplate";
import { SQL } from "./SQLFiles";

class LocCollector {
    locs: {[entry: number]: loc_constructor} = {}
    add(entry: number, loc: string, value: string) {
        if(value != undefined && value.length > 0) {
            let entryObj = (this.locs[entry] || (this.locs[entry] = {}))
            entryObj[loc] = value;
        }
    }

    get(entry: number, enGB: string) {
        return {enGB, ...this.locs[entry] || {}}
    }
}

export function GenerateCustomDBC() {
    if(!dataset.dbc_source_server.exists()) {
        dataset.dbc_source_server.mkdir();
    }

    if(!dataset.dbc_source_server.Creature.exists()) {
        console.log('Populating Creature.dbc')
        const dbc = new CreatureDBCFile()
        DBCFile.initialize(dbc,CreatureRow.SIZE);
        SQL.creature
            .queryAll({})
            .sort((a,b)=>a.guid.get() > b.guid.get() ? 1 : -1)
            .forEach((x,i,a)=>{
                dbc.add(x.guid.get())
                    .id.set(x.id.get())
                    .map.set(x.map.get())
                    .zoneId.set(x.zoneId.get())
                    .areaId.set(x.areaId.get())
                    .spawnMask.set(x.spawnMask.get())
                    .phaseMask.set(x.phaseMask.get())
                    .modelid.set(x.modelid.get())
                    .equipment_id.set(x.equipment_id.get())
                    .position_x.set(x.position_x.get())
                    .position_y.set(x.position_y.get())
                    .position_z.set(x.position_z.get())
                    .orientation.set(x.orientation.get())
                    .spawntimesecs.set(x.spawntimesecs.get())
                    .wander_distance.set(x.wander_distance.get())
                    .currentwaypoint.set(x.currentwaypoint.get())
                    .curhealth.set(x.curhealth.get())
                    .curmana.set(x.curmana.get())
                    .MovementType.set(x.MovementType.get())
                    .npcflag.set(x.npcflag.get())
                    .unit_flags.set(x.unit_flags.get())
                    .dynamicflags.set(x.dynamicflags.get())
                    .ScriptName.set(x.ScriptName.get())
        })

        console.log(dbc.query({guid: 25}).objectify())
        SqlTable.flushCache(SQL.creature)
        dbc.write(dataset.dbc_source_server.Creature.get())
    }

    if(!dataset.dbc_source_server.CreatureTemplate.exists()) {
        console.log('Populating CreatureTemplate.dbc')
        const names = new LocCollector();
        const titles = new LocCollector();
        const dbc = new CreatureTemplateDBCFile()
        DBCFile.initialize(dbc,CreatureTemplateRow.SIZE);
        SQL.creature_template_locale
            .queryAll({})
            .forEach(x=>{
                names.add(x.entry.get(), x.locale.get(), x.Name.get())
                titles.add(x.entry.get(), x.locale.get(), x.Title.get())
            })
        dataset.dbc_source_server.CreatureTemplate.writeBuffer(Buffer.alloc(0));
        SQL.creature_template
            .queryAll({})
            .sort((a,b)=>a.entry.get() > b.entry.get() ? 1 : -1)
            .forEach(x=>{
                dbc.add(x.entry.get())
                    .difficulty_entry_1.set(x.difficulty_entry_1.get())
                    .difficulty_entry_2.set(x.difficulty_entry_2.get())
                    .difficulty_entry_3.set(x.difficulty_entry_3.get())
                    .KillCredit1.set(x.KillCredit1.get())
                    .KillCredit2.set(x.KillCredit2.get())
                    .modelid1.set(x.modelid1.get())
                    .modelid2.set(x.modelid2.get())
                    .modelid3.set(x.modelid3.get())
                    .modelid4.set(x.modelid4.get())
                    .name.clear(0)
                    .name.set(names.get(x.entry.get(), x.name.get()))
                    .subname.clear(0)
                    .subname.set(titles.get(x.entry.get(), x.subname.get()))
                    .IconName.set(x.IconName.get())
                    .gossip_menu_id.set(x.gossip_menu_id.get())
                    .minlevel.set(x.minlevel.get())
                    .maxlevel.set(x.maxlevel.get())
                    .exp.set(x.exp.get())
                    .faction.set(x.faction.get())
                    .npcflag.set(x.npcflag.get())
                    .speed_walk.set(x.speed_walk.get())
                    .speed_run.set(x.speed_run.get())
                    .scale.set(x.scale.get())
                    .rank.set(x.rank.get())
                    .dmgschool.set(x.dmgschool.get())
                    .BaseAttackTime.set(x.BaseAttackTime.get())
                    .RangeAttackTime.set(x.RangeAttackTime.get())
                    .BaseVariance.set(x.BaseVariance.get())
                    .RangeVariance.set(x.RangeVariance.get())
                    .unit_class.set(x.unit_class.get())
                    .unit_flags.set(x.unit_flags.get())
                    .unit_flags2.set(x.unit_flags2.get())
                    .dynamicflags.set(x.dynamicflags.get())
                    .family.set(x.family.get())
                    .type.set(x.type.get())
                    .type_flags.set(x.type_flags.get())
                    .lootid.set(x.lootid.get())
                    .pickpocketloot.set(x.pickpocketloot.get())
                    .skinloot.set(x.skinloot.get())
                    .PetSpellDataId.set(x.PetSpellDataId.get())
                    .VehicleId.set(x.VehicleId.get())
                    .mingold.set(x.mingold.get())
                    .maxgold.set(x.maxgold.get())
                    .AIName.set(x.AIName.get())
                    .MovementType.set(x.MovementType.get())
                    .HoverHeight.set(x.HoverHeight.get())
                    .HealthModifier.set(x.HealthModifier.get())
                    .ManaModifier.set(x.ManaModifier.get())
                    .ArmorModifier.set(x.ArmorModifier.get())
                    .DamageModifier.set(x.DamageModifier.get())
                    .ExperienceModifier.set(x.ExperienceModifier.get())
                    .RacialLeader.set(x.RacialLeader.get())
                    .movementId.set(x.movementId.get())
                    .RegenHealth.set(x.RegenHealth.get())
                    .mechanic_immune_mask.set(x.mechanic_immune_mask.get())
                    .spell_school_immune_mask.set(x.spell_school_immune_mask.get())
                    .flags_extra.set(x.flags_extra.get())
                    .ScriptName.set(x.ScriptName.get())
                })
        SqlTable.flushCache(SQL.creature_template)
        SqlTable.flushCache(SQL.creature_template_locale)
        dbc.write(dataset.dbc_source_server.CreatureTemplate.get())
    }

    if(!dataset.dbc_source_server.GameObject.exists()) {
        console.log('Populating GameObject.dbc')
        const dbc = new GameObjectDBCFile()
        DBCFile.initialize(dbc,GameObjectRow.SIZE);
        SQL.gameobject
            .queryAll({})
            .sort((a,b)=>a.guid.get() > b.guid.get() ? 1 : -1)
            .forEach(x=>{
            dbc.add(x.guid.get())
                .ScriptName.set(x.ScriptName.get())
                .animprogress.set(x.animprogress.get())
                .areaId.set(x.areaId.get())
                .id.set(x.id.get())
                .map.set(x.map.get())
                .orientation.set(x.orientation.get())
                .phaseMask.set(x.phaseMask.get())
                .position_x.set(x.position_x.get())
                .position_y.set(x.position_y.get())
                .position_z.set(x.position_z.get())
                .rotation0.set(x.rotation0.get())
                .rotation1.set(x.rotation1.get())
                .rotation2.set(x.rotation2.get())
                .rotation3.set(x.rotation3.get())
                .spawnMask.set(x.spawnMask.get())
                .spawntimesecs.set(x.spawntimesecs.get())
                .state.set(x.state.get())
                .zoneId.set(x.zoneId.get())
        })
        SqlTable.flushCache(SQL.gameobject)
        dbc.write(dataset.dbc_source_server.GameObject.get())
    }

    if(!dataset.dbc_source_server.GameObjectTemplate.exists()) {
        console.log('Populating GameObjectTemplate.dbc')
        dataset.dbc_source_server.GameObjectTemplate.writeBuffer(Buffer.alloc(0));
        const dbc = new GameObjectTemplateDBCFile();
        DBCFile.initialize(dbc, GameObjectTemplateRow.SIZE);

        const names = new LocCollector();
        const captions = new LocCollector();

        SQL.gameobject_template_locale.queryAll({}).forEach(x=>{
            names.add(x.entry.get(), x.locale.get(), x.name.get());
            captions.add(x.entry.get(), x.locale.get(), x.castBarCaption.get());
        })

        SQL.gameobject_template
            .queryAll({})
            .sort((a,b)=>a.entry.get() > b.entry.get() ? 1 : -1)
            .forEach(x=>{
                dbc.add(x.entry.get())
                    .type.set(x.type.get())
                    .displayId.set(x.displayId.get())
                    .name.clear(0)
                    .name.set(names.get(x.entry.get(),x.name.get()))
                    .IconName.set(x.IconName.get())
                    .castBarCaption.clear(0)
                    .castBarCaption.set(captions.get(x.entry.get(),x.castBarCaption.get()))
                    .unk1.set(x.unk1.get())
                    .size.set(x.size.get())
                    .Data0.set(x.Data0.get())
                    .Data1.set(x.Data1.get())
                    .Data2.set(x.Data2.get())
                    .Data3.set(x.Data3.get())
                    .Data4.set(x.Data4.get())
                    .Data5.set(x.Data5.get())
                    .Data6.set(x.Data6.get())
                    .Data7.set(x.Data7.get())
                    .Data8.set(x.Data8.get())
                    .Data9.set(x.Data9.get())
                    .Data10.set(x.Data10.get())
                    .Data11.set(x.Data11.get())
                    .Data12.set(x.Data12.get())
                    .Data13.set(x.Data13.get())
                    .Data14.set(x.Data14.get())
                    .Data15.set(x.Data15.get())
                    .Data16.set(x.Data16.get())
                    .Data17.set(x.Data17.get())
                    .Data18.set(x.Data18.get())
                    .Data19.set(x.Data19.get())
                    .Data20.set(x.Data20.get())
                    .Data21.set(x.Data21.get())
                    .Data22.set(x.Data22.get())
                    .Data23.set(x.Data23.get())
                    .AIName.set(x.AIName.get())
                    .ScriptName.set(x.ScriptName.get())
            });

        dbc.write(dataset.dbc_source_server.GameObjectTemplate.get())
        SqlTable.flushCache(SQL.gameobject_template)
    }

    if(!dataset.dbc_source_server.ItemTemplate.exists()) {
        console.log('Populating ItemTemplate.dbc')
        const dbc = new ItemTemplateDBCFile()
        DBCFile.initialize(dbc,ItemTemplateRow.SIZE);
        let names = new LocCollector();
        let descriptions = new LocCollector();
        SQL.item_template_locale.queryAll({})
            .forEach(x=>{
                names.add(x.ID.get(), x.locale.get(), x.Name.get());
                descriptions.add(x.ID.get(), x.locale.get(), x.Description.get());
            })

        SQL.item_template
            .queryAll({})
            .sort((a,b)=>a.entry.get() > b.entry.get() ? 1 : -1)
            .forEach(x=>{
                dbc.add(x.entry.get())
                    .name.clear(0)
                    .description.clear(0)
                    .name.set(names.get(x.entry.get(), x.name.get()))
                    .description.set(descriptions.get(x.entry.get(), x.description.get()))
                    .AllowableClass.set(x.AllowableClass.get())
                    .AllowableRace.set(x.AllowableRace.get())
                    .ArmorDamageModifier.set(x.ArmorDamageModifier.get())
                    .BagFamily.set(x.BagFamily.get())
                    .BuyCount.set(x.BuyCount.get())
                    .BuyPrice.set(Number(x.BuyPrice.get()))
                    .ContainerSlots.set(x.ContainerSlots.get())
                    .DisenchantID.set(x.DisenchantID.get())
                    .Flags.set(x.Flags.get())
                    .FlagsExtra.set(x.FlagsExtra.get())
                    .FoodType.set(x.FoodType.get())
                    .GemProperties.set(x.GemProperties.get())
                    .HolidayId.set(x.HolidayId.get())
                    .InventoryType.set(x.InventoryType.get())
                    .ItemLevel.set(x.ItemLevel.get())
                    .ItemLimitCategory.set(x.ItemLimitCategory.get())
                    .LanguageID.set(x.LanguageID.get())
                    .Map.set(x.Map.get())
                    .Material.set(x.Material.get())
                    .MaxDurability.set(x.MaxDurability.get())
                    .PageMaterial.set(x.PageMaterial.get())
                    .PageText.set(x.PageText.get())
                    .Quality.set(x.Quality.get())
                    .RandomProperty.set(x.RandomProperty.get())
                    .RandomSuffix.set(x.RandomSuffix.get())
                    .RangedModRange.set(x.RangedModRange.get())
                    .RequiredCityRank.set(x.RequiredCityRank.get())
                    .RequiredDisenchantSkill.set(x.RequiredDisenchantSkill.get())
                    .RequiredLevel.set(x.RequiredLevel.get())
                    .RequiredReputationFaction.set(x.RequiredReputationFaction.get())
                    .RequiredReputationRank.set(x.RequiredReputationRank.get())
                    .RequiredSkill.set(x.RequiredSkill.get())
                    .RequiredSkillRank.set(x.RequiredSkillRank.get())
                    .ScalingStatDistribution.set(x.ScalingStatDistribution.get())
                    .ScalingStatValue.set(x.ScalingStatValue.get())
                    .ScriptName.set(x.ScriptName.get())
                    .SellPrice.set(x.SellPrice.get())
                    .SoundOverrideSubclass.set(x.SoundOverrideSubclass.get())
                    .StatsCount.set(x.StatsCount.get())
                    .TotemCategory.set(x.TotemCategory.get())
                    .ammo_type.set(x.ammo_type.get())
                    .arcane_res.set(x.arcane_res.get())
                    .area.set(x.area.get())
                    .armor.set(x.armor.get())
                    .block.set(x.block.get())
                    .bonding.set(x.bonding.get())
                    .class.set(x.class.get())
                    .delay.set(x.delay.get())
                    .displayid.set(x.displayid.get())
                    .dmg_max1.set(x.dmg_max1.get())
                    .dmg_max2.set(x.dmg_max2.get())
                    .dmg_min1.set(x.dmg_min1.get())
                    .dmg_min2.set(x.dmg_min2.get())
                    .dmg_type1.set(x.dmg_type1.get())
                    .dmg_type2.set(x.dmg_type2.get())
                    .duration.set(x.duration.get())
                    .ScriptName.set(x.ScriptName.get())
                    .fire_res.set(x.fire_res.get())
                    .flagsCustom.set(x.flagsCustom.get())
                    .frost_res.set(x.frost_res.get())
                    .holy_res.set(x.holy_res.get())
                    .itemset.set(x.itemset.get())
                    .lockid.set(x.lockid.get())
                    .maxMoneyLoot.set(x.maxMoneyLoot.get())
                    .maxcount.set(x.maxcount.get())
                    .minMoneyLoot.set(x.minMoneyLoot.get())
                    .nature_res.set(x.nature_res.get())
                    .requiredspell.set(x.requiredspell.get())
                    .shadow_res.set(x.shadow_res.get())
                    .sheath.set(x.sheath.get())
                    .socketBonus.set(x.socketBonus.get())
                    .socketColor_1.set(x.socketColor_1.get())
                    .socketColor_2.set(x.socketColor_2.get())
                    .socketColor_3.set(x.socketColor_3.get())
                    .socketContent_1.set(x.socketContent_1.get())
                    .socketContent_2.set(x.socketContent_2.get())
                    .socketContent_3.set(x.socketContent_3.get())
                    .spellcategory_1.set(x.spellcategory_1.get())
                    .spellcategory_2.set(x.spellcategory_2.get())
                    .spellcategory_3.set(x.spellcategory_3.get())
                    .spellcategory_4.set(x.spellcategory_4.get())
                    .spellcategory_5.set(x.spellcategory_5.get())
                    .spellcategorycooldown_1.set(x.spellcategorycooldown_1.get())
                    .spellcategorycooldown_2.set(x.spellcategorycooldown_2.get())
                    .spellcategorycooldown_3.set(x.spellcategorycooldown_3.get())
                    .spellcategorycooldown_4.set(x.spellcategorycooldown_4.get())
                    .spellcategorycooldown_5.set(x.spellcategorycooldown_5.get())
                    .spellcharges_1.set(x.spellcharges_1.get())
                    .spellcharges_2.set(x.spellcharges_2.get())
                    .spellcharges_3.set(x.spellcharges_3.get())
                    .spellcharges_4.set(x.spellcharges_4.get())
                    .spellcharges_5.set(x.spellcharges_5.get())
                    .spellcooldown_1.set(x.spellcooldown_1.get())
                    .spellcooldown_2.set(x.spellcooldown_2.get())
                    .spellcooldown_3.set(x.spellcooldown_3.get())
                    .spellcooldown_4.set(x.spellcooldown_4.get())
                    .spellcooldown_5.set(x.spellcooldown_5.get())
                    .spellid_1.set(x.spellid_1.get())
                    .spellid_2.set(x.spellid_2.get())
                    .spellid_3.set(x.spellid_3.get())
                    .spellid_4.set(x.spellid_4.get())
                    .spellid_5.set(x.spellid_5.get())
                    .spellppmRate_1.set(x.spellppmRate_1.get())
                    .spellppmRate_2.set(x.spellppmRate_2.get())
                    .spellppmRate_3.set(x.spellppmRate_3.get())
                    .spellppmRate_4.set(x.spellppmRate_4.get())
                    .spellppmRate_5.set(x.spellppmRate_5.get())
                    .spelltrigger_1.set(x.spelltrigger_1.get())
                    .spelltrigger_2.set(x.spelltrigger_2.get())
                    .spelltrigger_3.set(x.spelltrigger_3.get())
                    .spelltrigger_4.set(x.spelltrigger_4.get())
                    .spelltrigger_5.set(x.spelltrigger_5.get())
                    .stackable.set(x.stackable.get())
                    .startquest.set(x.startquest.get())
                    .stat_type1.set(x.stat_type1.get())
                    .stat_type2.set(x.stat_type2.get())
                    .stat_type3.set(x.stat_type3.get())
                    .stat_type4.set(x.stat_type4.get())
                    .stat_type5.set(x.stat_type5.get())
                    .stat_type6.set(x.stat_type6.get())
                    .stat_type7.set(x.stat_type7.get())
                    .stat_type8.set(x.stat_type8.get())
                    .stat_type9.set(x.stat_type9.get())
                    .stat_type10.set(x.stat_type10.get())
                    .stat_value1.set(x.stat_value1.get())
                    .stat_value2.set(x.stat_value2.get())
                    .stat_value3.set(x.stat_value3.get())
                    .stat_value4.set(x.stat_value4.get())
                    .stat_value5.set(x.stat_value5.get())
                    .stat_value6.set(x.stat_value6.get())
                    .stat_value7.set(x.stat_value7.get())
                    .stat_value8.set(x.stat_value8.get())
                    .stat_value9.set(x.stat_value9.get())
                    .stat_value10.set(x.stat_value10.get())
                    .subclass.set(x.subclass.get())
            })

        console.log(dbc.query({entry:25}).objectify())
        SqlTable.flushCache(SQL.item_template)
        SqlTable.flushCache(SQL.item_template_locale)
        dbc.write(dataset.dbc_source_server.ItemTemplate.get())
    }

    if(!dataset.dbc_source_server.BroadcastText.exists()) {
        console.log('Populating BroadcastText.dbc')
        dataset.dbc_source_server.BroadcastText.writeBuffer(Buffer.alloc(0));
        const dbc = new BroadcastTextDBCFile()
        DBCFile.initialize(dbc,BroadcastTextRow.SIZE);
        let text = new LocCollector();
        let text1 = new LocCollector();
        SQL.broadcast_text_locale.queryAll({})
            .forEach(x=>{
                text.add(x.ID.get(), x.locale.get(), x.Text.get());
                text1.add(x.ID.get(), x.locale.get(), x.Text1.get());
            })
        SQL.broadcast_text
            .queryAll({})
            .sort((a,b)=>a.ID.get() > b.ID.get() ? 1 : -1)
            .forEach(x=>{
                dbc.add(x.ID.get())
                    .Text.clear(0)
                    .Text1.clear(0)
                    .Text.set(text.get(x.ID.get(),x.Text.get()))
                    .Text1.set(text.get(x.ID.get(),x.Text1.get()))
                    .EmoteDelay1.set(x.EmoteDelay1.get())
                    .EmoteDelay2.set(x.EmoteDelay2.get())
                    .EmoteDelay3.set(x.EmoteDelay3.get())
                    .EmoteID1.set(x.EmoteID1.get())
                    .EmoteID2.set(x.EmoteID2.get())
                    .EmoteID3.set(x.EmoteID3.get())
                    .EmotesID.set(x.EmotesID.get())
                    .Flags.set(x.Flags.get())
                    .LanguageID.set(x.LanguageID.get())
                    .SoundEntriesID.set(x.SoundEntriesID.get())
        })
        dbc.write(dataset.dbc_source_server.BroadcastText.get())
        SqlTable.flushCache(SQL.broadcast_text)
        SqlTable.flushCache(SQL.broadcast_text_locale)
    }
}