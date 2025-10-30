import {
    Mail,
    Phone,
    Shield,
    Calendar,
    BookOpen,
    Users,
    Briefcase,
    Hash,
    User,
    Home,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StudentResponse } from "../api/studentApi"
import type React from "react"
import { Link } from "react-router-dom"

interface StudentProfileCardProps {
    student: StudentResponse
    formatDate: (date: string) => string
}

export default function StudentProfileCard({
    student,
    formatDate,
}: StudentProfileCardProps) {
    const { user, student_id, program, section, created_at, advisor, company } =
        student

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem
                            icon={Hash}
                            label="Student ID"
                            value={student_id}
                        />
                        <InfoItem
                            icon={Mail}
                            label="Email"
                            value={user?.email}
                        />
                        <InfoItem
                            icon={Phone}
                            label="Phone"
                            value={user?.phone}
                        />
                        <InfoItem
                            icon={Shield}
                            label="Status"
                            value={user?.status}
                            capitalize
                        />
                        <InfoItem
                            icon={Briefcase}
                            label="Role"
                            value={user?.role}
                            capitalize
                        />
                        <InfoItem
                            icon={Calendar}
                            label="Member Since"
                            value={
                                created_at ? formatDate(created_at) : undefined
                            }
                        />
                        <InfoItem
                            icon={BookOpen}
                            label="Program"
                            value={program?.name}
                            subValue={program?.code}
                        />
                        <InfoItem
                            icon={Users}
                            label="Section"
                            value={section?.name}
                        />
                    </div>
                </CardContent>
            </Card>

            {advisor?.user && (
                <Card>
                    <CardHeader>
                        <CardTitle>Advisor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem
                                icon={User}
                                label="Name"
                                value={advisor.user.name}
                            />
                            <InfoItem
                                icon={Mail}
                                label="Email"
                                value={advisor.user.email}
                            />
                            <InfoItem
                                icon={Phone}
                                label="Phone"
                                value={advisor.user.phone}
                            />
                            <InfoItem
                                icon={Briefcase}
                                label="Role"
                                value={advisor.user.role}
                                capitalize
                            />
                            <InfoItem
                                icon={Shield}
                                label="Status"
                                value={advisor.user.status}
                                capitalize
                            />
                            <InfoItem
                                icon={Calendar}
                                label="Member Since"
                                value={
                                    advisor.user.created_at
                                        ? formatDate(advisor.user.created_at)
                                        : undefined
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {company && (
                <Card>
                    <CardHeader>
                        <CardTitle>Company</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem
                                icon={Home}
                                label="Company Name"
                                value={
                                    <Link
                                        to={`/director/companies/${company.id}`}
                                        className="hover:underline"
                                    >
                                        {company.name}
                                    </Link>
                                }
                            />
                            <InfoItem
                                icon={Mail}
                                label="Email"
                                value={company.email}
                            />
                            <InfoItem
                                icon={Phone}
                                label="Phone"
                                value={company.phone}
                            />
                            <InfoItem
                                icon={Shield}
                                label="Status"
                                value={
                                    company.is_active ? "active" : "inactive"
                                }
                                capitalize
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

interface InfoItemProps {
    icon: React.ElementType
    label: string
    value?: React.ReactNode
    subValue?: string
    capitalize?: boolean
}

const InfoItem = ({
    icon: Icon,
    label,
    value,
    subValue,
    capitalize,
}: InfoItemProps) => (
    <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-blue-600" />
        <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p
                className={`font-medium text-gray-900 ${
                    capitalize ? "capitalize" : ""
                }`}
            >
                {value ?? "Not provided"}
                {subValue && (
                    <span className="text-xs text-gray-500 ml-1">
                        {subValue}
                    </span>
                )}
            </p>
        </div>
    </div>
)
