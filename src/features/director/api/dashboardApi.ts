import { privateApi } from "@/lib/axiosClient"

export const getDirectorDashboard = async () => {
    const { data } = await privateApi.get("api/director/dashboard")
    return data
}
