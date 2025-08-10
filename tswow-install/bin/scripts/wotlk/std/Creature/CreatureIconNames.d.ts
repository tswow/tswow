import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureIconNames extends CellSystem<CreatureTemplate> {
    set(value: string): CreatureTemplate;
    /** Used by most creatures */
    setNone(): CreatureTemplate;
    /** Used for Guards and Teleporter NPC's  */
    setDirections(): CreatureTemplate;
    /** Indicator of a Turrent NPC/Player controlled */
    setGunner(): CreatureTemplate;
    /** Indicator that this is a PCV (Player Controlled Vehicle) */
    setVehicle(): CreatureTemplate;
    /** Shows a Steering Wheel icon when mouse over. */
    setDriver(): CreatureTemplate;
    /** Shows a Sword icon indicating you can attack this target */
    setAttack(): CreatureTemplate;
    /** Shows a brown bag icon usually if the NPC only sells things */
    setBuy(): CreatureTemplate;
    /** Shows a chat bubbule icon if this NPC has Quest/Gossip options */
    setSpeak(): CreatureTemplate;
    /** Shows a Hand Grasping icon if this NPC can be picked up for quest/items */
    setPickup(): CreatureTemplate;
    /** Shows cog icon commonly used for quest/transport */
    setInteract(): CreatureTemplate;
    /** Shows a book icon, identifying this npc as a Trainer */
    setTrainer(): CreatureTemplate;
    /** Shows a Boot w/Wings icon identifying this NPC as a "Taxi" */
    setTaxi(): CreatureTemplate;
    /** Shows an Anvil icon identifying this npc as a Repair NPC */
    setRepair(): CreatureTemplate;
    /** Shows a Multiple brown Bag icon (same as holding shift when looting a creature) */
    setLootAll(): CreatureTemplate;
    /** Unused/Unknown */
    setQuest(): CreatureTemplate;
    /** Unused/Unknown */
    setPVP(): CreatureTemplate;
}
