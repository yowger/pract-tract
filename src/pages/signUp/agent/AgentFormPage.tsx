// import { Building2 } from "lucide-react"
// import AgentForm from "../../../features/auth/components/forms/AgentForm"

// const AgentFormPage = () => {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
//                         <Building2 className="w-8 h-8 text-white" />
//                     </div>
//                     <h1 className="text-3xl font-semibold text-gray-900 mb-2">
//                         Agent Registration
//                     </h1>
//                     <p className="text-gray-600">
//                         Register your company and start managing interns today
//                     </p>
//                 </div>

//                 <AgentForm />

//                 <div className="mt-6 text-center">
//                     <p className="text-sm text-gray-600">
//                         Already have an account?{" "}
//                         <a
//                             href="/signin"
//                             className="text-blue-600 font-medium hover:underline"
//                         >
//                             Sign in
//                         </a>
//                     </p>
//                 </div>

//                 <p className="text-center text-sm text-gray-600 mt-6">
//                     By signing up, you agree to our{" "}
//                     <button className="text-blue-600 hover:underline">
//                         Terms of Service
//                     </button>{" "}
//                     and{" "}
//                     <button className="text-blue-600 hover:underline">
//                         Privacy Policy
//                     </button>
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default AgentFormPage

import { Building2, X } from "lucide-react"
import { Link } from "react-router-dom"

// import { Button } from "@/components/ui/button"
import AgentForm from "@/features/auth/components/forms/AgentForm"
import agencySignupImage from "@/img/Agency-signup.webp"

const AgentFormPage = () => {
    // const formId = "agent-signup-form"

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1F7A40] to-[#C2E866] flex items-center justify-center px-4 py-10 overflow-hidden">
            <div className="absolute inset-0 bg-white/35 backdrop-blur-sm pointer-events-none" />

            <div className="relative w-full max-w-5xl">
                <div className="relative grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] bg-white/90 rounded-[28px] shadow-2xl border border-white/70 overflow-hidden backdrop-blur md:min-h-[540px] md:max-h-[85vh]">
                    {/* Left image panel - desktop */}
                    <div className="relative hidden md:flex h-full bg-[#0c3c6a] items-stretch justify-center overflow-hidden">
                        <img
                            src={agencySignupImage}
                            alt="Agency representatives"
                            className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0c3c6a]/70 via-[#0c3c6a]/50 to-black/35" />
                        <div className="absolute top-6 left-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-lg">
                            <Building2 className="w-6 h-6 text-[#0c3c6a]" />
                        </div>
                    </div>

                    {/* Right panel */}
                    <div
                        className="relative bg-white/95 p-6 sm:p-8 md:p-10 flex flex-col gap-6
                md:max-h-[85vh] md:overflow-y-auto"
                    >
                        {/* Top image - mobile */}
                        <div className="relative md:hidden w-full h-52 rounded-2xl overflow-hidden shadow bg-[#0c3c6a] flex items-stretch justify-center">
                            <img
                                src={agencySignupImage}
                                alt="Agency representatives"
                                className="h-full w-full object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0c3c6a]/70 via-[#0c3c6a]/50 to-black/35" />
                            <div className="absolute top-4 left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg">
                                <Building2 className="w-5 h-5 text-[#0c3c6a]" />
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pr-1 pb-24">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0c3c6a]">
                                        Join PracTrack
                                    </p>
                                    <h1 className="text-3xl font-semibold text-gray-900 mt-2">
                                        Agent Registration
                                    </h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Register your company and start managing
                                        interns today.
                                    </p>
                                </div>

                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
                                <AgentForm
                                // id={formId}
                                // showSubmitButton={false}
                                // className="bg-transparent shadow-none border-0 p-0 space-y-5"
                                />
                            </div>
                        </div>

                        <div className="sticky bottom-0 inset-x-0 bg-gradient-to-b from-transparent via-white to-white space-y-3 pt-1">
                            {/* <Button
                                type="submit"
                                form={formId}
                                className="w-full h-12 bg-[#0c3c6a] hover:bg-[#0e4a86] text-white font-semibold shadow-md"
                            >
                                Sign Up
                            </Button> */}

                            <div className="flex items-center justify-between text-sm text-gray-700">
                                <span>Already have an account?</span>
                                <Link
                                    to="/signin"
                                    className="font-semibold text-[#0c3c6a] hover:text-[#0e4a86]"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentFormPage
