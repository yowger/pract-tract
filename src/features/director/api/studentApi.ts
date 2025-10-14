import { privateApi } from "@/lib/axiosClient"

export const fetchStudents = async (params = {}) => {
    const { data } = await privateApi.get("/api/students", { params })
    return data
}
