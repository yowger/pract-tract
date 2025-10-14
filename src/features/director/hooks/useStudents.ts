import { useQuery, type UseQueryResult } from "@tanstack/react-query"

import { fetchStudents } from "../api/studentApi"

export const useStudents = (
    params = {}
): UseQueryResult<Awaited<ReturnType<typeof fetchStudents>>> => {
    return useQuery({
        queryKey: ["students", params],
        queryFn: () => fetchStudents(params),
    })
}
