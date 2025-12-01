// import LoginForm from "@/features/auth/components/forms/LoginForm"
// import { ArrowLeft } from "lucide-react"
// import { Link } from "react-router-dom"

// const SignInFormPage = () => {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
//             <div className="w-full max-w-md">
//                 <div className="mb-6">
//                     <Link
//                         to="/landing"
//                         className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
//                     >
//                         <ArrowLeft className="mr-2 w-4 h-4" />
//                         Back to landing page
//                     </Link>
//                 </div>

//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4 shadow-lg">
//                         <svg
//                             className="w-8 h-8 text-white"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                             />
//                         </svg>
//                     </div>
//                     <h1 className="text-3xl font-normal text-gray-800 mb-2">
//                         Sign in
//                     </h1>
//                     <p className="text-sm text-gray-600">
//                         to continue to your dashboard
//                     </p>
//                 </div>

//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//                     <LoginForm />
//                 </div>

//                 <div className="text-center mt-6">
//                     <p className="text-sm text-gray-600">
//                         Don't have an account?{" "}
//                         <Link
//                             to="/signup"
//                             className="text-blue-600 hover:text-blue-700 font-medium"
//                         >
//                             Sign up
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SignInFormPage

import LoginForm from "@/features/auth/components/forms/LoginForm"
import { BookOpen, X } from "lucide-react"
import { Link } from "react-router-dom"

const SignInFormPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 p-4">
            <div className="w-full max-w-5xl md:h-[560px] bg-white/60 rounded-[24px] shadow-2xl border border-white/50 overflow-hidden flex flex-col md:flex-row backdrop-blur">
                <div className="hidden md:block relative md:w-1/2 md:h-full bg-[#0f5d2e]">
                    <img
                        src="/pic.jpg"
                        alt="PracTrack interns"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/25 to-black/40" />
                    <div className="absolute top-6 left-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-lg">
                        <BookOpen className="w-6 h-6 text-[#0f5d2e]" />
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-10 bg-white/95">
                    <div className="flex items-center justify-end mb-6">
                        <Link
                            to="/landing"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Sign In
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Access your dashboard
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <LoginForm />
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-[#0f5d2e] hover:text-[#127036] font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInFormPage
