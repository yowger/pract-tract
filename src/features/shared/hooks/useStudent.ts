import { useQuery } from "@tanstack/react-query"

import { getStudent } from "../api/studentApi"

export const useStudent = (agentId: number) => {
    return useQuery({
        queryKey: ["students", agentId],
        queryFn: () => getStudent(agentId),
        enabled: !!agentId,
    })
}
