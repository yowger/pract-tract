import { useQuery } from "@tanstack/react-query"
import { getAgent } from "../api/agentApi"

export const useAgent = (agentId: number) => {
    return useQuery({
        queryKey: ["agent", agentId],
        queryFn: () => getAgent(agentId),
    })
}
