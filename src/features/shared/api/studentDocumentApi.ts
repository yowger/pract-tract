import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { privateApi } from "@/lib/axiosClient"

export interface StudentDocument {
    id: number
    student_id: number
    name: string
    type: string | null
    url: string
    uploaded_by: number | null
    created_at: string
    updated_at: string
    uploader?: {
        id: number
        name: string
        role: string
    }
}

export const getStudentDocuments = async (
    studentId: number | string
): Promise<StudentDocument[]> => {
    const { data } = await privateApi.get<{
        success: boolean
        data: StudentDocument[]
    }>(`/api/student-documents?student_id=${studentId}`)
    return data.data
}

export interface CreateDocumentPayload {
    student_id: number
    name: string
    type?: string
    url: string
}

export const createStudentDocument = async (
    payload: CreateDocumentPayload
): Promise<StudentDocument> => {
    const { data } = await privateApi.post<{
        success: boolean
        data: StudentDocument
    }>("/api/student-documents", payload)
    return data.data
}

export const useStudentDocuments = (studentId: number | string) => {
    return useQuery({
        queryKey: ["student-documents", studentId],
        queryFn: () => getStudentDocuments(studentId),
        enabled: !!studentId,
    })
}

export const useCreateStudentDocument = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreateDocumentPayload) =>
            createStudentDocument(payload),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["student-documents", variables.student_id],
            })
        },
    })
}

export const deleteStudentDocument = async (documentId: number) => {
    const { data } = await privateApi.delete<{ success: boolean }>(
        `/api/student-documents/${documentId}`
    )
    return data.success
}

export const useDeleteStudentDocument = (studentId: number | string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteStudentDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["student-documents", studentId],
            })
        },
    })
}
