import { privateApi } from "@/lib/axiosClient"

import type { UserStatus } from "@/types/users"

export interface BulkUpdateStatusPayload {
    user_ids: number[]
    status: UserStatus
}

export const updateUsersStatus = async (payload: BulkUpdateStatusPayload) => {
    const { data } = await privateApi.patch("/api/users/status/bulk", payload)
    return data
}
