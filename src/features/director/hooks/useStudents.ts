import { useQuery, type UseQueryResult } from "@tanstack/react-query"

import { fetchStudents, type StudentQueryParams } from "../api/studentApi"

export const useStudents = (
    params: StudentQueryParams
): UseQueryResult<Awaited<ReturnType<typeof fetchStudents>>> => {
    return useQuery({
        queryKey: ["students", params],
        queryFn: () => fetchStudents(params),
    })
}
