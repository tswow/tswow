import { Enum, EnumField } from "./node_modules/wotlkdata/cell/systems/Enum";

export class SoundType<T> extends Enum<T> {
    @EnumField(0)
    setUnusedmiscellaneous() { return this.set(0) }
    
    @EnumField(1)
    setSpells() { return this.set(1) }
    
    @EnumField(2)
    setUi() { return this.set(2) }
    
    @EnumField(3)
    setFootsteps1() { return this.set(3) }
    
    @EnumField(4)
    setWeaponsimpact() { return this.set(4) }
    
    @EnumField(6)
    setWeaponsmiss() { return this.set(6) }
    
    @EnumField(7)
    setGreetings() { return this.set(7) }
    
    @EnumField(8)
    setCasting() { return this.set(8) }
    
    @EnumField(9)
    setPickupputdown() { return this.set(9) }
    
    @EnumField(10)
    setNpccombat() { return this.set(10) }
    
    @EnumField(12)
    setErrors() { return this.set(12) }
    
    @EnumField(13)
    setBirds() { return this.set(13) }
    
    @EnumField(14)
    setObjects() { return this.set(14) }
    
    @EnumField(16)
    setDeath() { return this.set(16) }
    
    @EnumField(17)
    setNpcgreetings() { return this.set(17) }
    
    @EnumField(18)
    setTesttemporary() { return this.set(18) }
    
    @EnumField(19)
    setArmorfoley() { return this.set(19) }
    
    @EnumField(20)
    setFootsteps2() { return this.set(20) }
    
    @EnumField(21)
    setWatercharacter() { return this.set(21) }
    
    @EnumField(22)
    setWaterliquid() { return this.set(22) }
    
    @EnumField(23)
    setTradeskills() { return this.set(23) }
    
    @EnumField(25)
    setDoodads() { return this.set(25) }
    
    @EnumField(26)
    setSpellfizzle() { return this.set(26) }
    
    @EnumField(27)
    setNpcloops() { return this.set(27) }
    
    @EnumField(28)
    setZonemusic() { return this.set(28) }
    
    @EnumField(29)
    setEmotes() { return this.set(29) }
    
    @EnumField(30)
    setNarrationmusic() { return this.set(30) }
    
    @EnumField(31)
    setNarration() { return this.set(31) }
    
    @EnumField(50)
    setZoneambience() { return this.set(50) }
}