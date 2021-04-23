import { ipaths } from "../util/Paths";
import { YamlFile, DatabaseType, databaseSettings } from "../util/Yaml";
import { Realm } from "./Realm";
import { DEFAULT_BUILD_TYPE } from "../util/BuildType";

export class NodeConfiguration extends YamlFile {
    constructor() {
        super(ipaths.nodeYaml)
    }

    get default_realm() {
        return this.get('default_realm','tswow');
    }

    get default_dataset() {
        return this.get('default_dataset','default');
    }

    get use_pooling() {
        return this.get('use_pooling',false);
    }

    get default_build_type() { 
        return this.get('default_build_type',DEFAULT_BUILD_TYPE);
    }

    get mysql_executable() {
        return this.get<string|undefined>('mysql_executable',undefined);
    }

    get autostart_client() {
        return this.get<boolean>('autostart_client',true);
    }

    get autostart_realms() {
        return this.get<string[]>('autostart_realms',[])
            .map(x=>Realm.getRealm(x));
    }

    get autostart_authserver() {
        return this.get('autostart_authserver',true);
    }

    get write_pos_to_clipboard() {
        return this.get('write_pos_to_clipboard',true)
    }

    database_settings(database: DatabaseType, nameOverride?: string) {
        return databaseSettings(database,nameOverride);
    }
}

export const NodeConfig = new NodeConfiguration();