import { useParams } from "react-router-dom"

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

const DirectorCompanyProfilePage = () => {
    const { id } = useParams()
    const { data: company, isLoading } = useCompany(Number(id))

    if (isLoading) return <div>Loading...</div>
    if (!company) return <div>Company not found.</div>

    const userData = company.owner
    const companySchedule = company.schedule

    return (
        <div className="max-w-4xl space-y-6">
            <ProfileHeader user={userData} />

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <PersonalInfoCard
                        email={userData.email}
                        phone={userData.phone}
                        role={userData.role}
                        createdAt={userData.created_at}
                        formatDate={formatDate}
                    />
                </TabsContent>

                <TabsContent value="company">
                    <CompanyInfoCard
                        name={company.name}
                        email={company.email}
                        phone={company.phone}
                        address={company.address}
                        isActive={company.is_active}
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

                <TabsContent value="attendance">
                    <AttendanceInfoCard companyId={company.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DirectorCompanyProfilePage
