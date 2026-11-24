export enum Unit {
    KILOBYTE = 0,
    MEGABYTE = 1,
    GIGABYTE = 2,
}

/**
 * Converts a storage size value into bytes.
 * @param value - The numeric size to convert.
 * @param unit - Target unit (`Unit.KILOBYTE`, `Unit.MEGABYTE`, or `Unit.GIGABYTE`).
 * @returns The size in bytes.
 */

export function storageUnitConvert(value: number, unit: Unit) {
    switch (unit) {
        case Unit.KILOBYTE:
            return value * 1024;

        case Unit.MEGABYTE:
            return value * 1024 * 1024 ;

        case Unit.GIGABYTE:
            return value * 1024 * 1024 * 1024;

        default:
            throw new Error("Invalid unit. Please use 'KILOBYTE', 'MEGABYTE', or 'GIGABYTE'.");
    }
}