import { Building2, Mail, Phone, MapPin } from "lucide-react"

interface CompanyInfoCardProps {
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    isActive?: boolean | number | null
}

export default function CompanyInfoCard({
    name,
    email,
    phone,
    address,
    isActive,
}: CompanyInfoCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Company Information
            </h2>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Company Name</p>
                        <p className="font-medium text-gray-900">
                            {name || "—"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Company Email</p>
                        <p className="font-medium text-gray-900">
                            {email || "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Company Phone</p>
                        <p className="font-medium text-gray-900">
                            {phone || "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">Company Address</p>
                        <p className="font-medium text-gray-900">
                            {address || "Not provided"}
                        </p>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                        Company Active Status
                    </p>
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>
        </div>
    )
}
