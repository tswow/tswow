import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { vehicle_accessoryRow } from "../../sql/vehicle_accessory";
import { vehicle_template_accessoryRow } from "../../sql/vehicle_template_accessory";
import { CreatureInstance } from "../Creature/CreatureInstance";
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { MainEntity } from "../Misc/Entity";
import { SummonType } from "../Misc/SummonType";
export declare class VehicleAccessoryBase<T extends vehicle_template_accessoryRow | vehicle_accessoryRow> extends MainEntity<T> {
    get Seat(): number;
    get DiesWithVehicle(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SummonType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SummonType>;
    get SummonTimer(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class VehicleTemplateAccessory extends VehicleAccessoryBase<vehicle_template_accessoryRow> {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, CreatureTemplate>;
}
export declare class VehicleInstanceAccessory extends VehicleAccessoryBase<vehicle_accessoryRow> {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, CreatureInstance>;
}
export declare class VehicleTemplateAccessories extends MultiRowSystem<VehicleTemplateAccessory, CreatureTemplate> {
    protected getAllRows(): VehicleTemplateAccessory[];
    protected isDeleted(value: VehicleTemplateAccessory): boolean;
    getSeat(seatIndex: number): VehicleTemplateAccessory;
    modSeat(seatIndex: number, callback: (accessory: VehicleTemplateAccessory) => void): void;
}
export declare class VehicleInstanceAccessories extends MultiRowSystem<VehicleInstanceAccessory, CreatureInstance> {
    protected getAllRows(): VehicleInstanceAccessory[];
    protected isDeleted(value: VehicleInstanceAccessory): boolean;
    getSeat(seatIndex: number): VehicleInstanceAccessory;
    modSeat(seatIndex: number, callback: (accessory: VehicleInstanceAccessory) => void): void;
}
