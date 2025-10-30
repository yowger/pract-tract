import { Calendar, CheckSquare, Home } from "lucide-react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { formatDate, formatTime } from "@/utils/utils"
import ProfileHeader from "@/features/shared/components/ProfileHeader"
import { useStudent } from "../hooks/useStudent"
import StudentProfileCard from "./StudentProfileCard"
import StudentAttendanceInfoCard from "./StudentAttendanceInfoCard"
import WorkScheduleCard from "./WorkScheduleCard"
import NoScheduleCard from "./NoScheduleCard"

export default function StudentTabs({ id }: { id: string | number }) {
    const { data: student, isLoading } = useStudent(Number(id))

    if (isLoading) return <div>Loading...</div>
    if (!student) return <div>Student not found.</div>

    const userData = student.user
    const studentSchedule = student.company.schedule

    return (
        <div className="max-w-4xl mx-auto px-4 space-y-6">
            <ProfileHeader
                name={userData.name}
                status={userData.is_active ? "active" : "inactive"}
                role={"student"}
                id={userData.id}
            />

            <Tabs defaultValue="info">
                <TabsList className="bg-gray-100 rounded-lg mb-6">
                    <TabsList className="bg-gray-100 rounded-lg">
                        <TabsTrigger
                            value="info"
                            className="flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" /> Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="schedule"
                            className="flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" /> Schedule
                        </TabsTrigger>
                        <TabsTrigger
                            value="attendance"
                            className="flex items-center gap-2"
                        >
                            <CheckSquare className="w-4 h-4" /> Attendance
                        </TabsTrigger>
                    </TabsList>
                </TabsList>
                {/* 
                <TabsContent value="company">
                    <CompanyInfoCard
                        name={company.name}
                        email={company.email}
                        phone={company.phone}
                        address={company.address}
                        isActive={company.is_active}
                        studentsCount={company.students_count}
                    />
                </TabsContent> */}

                <TabsContent value="info">
                    <StudentProfileCard
                        student={student}
                        formatDate={formatDate}
                    />
                </TabsContent>

                <TabsContent value="schedule">
                    {studentSchedule ? (
                        <WorkScheduleCard
                            schedule={studentSchedule}
                            formatDate={formatDate}
                            formatTime={formatTime}
                        />
                    ) : (
                        <NoScheduleCard />
                    )}
                </TabsContent>

                <TabsContent value="attendance">
                    <StudentAttendanceInfoCard
                        userId={student.user.id}
                        studentId={student.student_id}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
