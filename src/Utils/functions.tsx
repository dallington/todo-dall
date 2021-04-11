export function isNumber(x: any): boolean {
    return typeof x === "number";
}
export function isString(x: any): boolean {
    return typeof x === "string";
}
export function isObject(x: any): boolean {
    return typeof x === "object";
}
export function isFunction(x: any): boolean {
    return typeof x === "function";
}

export function getKeysFromInterface<T extends object>(): Array<keyof T> {
    return []
};
