import { privateApi } from "@/lib/axiosClient"

import type { Company } from "@/types/company"

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

export const fetchCompany = async (companyId: number): Promise<Company> => {
    const response = await privateApi.get(`/api/companies/${companyId}`)

    return response.data
}

