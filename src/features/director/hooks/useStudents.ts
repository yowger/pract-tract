import { useQuery } from "@tanstack/react-query"
import { fetchStudents } from "../api/studentApi"

export const useStudents = (params = {}) => {
    return useQuery({
        queryKey: ["students", params],
        queryFn: () => fetchStudents(params),
    })
}
