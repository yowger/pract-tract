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

export interface StudentDocumentFilters {
    studentId?: number | string
    studentName?: string
    uploadedBy?: number | string
    uploaderName?: string
}

export const getStudentDocuments = async (
    filters: StudentDocumentFilters = {}
): Promise<StudentDocument[]> => {
    const params = new URLSearchParams()

    if (filters.studentId)
        params.append("student_id", filters.studentId.toString())
    if (filters.studentName) params.append("student_name", filters.studentName)
    if (filters.uploadedBy)
        params.append("uploaded_by", filters.uploadedBy.toString())
    if (filters.uploaderName)
        params.append("uploader_name", filters.uploaderName)

    const { data } = await privateApi.get<{
        success: boolean
        data: StudentDocument[]
    }>(`/api/student-documents?${params.toString()}`)

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

export const useStudentDocuments = (filters: StudentDocumentFilters) => {
    return useQuery({
        queryKey: ["student-documents", filters],
        queryFn: () => getStudentDocuments(filters),
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
