import { useQuery } from "@tanstack/react-query"

import { getStudent } from "../api/studentApi"

export const useStudent = (studentId: number) => {
    return useQuery({
        queryKey: ["students", studentId],
        queryFn: () => getStudent(studentId),
        // select: (data) => data,
        enabled: !!studentId,
    })
}
