import { Link } from "react-router-dom"

interface NoScheduleCardProps {
    createLink?: string
}

export default function NoScheduleCard({
    createLink = "/agent/schedule/create",
}: NoScheduleCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Schedule Found
            </h2>

            <p className="text-gray-600 mb-6">
                You don’t have a work schedule yet. Create one to get started.
            </p>

            <Link
                to={createLink}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Create Schedule
            </Link>
        </div>
    )
}
