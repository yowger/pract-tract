import { useRoutes } from "react-router-dom"
import { Suspense } from "react"

import routes from "@/routes"

export default function App() {
    const routing = useRoutes(routes)

    return <Suspense fallback={<div>Loading...</div>}>{routing}</Suspense>
}
