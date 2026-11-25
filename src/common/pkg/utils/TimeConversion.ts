export enum Time {
    HOURS,
    MINUTES,
    SECONDS,
    DAYS,
}

export function convertToMs(value: number, unit: Time): number {
    switch (unit) {
        case Time.DAYS:
            return value * 24 * 60 * 60 * 1000;

        case Time.HOURS:
            return value * 60 * 60 * 1000;

        case Time.MINUTES:
            return value * 60 * 1000;

        case Time.SECONDS:
            return value * 1000;

        default:
            throw new Error("Invalid unit. Please use 'days', 'hours', 'minutes', or 'seconds'.");
    }
}