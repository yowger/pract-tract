import { useQuery } from "@tanstack/react-query"

import { fetchCompany, fetchCompanyOptions } from "../api/companyApi"

export const useCompanyOptions = () => {
    return useQuery({
        queryKey: ["company-options"],
        queryFn: fetchCompanyOptions,
        // staleTime: Infinity,
        staleTime: 5 * 60 * 1000,
    })
}

export const useCompany = (companyId: number) => {
    return useQuery({
        queryKey: ["company", companyId],
        queryFn: () => fetchCompany(companyId),
    })
}
