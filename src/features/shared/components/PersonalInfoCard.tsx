import { Mail, Phone, Shield, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PersonalInfoCardProps {
    email?: string | null
    phone?: string | null
    role?: string | null
    createdAt?: string | null
    formatDate: (date: string) => string
}

export default function PersonalInfoCard({
    email,
    phone,
    role,
    createdAt,
    formatDate,
}: PersonalInfoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">
                                {email || "Not provided"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium text-gray-900">
                                {phone || "Not provided"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">Role</p>
                            <p className="font-medium text-gray-900 capitalize">
                                {role || "—"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">
                                Member Since
                            </p>
                            <p className="font-medium text-gray-900">
                                {createdAt ? formatDate(createdAt) : "—"}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
