import { Users, Calendar, CheckSquare, User, Home } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useCompany } from "@/features/shared/hooks/useCompany"
import PersonalInfoCard from "@/features/shared/components/PersonalInfoCard"
import CompanyInfoCard from "@/features/shared/components/CompanyInfoCard"
import WorkScheduleCard from "@/features/shared/components/WorkScheduleCard"
import { formatDate, formatTime } from "@/utils/utils"
import NoScheduleCard from "@/features/shared/components/NoScheduleCard"
import ProfileHeader from "@/features/shared/components/ProfileHeader"
import StudentInfoCard from "@/features/shared/components/StudentInfoCard"
import AttendanceInfoCard from "@/features/shared/components/AttendanceInfoCard"
import CompanyStudentExcusesCard from "./CompanyStudentExcuse"
import { EvaluationsTable } from "@/features/shared/components/EvaluationsTable"

export default function CompanyTabs({ id }: { id: string | number }) {
    const { data: company, isLoading } = useCompany(Number(id))

    if (isLoading) return <div>Loading...</div>
    if (!company) return <div>Company not found.</div>

    const userData = company.owner
    const companySchedule = company.schedule

    return (
        <div className="max-w-4xl mx-auto px-4 space-y-6">
            <ProfileHeader
                name={company.name}
                status={company.is_active ? "active" : "inactive"}
                role={"company"}
                id={userData.id}
            />

            <Tabs defaultValue="company">
                <TabsList className="bg-gray-100 rounded-lg mb-6">
                    <TabsTrigger
                        value="company"
                        className="flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" /> Company
                    </TabsTrigger>
                    <TabsTrigger
                        value="owner"
                        className="flex items-center gap-2"
                    >
                        <User className="w-4 h-4" /> Owner
                    </TabsTrigger>
                    <TabsTrigger
                        value="schedule"
                        className="flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" /> Schedule
                    </TabsTrigger>
                    <TabsTrigger
                        value="students"
                        className="flex items-center gap-2"
                    >
                        <Users className="w-4 h-4" /> Students List
                    </TabsTrigger>
                    <TabsTrigger
                        value="excuses"
                        className="flex items-center gap-2"
                    >
                        <Users className="w-4 h-4" /> Students Excuse
                    </TabsTrigger>
                    <TabsTrigger
                        value="attendance"
                        className="flex items-center gap-2"
                    >
                        <CheckSquare className="w-4 h-4" /> Attendance
                    </TabsTrigger>
                    <TabsTrigger
                        value="evaluations"
                        className="flex items-center gap-2"
                    >
                        <CheckSquare className="w-4 h-4" /> Evaluations
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                    <CompanyInfoCard
                        name={company.name}
                        email={company.email}
                        phone={company.phone}
                        address={company.address}
                        isActive={company.is_active}
                        studentsCount={company.students_count}
                    />
                </TabsContent>

                <TabsContent value="owner">
                    <PersonalInfoCard
                        email={userData.email}
                        phone={userData.phone}
                        role={userData.role}
                        createdAt={userData.created_at}
                        formatDate={formatDate}
                    />
                </TabsContent>

                <TabsContent value="schedule">
                    {companySchedule ? (
                        <WorkScheduleCard
                            schedule={companySchedule}
                            formatDate={formatDate}
                            formatTime={formatTime}
                        />
                    ) : (
                        <NoScheduleCard />
                    )}
                </TabsContent>

                <TabsContent value="students">
                    <StudentInfoCard companyId={company.id} />
                </TabsContent>

                <TabsContent value="excuses">
                    <CompanyStudentExcusesCard companyId={company.id} />
                </TabsContent>

                <TabsContent value="attendance">
                    <AttendanceInfoCard companyId={company.id} />
                </TabsContent>

                <TabsContent value="evaluations">
                    {company.owner_evaluations.length === 0 ? (
                        <p>No evaluations assigned.</p>
                    ) : (
                        <EvaluationsTable data={company.owner_evaluations} />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
