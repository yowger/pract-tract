import { GraduationCap } from "lucide-react"

import StudentForm from "../../../features/auth/components/forms/StudentForm"

const StudentFormPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                        Student Registration
                    </h1>
                    <p className="text-gray-600">
                        Create your account to get started
                    </p>
                </div>

                <StudentForm />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="/signin"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    By signing up, you agree to our{" "}
                    <button className="text-blue-600 hover:underline">
                        Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-blue-600 hover:underline">
                        Privacy Policy
                    </button>
                </p>
            </div>
        </div>
    )
}

export default StudentFormPage
