export function generateId(prefix: string) : string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 10 (numbers), and grab the first 9 characters
    // after the decimal.
    return prefix + Math.random().toString().substr(2, 9);
}