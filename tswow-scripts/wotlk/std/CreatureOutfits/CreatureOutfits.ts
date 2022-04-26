import fs from 'fs';
import path from 'path';
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { creature_template_outfitsRow } from "../../sql/creature_template_outfits";
import { ClassIDs } from "../Class/ClassIDs";
import { Genders } from "../Conditions/Settings/Gender";
import { MainEntity } from "../Misc/Entity";
import { RaceIDs } from "../Race/RaceType";

export type RangedType =
    'MAINHAND_RANGED_ONLY' |
    'OFFHAND_RANGED_ONLY' |
    'MAINHAND_RANGED_AND_MAINHAND' |
    'OFFHAND_RANGED_AND_OFFHAND' |
    'NO_RANGED'
export class CreatureOutfit extends MainEntity<creature_template_outfitsRow> {
    get ID() { return this.row.entry.get(); }

    get NPCSounds() { return this.wrap(this.row.npcsoundsid); }
    get Race() { return makeEnumCell(RaceIDs, this, this.row.race); }
    get Class() { return makeEnumCell(ClassIDs, this, this.row.class); }
    get Gender() { return makeEnumCell(Genders, this, this.row.gender); }
    get Skin() { return this.wrap(this.row.skin); }
    get Face() { return this.wrap(this.row.face); }
    get Hair() { return this.wrap(this.row.hair); }
    get HairColor() { return this.wrap(this.row.haircolor); }
    get FacialHair() { return this.wrap(this.row.facialhair); }
    get Head() { return this.wrap(this.row.head); }
    get Shirt() { return this.wrap(this.row.body)}
    get Shoulders() { return this.wrap(this.row.shoulders); }
    get Chest() { return this.wrap(this.row.chest); }
    get Waist() { return this.wrap(this.row.waist); }
    get Legs() { return this.wrap(this.row.legs); }
    get Feet() { return this.wrap(this.row.feet); }
    get Wrists() { return this.wrap(this.row.wrists); }
    get Hands() { return this.wrap(this.row.hands); }
    get Back() { return this.wrap(this.row.back); }
    get Tabard() { return this.wrap(this.row.tabard); }
    get Guild() { return this.wrap(this.row.guildid); }

    get Mainhand() { return this.wrap(this.row.mainhand); }
    get Offhand() { return this.wrap(this.row.offhand); }
    get Ranged() { return this.wrap(this.row.ranged); }

    fromFile(
          filepath: string
        , ranged: RangedType = 'NO_RANGED'
        , emptyWeaponOverride = true
    ) {
        return this.fromString(
              fs.readFileSync(filepath,'utf-8')
            , ranged
            , emptyWeaponOverride
        )
    }

    fromModuleFile(
          mod: string, filepath: string
        , ranged: RangedType = 'NO_RANGED'
        , emptyWeaponOverride = true
    ) {
        return this.fromFile(
              path.join('modules',mod,filepath)
            , ranged
            , emptyWeaponOverride
        );
    }

    write(filepath: string) {
        let mh = this.Mainhand.get();
        let oh = this.Offhand.get();
        let str =
            `${this.row.description}\n`
        +   `${this.Race.get()} ${this.Gender.get()}\n`
        +   `${this.Skin.get()} ${this.Face.get()} ${this.HairColor.get()} ${this.Hair.get()}`
        +   `${this.Head.get()}\n`
        +   `0\n`
        +   `${this.Shoulders.get()}\n`
        +   `${this.Feet.get()}\n`
        +   `${this.Waist.get()}\n`
        +   `${this.Shirt.get()}\n`
        +   `${this.Legs.get()}\n`
        +   `${this.Chest.get()}\n`
        +   `${this.Wrists.get()}\n`
        +   `${this.Hands.get()}\n`
        +   `${mh<0?0:mh}\n`
        +   `${oh<0?0:oh}\n`
        +   `${this.Back.get()}\j`
        +   `${this.Tabard.get()}\n`
        fs.writeFileSync(filepath,str);
        return this;
    }

    /**
     * @param charStr
     * @param emptyWeaponOverride if true, an empty weapon will
     * @returns
     */
    fromString(
          charStr: string
        , ranged: RangedType = 'NO_RANGED'
        , emptyWeaponOverride = true
    ) {
        const trimmed = charStr.split('.m2')[1];

        const lines = trimmed
            .split('\n')
            .map(x=>x.trimLeft().trimRight())
            .filter(x=>x.length>0) // empty lines are invalid

        const nums = lines
            .map(x=>x.split(' ').map(x=>parseInt(x)));

        this.Race.set        (nums[0][0])
            .Gender.set      (nums[0][1])
            .Skin.set        (nums[1][0])
            .Face.set        (nums[1][1])
            .HairColor.set   (nums[1][2])
            .Hair.set        (nums[1][3])
            .FacialHair.set  (nums[1][4])
            .Head.set        (nums[2][0])
            .Shoulders.set   (nums[4][0])
            .Feet.set        (nums[5][0])
            .Waist.set       (nums[6][0])
            .Shirt.set       (nums[7][0])
            .Legs.set        (nums[8][0])
            .Chest.set       (nums[9][0])
            .Wrists.set      (nums[10][0])
            .Hands.set       (nums[11][0])
            .Mainhand.set    (nums[12][0])
            .Offhand.set     (nums[13][0])
            .Back.set        (nums[14][0])
            .Tabard.set      (nums[15][0])
            .row.description.set(lines[0])

        let mainhand = nums[12][0];
        let offhand = nums[13][0]
        switch(ranged) {
            case 'MAINHAND_RANGED_AND_MAINHAND':
                this.Ranged.set(mainhand)
                break;
            case 'MAINHAND_RANGED_ONLY':
                this.Ranged.set(mainhand);
                mainhand = 0
                break;
            case 'OFFHAND_RANGED_AND_OFFHAND':
                this.Ranged.set(offhand)
                break;
            case 'OFFHAND_RANGED_ONLY':
                this.Ranged.set(offhand)
                offhand = 0
                break;
            default:
                this.Ranged.set(!emptyWeaponOverride ? -1 : 0);
        }
        this.Mainhand.set(
            mainhand === 0 && !emptyWeaponOverride ? -1 : mainhand);
        this.Offhand.set(
            offhand === 0 && !emptyWeaponOverride ? -1 : offhand);
        return this;
    }
}