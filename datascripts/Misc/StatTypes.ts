import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class StatType<T> extends EnumCell<T> {
    /** Enum Value:                               1 */
    get Health()              { return this.value(1) }
    /** Enum Value:                               2 */
    get Mana()                { return this.value(2) }
    /** Enum Value:                               3 */
    get Agility()             { return this.value(3) }
    /** Enum Value:                               4 */
    get Strength()            { return this.value(4) }
    /** Enum Value:                               5 */
    get Intellect()           { return this.value(5) }
    /** Enum Value:                               6 */
    get Spirit()              { return this.value(6) }
    /** Enum Value:                               7 */
    get Stamina()             { return this.value(7) }
    /** Enum Value:                               12 */
    get DefenseRating()       { return this.value(12) }
    /** Enum Value:                               13 */
    get DodgeRating()         { return this.value(13) }
    /** Enum Value:                               14 */
    get ParryRating()         { return this.value(14) }
    /** Enum Value:                               15 */
    get ShieldBlock()         { return this.value(15) }
    /** Enum Value:                               16 */
    get MeleeHit()            { return this.value(16) }
    /** Enum Value:                               17 */
    get RangedHit()           { return this.value(17) }
    /** Enum Value:                               18 */
    get SpellHit()            { return this.value(18) }
    /** Enum Value:                               19 */
    get MeleeCrit()           { return this.value(19) }
    /** Enum Value:                               20 */
    get RangedCrit()          { return this.value(20) }
    /** Enum Value:                               21 */
    get SpellCrit()           { return this.value(21) }
    /** Enum Value:                               22 */
    get MeleeHitAvoidance()   { return this.value(22) }
    /** Enum Value:                               23 */
    get RangedHitAvoidance()  { return this.value(23) }
    /** Enum Value:                               24 */
    get SpellHitAvoidance()   { return this.value(24) }
    /** Enum Value:                               25 */
    get MeleeCritAvoidance()  { return this.value(25) }
    /** Enum Value:                               26 */
    get RangedCritAvoidance() { return this.value(26) }
    /** Enum Value:                               27 */
    get SpellCritAvoidance()  { return this.value(27) }
    /** Enum Value:                               28 */
    get MeleeHaste()          { return this.value(28) }
    /** Enum Value:                               29 */
    get RangedHaste()         { return this.value(29) }
    /** Enum Value:                               30 */
    get SpellHaste()          { return this.value(30) }
    /** Enum Value:                               31 */
    get HitRating()           { return this.value(31) }
    /** Enum Value:                               32 */
    get CritRating()          { return this.value(32) }
    /** Enum Value:                               33 */
    get HitAvoidance()        { return this.value(33) }
    /** Enum Value:                               34 */
    get CritAvoidance()       { return this.value(34) }
    /** Enum Value:                               35 */
    get Resilience()          { return this.value(35) }
    /** Enum Value:                               36 */
    get Haste()               { return this.value(36) }
    /** Enum Value:                               37 */
    get Expertise()           { return this.value(37) }
    /** Enum Value:                               38 */
    get AttackPower()         { return this.value(38) }
    /** Enum Value:                               39 */
    get RangedPower()         { return this.value(39) }
    /** Enum Value:                               40 */
    get FeralPower()          { return this.value(40) }
    /** Enum Value:                               41 */
    get DamageDone()          { return this.value(41) }
    /** Enum Value:                               42 */
    get HealingDone()         { return this.value(42) }
    /** Enum Value:                               43 */
    get ManaPer5Seconds()     { return this.value(43) }
    /** Enum Value:                               44 */
    get ArmorPenetration()    { return this.value(44) }
    /** Enum Value:                               45 */
    get Spellpower()          { return this.value(45) }
    /** Enum Value:                               46 */
    get HealthPer5Seconds()   { return this.value(46) }
    /** Enum Value:                               47 */
    get SpellPenetration()    { return this.value(47) }
    /** Enum Value:                               48 */
    get BlockValue()          { return this.value(48) }
}