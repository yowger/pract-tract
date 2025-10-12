import { QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
import { queryClient } from "./lib/queryClient.ts"
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <Toaster />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)
