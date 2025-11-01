import { User, Mail, Phone, MapPin, Users } from "lucide-react"

interface AdvisorInfoCardProps {
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    status?: string | null
    studentsCount?: number | null
}

export default function AdvisorInfoCard({
    name,
    email,
    phone,
    address,
    status,
    studentsCount = 0,
}: AdvisorInfoCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Advisor Information
            </h2>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Advisor Name</p>
                        <p className="font-medium text-gray-900">
                            {name || "—"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Advisor Email</p>
                        <p className="font-medium text-gray-900">
                            {email || "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Advisor Phone</p>
                        <p className="font-medium text-gray-900">
                            {phone || "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">
                            {address || "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">
                            Number of Students
                        </p>
                        <p className="font-medium text-gray-900">
                            {studentsCount ?? "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Advisor Status</p>
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {status === "active" ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>
        </div>
    )
}
