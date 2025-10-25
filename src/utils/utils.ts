export function cleanUndefined<T>(obj: T): T {
    return JSON.parse(
        JSON.stringify(obj, (_, v) => (v === undefined ? null : v))
    )
}

export const formatDate = (dateString?: string): string => {
    if (!dateString) return ""

    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export const formatTime = (time?: string): string => {
    if (!time) return ""
    return new Date(`2025-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}
