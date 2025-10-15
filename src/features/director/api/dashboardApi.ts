import { privateApi } from "@/lib/axiosClient"

export interface DirectorDashboardResponse {
    counts: {
        students: number
        advisors: number
        companies: number
    }
    charts: {
        students_by_program: {
            name: string
            code: string
            count: number
        }[]
        internship_status: Record<string, number>
    }
    pending_users: {
        advisors: number
        agents: number
        students: number
    }
}

export const getDirectorDashboard =
    async (): Promise<DirectorDashboardResponse> => {
        const { data } = await privateApi.get("api/director/dashboard")
        return data
    }
