import { GraduationCap } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

interface RoleSelectHandler {
    (role: string): void
}

const SelectRolePage = () => {
    const navigate = useNavigate()

    const handleSelect: RoleSelectHandler = (role) => {
        navigate(`/signup/${role}`)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-normal text-gray-900 mb-2">
                        Create Your Account
                    </h1>
                    <p className="text-lg text-gray-600">
                        Select your role to continue with the attendance system
                    </p>
                </div>

                {/* <div className="grid md:grid-cols-3 gap-6"> */}
                <div className="justify-center flex">
                    <button
                        onClick={() => handleSelect("student")}
                        className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-blue-500 text-center group"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">
                            Student
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Track your attendance and view your records
                        </p>
                        <div className="inline-flex items-center text-blue-600 font-medium">
                            Continue
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </button>

                    {/* <button
                        onClick={() => handleSelect("agent")}
                        className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-green-500 text-center group"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">
                            Agent
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Handle student attendance and manage records
                        </p>
                        <div className="inline-flex items-center text-green-600 font-medium">
                            Continue
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </button> */}

                    {/* <button
                        onClick={() => handleSelect("advisor")}
                        className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-purple-500 text-center group"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                            <UserCheck className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">
                            Advisor
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Advise students and oversee their progress
                        </p>
                        <div className="inline-flex items-center text-purple-600 font-medium">
                            Continue
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </button> */}
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">
                        Already have an account? {""}
                        <Link
                            to="/signin"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SelectRolePage
