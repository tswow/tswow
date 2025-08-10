import { VendorItems } from "./Vendor";
export declare const Vendors: {
    load<T>(id: number, owner?: T): VendorItems<T>;
    create<T>(owner?: T): VendorItems<T>;
};
