import { Calendar, User, Users } from "lucide-react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAdvisor } from "@/features/director/hooks/useAdvisors"
import ProfileHeader from "@/features/shared/components/ProfileHeader"
import AdvisorInfoCard from "./AdvisorInfoCard"
import AdvisorStudentsCard from "./AdvisorStudentsCard"
import AdvisorExcusesCard from "./AdvisorExcusesCard"

const AdvisorTabs = ({ id }: { id: number }) => {
    const { data: advisor, isLoading } = useAdvisor(id)

    if (isLoading) return <div>Loading...</div>
    if (!advisor) return <div>Advisor not found.</div>

    const userData = advisor.user

    return (
        <div className="max-w-4xl mx-auto px-4 space-y-6">
            <ProfileHeader
                name={userData?.name ?? "Unknown Advisor"}
                status={userData?.is_active ? "active" : "inactive"}
                role="advisor"
                id={userData?.id ?? 0}
            />

            <Tabs defaultValue="advisor">
                <TabsList className="bg-gray-100 rounded-lg mb-6">
                    <TabsTrigger
                        value="advisor"
                        className="flex items-center gap-2"
                    >
                        <User className="w-4 h-4" /> Advisor Info
                    </TabsTrigger>
                    <TabsTrigger
                        value="students"
                        className="flex items-center gap-2"
                    >
                        <Users className="w-4 h-4" /> Students
                    </TabsTrigger>
                    <TabsTrigger
                        value="excuses"
                        className="flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" /> Excuses
                    </TabsTrigger>
                    {/* <TabsTrigger
                        value="reports"
                        className="flex items-center gap-2"
                    >
                        <CheckSquare className="w-4 h-4" /> Reports
                    </TabsTrigger> */}
                </TabsList>

                <TabsContent value="advisor">
                    <AdvisorInfoCard
                        name={advisor.user.name}
                        email={advisor.user.email}
                        phone={advisor.user.phone}
                        address={advisor.user.address}
                        status={advisor.user.status}
                        studentsCount={advisor.students_count}
                    />
                </TabsContent>

                <TabsContent value="students">
                    <AdvisorStudentsCard advisorId={advisor.id} />
                </TabsContent>

                <TabsContent value="excuses">
                    <AdvisorExcusesCard advisorId={advisor.id} />
                </TabsContent>

                {/* <TabsContent value="reports">
                    <div className="p-4 border rounded-lg bg-white shadow-sm">
                        <h2 className="font-semibold text-lg mb-2">Reports</h2>
                        <p>Attendance / report overview (placeholder)</p>
                    </div>
                </TabsContent> */}
            </Tabs>
        </div>
    )
}

export default AdvisorTabs
