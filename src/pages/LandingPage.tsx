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

// import { Link } from "react-router-dom"

// export default function LandingPage() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
//             <nav className="bg-green-900/50 backdrop-blur-sm border-b border-green-700/30">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <h1 className="text-2xl font-bold text-white">
//                             PracTrack–JHCSC
//                         </h1>
//                         <div className="flex items-center gap-8">
//                             <a
//                                 href="#home"
//                                 className="text-white hover:text-green-200 transition-colors"
//                             >
//                                 Home
//                             </a>
//                             <a
//                                 href="#programs"
//                                 className="text-white hover:text-green-200 transition-colors"
//                             >
//                                 Programs
//                             </a>
//                             <a
//                                 href="#about"
//                                 className="text-white hover:text-green-200 transition-colors"
//                             >
//                                 About
//                             </a>
//                             <Link
//                                 to="/signin"
//                                 className="bg-white text-green-900 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
//                             >
//                                 Login
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <div className="max-w-7xl mx-auto px-6 py-20">
//                 <div className="grid md:grid-cols-2 gap-12 items-center">
//                     <div className="space-y-6">
//                         <h2 className="text-6xl font-bold text-green-100 leading-tight">
//                             Internship
//                             <br />
//                             Management
//                             <br />
//                             System
//                         </h2>

//                         <div className="space-y-4 text-white/90 text-lg">
//                             <p>
//                                 <span className="font-semibold text-white">
//                                     PracTrack–JHCSC
//                                 </span>{" "}
//                                 is a centralized internship and practicum
//                                 monitoring system developed for{" "}
//                                 <span className="font-semibold text-white">
//                                     JH Cerilles State College – Dumingag Campus
//                                 </span>
//                                 .
//                             </p>
//                             <p>
//                                 Designed for students, advisers, and supervisors
//                                 to seamlessly track attendance, upload reports,
//                                 and evaluate performance — all in one place.
//                             </p>
//                         </div>

//                         <div className="pt-4">
//                             <Link
//                                 to="/signin"
//                                 className="inline-block bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
//                             >
//                                 Get started
//                             </Link>
//                         </div>
//                     </div>

//                     <div className="flex justify-center">
//                         <div className="relative">
//                             <div className="w-96 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center">
//                                 <svg
//                                     viewBox="0 0 200 200"
//                                     className="w-80 h-80"
//                                 ></svg>
//                             </div>

//                             <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/20 rounded-full blur-xl"></div>
//                             <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-6 py-16">
//                 <div className="grid md:grid-cols-3 gap-8">
//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
//                         <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
//                             <svg
//                                 className="w-6 h-6 text-green-900"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">
//                             Track Attendance
//                         </h3>
//                         <p className="text-white/80">
//                             Monitor student attendance in real-time with
//                             automated tracking and reporting.
//                         </p>
//                     </div>

//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
//                         <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
//                             <svg
//                                 className="w-6 h-6 text-green-900"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                                 />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">
//                             Upload Reports
//                         </h3>
//                         <p className="text-white/80">
//                             Easily submit and manage internship reports and
//                             documents online.
//                         </p>
//                     </div>

//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
//                         <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
//                             <svg
//                                 className="w-6 h-6 text-green-900"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
//                                 />
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
//                                 />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">
//                             Evaluate Performance
//                         </h3>
//                         <p className="text-white/80">
//                             Comprehensive evaluation tools for advisers and
//                             supervisors.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// --

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const programs = [
    {
        title: "BSCRIM (Bachelor of Science in Criminology)",
        image: "/BSCRIM.jpg",
        description:
            "A program focused on the study of crime, criminal behavior, law enforcement, and the justice system. It prepares students for careers in policing, investigation, corrections, and public safety.",
    },
    {
        title: "BSISM (Bachelor of Science in Information Systems Management)",
        image: "/bsism.png",
        description:
            "This program integrates business and technology, teaching students how to design, manage, and improve information systems for organizational operations. It prepares graduates to become IT managers, system analysts, and digital solution experts.",
    },
    {
        title: "BSIT (Bachelor of Science in Information Technology)",
        image: "/BSIT.jpg",
        description:
            "A technical program specializing in computing, software development, networking, and system administration. It trains students to build, manage, and secure IT infrastructures across various industries.",
    },
    {
        title: "BSA (Bachelor of Science in Agriculture)",
        image: "/BSA.jpg",
        description:
            "A program that focuses on agricultural science, crop production, animal science, and sustainable farming practices. Students learn modern techniques to improve agricultural productivity and rural development.",
    },
    {
        title: "BSED-English (Bachelor of Secondary Education – Major in English)",
        image: "/BS-ENGLISH.jpg",
        description:
            "This program prepares future English teachers with strong communication, literary analysis, and instructional skills. It trains students to effectively teach English in junior and senior high school.",
    },
    {
        title: "BSED-Mathematics (Bachelor of Secondary Education – Major in Mathematics)",
        image: "/BSED-MATH.png",
        description:
            "A program designed to develop competent math educators with strong foundations in mathematical concepts and teaching strategies. Graduates are trained to teach mathematics in secondary education levels.",
    },
    {
        title: "BEED (Bachelor of Elementary Education)",
        image: "/BEED.png",
        description:
            "This program equips students with the knowledge and skills to teach all major subjects in the elementary level. It focuses on child development, instructional methods, and holistic classroom management.",
    },
    {
        title: "BPED (Bachelor of Physical Education)",
        image: "/BPED.png",
        description:
            "A program focused on human movement, sports science, and physical fitness education. It prepares students to become effective PE teachers, coaches, and sports program trainers.",
    },
]

const aboutLogos = ["/scs.jpg", "/crim.jpg", "/ste.jpg", "/agri.jpg"]

const aboutFeatures = [
    {
        title: "Track Attendance",
        description:
            "Records and monitors students’ daily attendance to ensure accurate tracking of presence, absences, and punctuality.",
        icon: "📅",
    },
    {
        title: "Upload Reports",
        description:
            "Lets students submit required practicum reports securely, keeping documents organized and easy to manage.",
        icon: "📤",
    },
    {
        title: "Evaluate Performance",
        description:
            "Enables supervisors to assess tasks, skills, and workplace behavior using structured evaluation forms.",
        icon: "✅",
    },
    {
        title: "Generate DTR",
        description:
            "Automatically compiles logged hours into an accurate, printable Daily Time Record for official submission.",
        icon: "📝",
    },
]

export default function LandingPage() {
    const [currentProgram, setCurrentProgram] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentProgram((prev) => (prev + 1) % programs.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative min-h-screen bg-[#0f3b20] text-white">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/campus-bg.jpg"
                    alt="JH Cerilles State College campus"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-[#0a2b17]/70" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <nav className="sticky top-0 z-50 bg-[#0f5d2e]/90 border-b border-white/10 shadow-lg backdrop-blur">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold tracking-wide">
                                PracTrack-JHCSC
                            </h1>
                            <div className="flex items-center gap-6 text-sm font-medium">
                                <a
                                    href="#home"
                                    className="hover:text-green-200 transition-colors"
                                >
                                    Home
                                </a>
                                <a
                                    href="#programs"
                                    className="hover:text-green-200 transition-colors"
                                >
                                    Programs
                                </a>
                                <a
                                    href="#about"
                                    className="hover:text-green-200 transition-colors"
                                >
                                    About
                                </a>
                                <Link
                                    to="/signin"
                                    className="bg-white text-green-900 px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-50 transition-colors"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <section
                    id="home"
                    className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16"
                >
                    <div className="w-full max-w-7xl md:max-w-8xl">
                        <div className="bg-gradient-to-r from-white/25 via-white/15 to-white/10 border border-white/20 rounded-[32px] shadow-2xl backdrop-blur-2xl px-6 py-10 sm:px-12 lg:px-16 grid gap-12 md:grid-cols-[1.1fr_0.9fr] max-w-7xl md:max-w-8xl">
                            <div className="space-y-6">
                                <p className="text-sm uppercase tracking-[0.4em] text-green-100">
                                    PracTrack-JHCSC
                                </p>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                    Internship Management System
                                </h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    PracTrack-JHCSC is a centralized internship
                                    and practicum monitoring system designed for
                                    JH Cerilles State College - Dumingag Campus.
                                    Students, advisers, and supervisors can
                                    seamlessly track attendance, upload reports,
                                    and evaluate performance - all in one place.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <Link
                                        to="/signin"
                                        className="inline-flex items-center justify-center bg-[#0f5d2e] px-8 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-[#0f5d2e]/30 hover:bg-[#127036] transition-colors"
                                    >
                                        Get started
                                    </Link>
                                    <a
                                        href="#programs"
                                        className="inline-flex items-center justify-center border border-white/50 px-8 py-3 rounded-xl text-lg font-semibold text-white/90 hover:bg-white/10 transition-colors"
                                    >
                                        Explore programs
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.40)]">
                                        <img
                                            src="/pic.jpg"
                                            alt="PracTrack illustration"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -top-5 -right-2 w-24 h-24 bg-white/40 rounded-full blur-3xl"></div>
                                    <div className="absolute -bottom-8 -left-6 w-32 h-32 bg-green-300/30 rounded-full blur-3xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="programs"
                    className="relative z-10 max-w-7xl mx-auto px-6 pb-10"
                >
                    <div className="bg-white/10 border border-white/20 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                            <div className="p-8 sm:p-10">
                                <p className="text-sm uppercase tracking-[0.35em] text-green-100 mb-4">
                                    Programs
                                </p>
                                <div className="space-y-3">
                                    <h3 className="text-3xl sm:text-4xl font-bold">
                                        {programs[currentProgram].title}
                                    </h3>
                                    <p className="text-white/85 leading-relaxed min-h-[96px] sm:min-h-[110px]">
                                        {programs[currentProgram].description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            setCurrentProgram(
                                                (currentProgram -
                                                    1 +
                                                    programs.length) %
                                                    programs.length
                                            )
                                        }
                                        className="px-4 py-2 rounded-lg bg-white/15 border border-white/30 hover:bg-white/20 transition-colors"
                                    >
                                        Prev
                                    </button>
                                    <button
                                        onClick={() =>
                                            setCurrentProgram(
                                                (currentProgram + 1) %
                                                    programs.length
                                            )
                                        }
                                        className="px-4 py-2 rounded-lg bg-[#0f5d2e] text-white font-semibold hover:bg-[#127036] transition-colors"
                                    >
                                        Next
                                    </button>
                                    <div className="flex gap-2 ml-2">
                                        {programs.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`h-2 w-2 rounded-full ${
                                                    idx === currentProgram
                                                        ? "bg-white"
                                                        : "bg-white/40"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="relative overflow-hidden">
                                <div className="aspect-[4/3] w-full bg-white/5">
                                    <img
                                        src={programs[currentProgram].image}
                                        alt={programs[currentProgram].title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="about"
                    className="relative z-10 max-w-7xl md:max-w-8xl mx-auto px-6 pb-16"
                >
                    <div className="bg-white/10 border border-white/15 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-lg space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">
                                Built for the JHCSC community
                            </h3>
                            <p className="text-white/85 leading-relaxed text-justify">
                                Core features keep practicum workflows organized
                                and transparent?from attendance to evaluations
                                and time records.
                            </p>
                            <p className="text-white/80 leading-relaxed mt-3 text-justify">
                                PracTrack-JHCSC is a centralized digital
                                platform developed to streamline the tracking,
                                monitoring, and evaluation of internship and
                                practicum activities of students at JH Cerilles
                                State College ? Dumingag Campus. It caters to
                                students enrolled in programs such as
                                Criminology, Education, Information Technology,
                                Industrial Security Management, and Agriculture.
                                The system provides real-time insights to
                                students, advisers, and partner agencies through
                                digital attendance via QR code, logbook
                                submissions, progress reports, and evaluation
                                feedback. Designed with simplicity and usability
                                in mind, PracTrack empowers stakeholders to
                                maintain transparency and effectiveness
                                throughout the internship process.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {aboutFeatures.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex items-start gap-3 bg-white/5 rounded-2xl border border-white/10 p-4"
                                >
                                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/15 text-xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">
                                            {item.title}
                                        </h4>
                                        <p className="text-white/80 text-sm leading-relaxed text-justify">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-8 mt-8 justify-center">
                        {aboutLogos.map((src) => (
                            <div
                                key={src}
                                className="mx-auto h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border border-white/40 bg-white/10"
                            >
                                <img
                                    src={src}
                                    alt="Program logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
