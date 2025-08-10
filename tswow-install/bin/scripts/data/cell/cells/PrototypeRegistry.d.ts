/**
 * Allows creating arbitrary prototypes from a runtime object,
 * useful for things like Enums and Masks
 *
 * @param protoName - the registry name to be used for parentProto
 * @param parentProto - the base prototype to inherit from
 * @param keyObject - object whose keys are used to construct the prototype
 * @param constructor - values to be written to instance (Object.assigned)
 * @param callback - specifies how to handle individual keys in keyObject
 * @returns
 */
export declare function makePrototype(protoName: string, parentProto: any, keyObject: any, constructor: any, callback: (proto: any, key: string, value: any) => void): any;
