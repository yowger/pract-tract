import { privateApi } from "@/lib/axiosClient"

export interface AgentResponse {
    id: number
    user: {
        id: number
        name: string
        email: string
    }
    company: {
        id: number
        name: string
    } | null
    students: {
        id: number
        name: string
    }[]
}

export const getAgent = async (agentId: number): Promise<AgentResponse> => {
    const { data } = await privateApi.get(`/api/agents/${agentId}`)
    return data
}
