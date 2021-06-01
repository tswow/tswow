import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { GameObjectTemplate } from "./GameObjectTemplate";

export class GameObjectType<T extends GameObjectTemplate<T>> extends EnumCellWrapper<GameObjectTemplate<T>> {
    @EnumField(0)
    setDoor() { return this.set(0) }
    
    @EnumField(1)
    setButton() { return this.set(1) }
    
    @EnumField(2)
    setQuestgiver() { return this.set(2) }
    
    @EnumField(3)
    setChest() { return this.set(3) }
    
    @EnumField(4)
    setBinder() { return this.set(4) }
    
    @EnumField(5)
    setGeneric() { return this.set(5) }
    
    @EnumField(6)
    setTrap() { return this.set(6) }
    
    @EnumField(7)
    setChair() { return this.set(7) }
    
    @EnumField(8)
    setSpellFocus() { return this.set(8) }
    
    @EnumField(9)
    setText() { return this.set(9) }
    
    @EnumField(10)
    setGoober() { return this.set(10) }
    
    @EnumField(11)
    setTransport() { return this.set(11) }
    
    @EnumField(12)
    setAreadamage() { return this.set(12) }
    
    @EnumField(13)
    setCamera() { return this.set(13) }
    
    @EnumField(14)
    setMapObject() { return this.set(14) }
    
    @EnumField(15)
    setMoTransport() { return this.set(15) }
    
    @EnumField(16)
    setDuelArbiter() { return this.set(16) }
    
    @EnumField(17)
    setFishingnode() { return this.set(17) }
    
    @EnumField(18)
    setRitual() { return this.set(18) }
    
    @EnumField(19)
    setMailbox() { return this.set(19) }
    
    @EnumField(20)
    setAuctionhouse() { return this.set(20) }
    
    @EnumField(21)
    setGuardpost() { return this.set(21) }
    
    @EnumField(22)
    setSpellcaster() { return this.set(22) }
    
    @EnumField(23)
    setMeetingstone() { return this.set(23) }
    
    @EnumField(24)
    setFlagstand() { return this.set(24) }
    
    @EnumField(25)
    setFishinghole() { return this.set(25) }
    
    @EnumField(26)
    setFlagdrop() { return this.set(26) }
    
    @EnumField(27)
    setMiniGame() { return this.set(27) }
    
    @EnumField(28)
    setLotteryKiosk() { return this.set(28) }
    
    @EnumField(29)
    setCapturePoint() { return this.set(29) }
    
    @EnumField(30)
    setAuraGenerator() { return this.set(30) }
    
    @EnumField(31)
    setDungeonDifficulty() { return this.set(31) }
    
    @EnumField(32)
    setBarberChair() { return this.set(32) }
    
    @EnumField(33)
    setDestructibleBuilding() { return this.set(33) }
    
    @EnumField(34)
    setGuildBank() { return this.set(34) }
    
    @EnumField(35)
    setTrapdoor() { return this.set(35) }
}