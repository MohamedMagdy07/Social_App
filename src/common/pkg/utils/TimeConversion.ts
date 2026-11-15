enum Time {
    "HOURS",
    "MINUTES",
    "SECENDS"
}

export function convertToMs(value: number, unit: Time) {
    switch (unit) {
        case Time.HOURS:
            return value * 60 * 60 * 1000;

        case Time.MINUTES:
            return value * 60 * 1000;

        case Time.SECENDS:
            return value * 1000;

        default:
            throw new Error("Invalid unit. Please use 'hours', 'minutes', or 'seconds'.");
    }
}