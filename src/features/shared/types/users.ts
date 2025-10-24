export const USER_STATUSES = [
    "accepted",
    "pending",
    "rejected",
    "inactive",
] as const

export type UserStatus = (typeof USER_STATUSES)[number]
