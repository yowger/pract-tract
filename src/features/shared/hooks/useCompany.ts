import { useQuery } from "@tanstack/react-query"

import { fetchCompanyOptions } from "../api/companyApi"

export const useCompanyOptions = () => {
    return useQuery({
        queryKey: ["company-options"],
        queryFn: fetchCompanyOptions,
        // staleTime: Infinity,
        staleTime: 5 * 60 * 1000,
    })
}
