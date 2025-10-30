import { Card, CardContent } from "@/components/ui/card"

interface ProfileHeaderProps {
    name: string
    status?: string
    role?: string
    id?: string | number
    avatarUrl?: string | null
}

export default function ProfileHeader({
    name,
    status,
    role,
    id,
    avatarUrl,
}: ProfileHeaderProps) {
    const getStatusColor = (status?: string) => {
        if (status === "active") return "bg-green-100 text-green-800"
        if (status === "inactive") return "bg-gray-100 text-gray-800"
        return "bg-yellow-100 text-yellow-800"
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <Card>
            <CardContent className="flex items-start justify-between p-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={name}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            getInitials(name)
                        )}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {name}
                        </h1>

                        <div className="flex items-center gap-3 mt-2">
                            {status && (
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                        status
                                    )}`}
                                >
                                    {status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                </span>
                            )}

                            {role && (
                                <span className="text-gray-600 text-sm capitalize">
                                    {role}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {id && (
                    <div className="text-right text-sm text-gray-500">
                        ID: {id}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
