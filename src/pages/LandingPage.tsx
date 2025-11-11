// import { useState } from "react"
// import {
//     GraduationCap,
//     Users,
//     UserCheck,
//     Clock,
//     BarChart3,
//     Shield,
//     Menu,
//     X,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useUser } from "@/features/auth/hooks/useUser"

// const LandingPage = () => {
//     const { data: user, isLoading } = useUser()
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-16">
//                         <div className="flex items-center">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                                     <GraduationCap className="w-6 h-6 text-white" />
//                                 </div>
//                                 <span className="text-xl font-semibold text-gray-900">
//                                     AttendTrack
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="hidden md:flex items-center gap-6">
//                             <a
//                                 href="#features"
//                                 className="text-gray-600 hover:text-gray-900 transition-colors"
//                             >
//                                 Features
//                             </a>
//                             <a
//                                 href="#roles"
//                                 className="text-gray-600 hover:text-gray-900 transition-colors"
//                             >
//                                 Roles
//                             </a>
//                             <a
//                                 href="#about"
//                                 className="text-gray-600 hover:text-gray-900 transition-colors"
//                             >
//                                 About
//                             </a>

//                             {user ? (
//                                 <Button
//                                     onClick={() => {
//                                         const role =
//                                             user?.user?.role || "student"
//                                         window.location.href =
//                                             role === "student"
//                                                 ? "/student/dashboard"
//                                                 : role === "director"
//                                                 ? "/director/dashboard"
//                                                 : "/landing"
//                                     }}
//                                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                                 >
//                                     Go to Dashboard
//                                 </Button>
//                             ) : (
//                                 <div className="flex items-center gap-3">
//                                     <Button
//                                         variant="ghost"
//                                         onClick={() =>
//                                             (window.location.href = "/signin")
//                                         }
//                                         className="text-gray-700"
//                                     >
//                                         Sign In
//                                     </Button>
//                                     <Button
//                                         onClick={() =>
//                                             (window.location.href = "/signup")
//                                         }
//                                         className="bg-blue-600 hover:bg-blue-700 text-white"
//                                     >
//                                         Get Started
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>

//                         <button
//                             className="md:hidden p-2"
//                             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         >
//                             {mobileMenuOpen ? (
//                                 <X className="w-6 h-6" />
//                             ) : (
//                                 <Menu className="w-6 h-6" />
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {mobileMenuOpen && (
//                     <div className="md:hidden border-t border-gray-200 bg-white">
//                         <div className="px-4 py-3 space-y-3">
//                             <a
//                                 href="#features"
//                                 className="block text-gray-600 hover:text-gray-900"
//                             >
//                                 Features
//                             </a>
//                             <a
//                                 href="#roles"
//                                 className="block text-gray-600 hover:text-gray-900"
//                             >
//                                 Roles
//                             </a>
//                             <a
//                                 href="#about"
//                                 className="block text-gray-600 hover:text-gray-900"
//                             >
//                                 About
//                             </a>
//                             {user ? (
//                                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                                     Go to Dashboard
//                                 </Button>
//                             ) : (
//                                 <>
//                                     <Button
//                                         variant="outline"
//                                         className="w-full"
//                                     >
//                                         Sign In
//                                     </Button>
//                                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                                         Get Started
//                                     </Button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </nav>

//             <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
//                     <div className="text-center max-w-3xl mx-auto">
//                         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//                             Modern Student Attendance Management
//                         </h1>
//                         <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
//                             Streamline attendance tracking for students, agents,
//                             and advisors. Real-time monitoring, insightful
//                             analytics, and seamless collaboration.
//                         </p>

//                         {user ? (
//                             <Button
//                                 size="lg"
//                                 className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto"
//                             >
//                                 Go to Dashboard
//                             </Button>
//                         ) : (
//                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                                 <Button
//                                     size="lg"
//                                     onClick={() =>
//                                         (window.location.href = "/signup")
//                                     }
//                                     className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto"
//                                 >
//                                     Get Started Free
//                                 </Button>
//                                 <Button
//                                     size="lg"
//                                     variant="outline"
//                                     onClick={() =>
//                                         (window.location.href = "/signin")
//                                     }
//                                     className="text-lg px-8 py-6 h-auto border-2"
//                                 >
//                                     Sign In
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
//             </section>

//             <section id="features" className="py-20 bg-white">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="text-center mb-16">
//                         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//                             Everything you need to manage attendance
//                         </h2>
//                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                             Powerful features designed to make attendance
//                             tracking effortless and efficient
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-8">
//                         <div className="text-center p-6">
//                             <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                                 <Clock className="w-8 h-8 text-blue-600" />
//                             </div>
//                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                 Real-Time Tracking
//                             </h3>
//                             <p className="text-gray-600">
//                                 Monitor attendance in real-time with instant
//                                 updates and notifications
//                             </p>
//                         </div>

//                         <div className="text-center p-6">
//                             <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                                 <BarChart3 className="w-8 h-8 text-green-600" />
//                             </div>
//                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                 Insightful Analytics
//                             </h3>
//                             <p className="text-gray-600">
//                                 Visualize patterns and trends with comprehensive
//                                 attendance reports
//                             </p>
//                         </div>

//                         <div className="text-center p-6">
//                             <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                                 <Shield className="w-8 h-8 text-purple-600" />
//                             </div>
//                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                 Secure & Reliable
//                             </h3>
//                             <p className="text-gray-600">
//                                 Enterprise-grade security to protect sensitive
//                                 student information
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section id="roles" className="py-20 bg-gray-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="text-center mb-16">
//                         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//                             Built for everyone
//                         </h2>
//                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                             Tailored experiences for students, agents, and
//                             advisors
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-8">
//                         <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
//                                 <GraduationCap className="w-7 h-7 text-blue-600" />
//                             </div>
//                             <h3 className="text-2xl font-semibold text-gray-900 mb-3">
//                                 Students
//                             </h3>
//                             <p className="text-gray-600 mb-4">
//                                 Track your attendance, view records, and stay
//                                 informed about your progress
//                             </p>
//                             <ul className="space-y-2 text-sm text-gray-600">
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
//                                     <span>View attendance history</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
//                                     <span>Get notified of updates</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
//                                     <span>Download reports</span>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
//                                 <Users className="w-7 h-7 text-green-600" />
//                             </div>
//                             <h3 className="text-2xl font-semibold text-gray-900 mb-3">
//                                 Agents
//                             </h3>
//                             <p className="text-gray-600 mb-4">
//                                 Manage student attendance records and handle
//                                 day-to-day operations efficiently
//                             </p>
//                             <ul className="space-y-2 text-sm text-gray-600">
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5"></div>
//                                     <span>Record attendance</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5"></div>
//                                     <span>Manage student records</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5"></div>
//                                     <span>Generate reports</span>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
//                                 <UserCheck className="w-7 h-7 text-purple-600" />
//                             </div>
//                             <h3 className="text-2xl font-semibold text-gray-900 mb-3">
//                                 Advisors
//                             </h3>
//                             <p className="text-gray-600 mb-4">
//                                 Oversee student progress, provide guidance, and
//                                 access comprehensive analytics
//                             </p>
//                             <ul className="space-y-2 text-sm text-gray-600">
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
//                                     <span>Monitor student progress</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
//                                     <span>Access analytics dashboard</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
//                                     <span>Provide guidance</span>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {!user && (
//                 <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
//                     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//                             Ready to get started?
//                         </h2>
//                         <p className="text-lg text-blue-100 mb-8">
//                             Join thousands of institutions using AttendTrack for
//                             seamless attendance management
//                         </p>
//                         <Button
//                             size="lg"
//                             onClick={() => (window.location.href = "/signup")}
//                             className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
//                         >
//                             Create Free Account
//                         </Button>
//                     </div>
//                 </section>
//             )}

//             <footer className="bg-gray-900 text-gray-400 py-12">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex flex-col md:flex-row justify-between items-center">
//                         <div className="flex items-center gap-2 mb-4 md:mb-0">
//                             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                                 <GraduationCap className="w-5 h-5 text-white" />
//                             </div>
//                             <span className="text-lg font-semibold text-white">
//                                 AttendTrack
//                             </span>
//                         </div>
//                         <div className="text-sm text-center md:text-right">
//                             © 2025 AttendTrack. All rights reserved.
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default LandingPage

// ---

import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
            <nav className="bg-green-900/50 backdrop-blur-sm border-b border-green-700/30">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-white">
                            PracTrack–JHCSC
                        </h1>
                        <div className="flex items-center gap-8">
                            <a
                                href="#home"
                                className="text-white hover:text-green-200 transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#programs"
                                className="text-white hover:text-green-200 transition-colors"
                            >
                                Programs
                            </a>
                            <a
                                href="#about"
                                className="text-white hover:text-green-200 transition-colors"
                            >
                                About
                            </a>
                            <Link
                                to="/signin"
                                className="bg-white text-green-900 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-6xl font-bold text-green-100 leading-tight">
                            Internship
                            <br />
                            Management
                            <br />
                            System
                        </h2>

                        <div className="space-y-4 text-white/90 text-lg">
                            <p>
                                <span className="font-semibold text-white">
                                    PracTrack–JHCSC
                                </span>{" "}
                                is a centralized internship and practicum
                                monitoring system developed for{" "}
                                <span className="font-semibold text-white">
                                    JH Cerilles State College – Dumingag Campus
                                </span>
                                .
                            </p>
                            <p>
                                Designed for students, advisers, and supervisors
                                to seamlessly track attendance, upload reports,
                                and evaluate performance — all in one place.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                to="/signin"
                                className="inline-block bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-96 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center">
                                <svg
                                    viewBox="0 0 200 200"
                                    className="w-80 h-80"
                                ></svg>
                            </div>

                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-green-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Track Attendance
                        </h3>
                        <p className="text-white/80">
                            Monitor student attendance in real-time with
                            automated tracking and reporting.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-green-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Upload Reports
                        </h3>
                        <p className="text-white/80">
                            Easily submit and manage internship reports and
                            documents online.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-green-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Evaluate Performance
                        </h3>
                        <p className="text-white/80">
                            Comprehensive evaluation tools for advisers and
                            supervisors.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
