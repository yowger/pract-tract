import { Calendar, CheckSquare, CheckSquare2, Home } from "lucide-react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { formatDate, formatTime } from "@/utils/utils"
import ProfileHeader from "@/features/shared/components/ProfileHeader"
import { useStudent } from "../hooks/useStudent"
import StudentProfileCard from "./StudentProfileCard"
import StudentAttendanceInfoCard from "./StudentAttendanceInfoCard"
import WorkScheduleCard from "./WorkScheduleCard"
import { Card, CardContent } from "@/components/ui/card"
import StudentEvaluationsTab from "./StudentEvaluationsTab"
import StudentDocumentsTab from "./StudentDocumentTab"
import ViolationsTable from "./ViolationTabs"

export default function StudentTabs({ id }: { id: string | number }) {
    const { data: student, isLoading } = useStudent(Number(id))
    console.log("🚀 ~ StudentTabs ~ student:", student)

    if (isLoading) return <div>Loading...</div>
    if (!student) return <div>Student not found.</div>

    const userData = student.user
    const studentSchedule = student?.company?.schedule

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
                        <TabsTrigger
                            value="evaluations"
                            className="flex items-center gap-2"
                        >
                            <CheckSquare2 className="w-4 h-4" /> Evaluations
                        </TabsTrigger>
                        <TabsTrigger
                            value="violations"
                            className="flex items-center gap-2"
                        >
                            <CheckSquare2 className="w-4 h-4" /> Violations
                        </TabsTrigger>
                        <TabsTrigger
                            value="documents"
                            className="flex items-center gap-2"
                        >
                            <CheckSquare2 className="w-4 h-4" /> Documents
                        </TabsTrigger>
                    </TabsList>
                </TabsList>

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
                        <Card>
                            <CardContent>
                                <p>
                                    No schedule has been assigned to this
                                    student yet.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="attendance">
                    <StudentAttendanceInfoCard
                        userId={student.user.id}
                        studentId={student.student_id}
                        companyId={student.company_id}
                    />
                </TabsContent>

                <TabsContent value="evaluations">
                    <StudentEvaluationsTab
                        evaluationAnswers={student.evaluation_answers}
                    />
                </TabsContent>

                <TabsContent value="violations">
                    <ViolationsTable studentId={student.id} />
                </TabsContent>

                <TabsContent value="documents">
                    <StudentDocumentsTab studentId={student.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
