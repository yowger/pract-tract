import { useStudents } from "@/features/director/hooks/useStudents"

const StudentManagementPage = () => {
    const { data, isLoading, error } = useStudents({ per_page: 10, page: 1 })
    console.log("🚀 ~ StudentManagementPage ~ data:", data)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading students.</p>

    const students = data?.data

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Students</h1>
            <ul className="space-y-2">
                {students?.map((student) => (
                    <li key={student.id} className="p-3 rounded bg-gray-100">
                        <p>
                            <strong>{student.user.name}</strong> –{" "}
                            {student.program?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            Status: {student.user.status}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StudentManagementPage
