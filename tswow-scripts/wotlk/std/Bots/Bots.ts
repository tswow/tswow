import * as crypto from 'crypto';
import { finish } from "../../../data";
import { dataset } from '../../../data/Settings';
import { Args } from '../../../util/Args';
import { Ids } from "../Misc/Ids";
import { EntityTags } from "../Tags/Tags";

const bots: {[username: number]: boolean}= {}

export class Bot {
    readonly ID: number;
    constructor(id: number) {
        this.ID = id;
    }
    get Tags() { return new EntityTags(this, this.ID)}
}

export const BotRegistry = {
    create(mod: string, id: string) {
        let bot = new Bot(Ids.Bots.id(mod,id));
        bots[bot.ID] = true;
        return bot;
    }
}

// This is done from datascript so user has a chance to move the password file to another computer to run experiments
finish('generate accounts.json', () => {
    let accounts = dataset.accounts_json.readJson({})
    const validCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789.';
    const randomString = ()=> [...crypto.randomBytes(16)].map(x=>validCharacters[x%validCharacters.length]).join('')
    const resetPasswords = Args.hasFlag('reset-bot-passwords',process.argv);
    if(resetPasswords) {
        console.log('Resetting bot passwords');
    }

    Object.keys(bots).forEach(x=>{
        if(accounts[x] === undefined) {
            accounts[x] = {password: randomString(), username: randomString()};
        } else if(resetPasswords) {
            accounts[x].password = randomString();
        }
    })
    dataset.accounts_json.writeJson(accounts);
});