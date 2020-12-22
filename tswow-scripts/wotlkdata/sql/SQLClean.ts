import { SqlConnection } from "./SQLConnection";

export function cleanSQL() {
    const waits : Promise<any>[] = [];
    function q(sql: string) {
        waits.push(SqlConnection.queryDest(sql));
    }

    q('DELETE FROM smart_scripts WHERE comment = "tswow";');
    q('DELETE FROM gossip_menu_option WHERE VerifiedBuild = 17688;')
    q('DELETE FROM trainer_spell WHERE VerifiedBuild = 17688;')
    q('DELETE FROM waypoints WHERE point_comment = "tswow";')
    q('DELETE FROM npc_vendor WHERE VerifiedBuild = 17688;')

    q('DELETE FROM mail_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM creature_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM disenchant_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM gameobject_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM item_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM milling_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM pickpocketing_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM prospecting_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM reference_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM skinning_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM spell_loot_template WHERE Comment = "tswow";')

    return Promise.all(waits);
}