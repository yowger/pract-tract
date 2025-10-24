import { privateApi } from "@/lib/axiosClient"

export interface CompanyOption {
    id: number
    name: string
}

export const fetchCompanyOptions = async (): Promise<CompanyOption[]> => {
    const response = await privateApi.get<{ data: CompanyOption[] }>(
        "/api/companies/list"
    )
    return response.data.data
}
