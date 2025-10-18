export function cleanUndefined<T>(obj: T): T {
    return JSON.parse(
        JSON.stringify(obj, (_, v) => (v === undefined ? null : v))
    )
}
