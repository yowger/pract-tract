import { UserIcon } from "lucide-react"

import type { User } from "@/types/user"

interface ProfileHeaderProps {
    user: User
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const getStatusColor = (status: string) => {
        return status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <UserIcon className="w-10 h-10 text-white" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {user.name}
                        </h1>

                        <div className="flex items-center gap-3 mt-2">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                    user.status
                                )}`}
                            >
                                {user.status
                                    ? user.status.charAt(0).toUpperCase() +
                                      user.status.slice(1)
                                    : "Unknown"}
                            </span>

                            <span className="text-gray-600 text-sm capitalize">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-right text-sm text-gray-500">
                    ID: {user.id}
                </div>
            </div>
        </div>
    )
}
