import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"
import { useCompany } from "@/features/shared/hooks/useCompany"
import QRCode from "react-qr-code"
import { Building2, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react"

export default function AgentQrPage() {
    const { data: user } = useUser()

    const companyId =
        user && isAgent(user.user) ? user.user.agent.company_id : undefined

    const { data: company } = useCompany(companyId)

    const schedule = company?.schedule

    if (!company || !schedule) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-600 text-sm">Loading...</p>
                </div>
            </div>
        )
    }

    const qrValue = JSON.stringify({
        companyId: company.id,
        scheduleId: schedule.id,
        timestamp: Date.now(),
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-normal text-gray-900 mb-1">
                                {company.name}
                            </h1>
                            <p className="text-gray-600 text-base">
                                {company.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center">
                        <div className="bg-white p-6 rounded-xl">
                            <QRCode value={qrValue} size={240} />
                        </div>
                        <p className="text-sm text-gray-500 mt-6 text-center">
                            Scan to clock in/out
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Schedule Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-2">
                                    Working Days
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {schedule.day_of_week.map((day) => (
                                        <span
                                            key={day}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                        >
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                            Morning Shift
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {schedule.am_time_in} —{" "}
                                            {schedule.am_time_out}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                            Afternoon Shift
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {schedule.pm_time_in} —{" "}
                                            {schedule.pm_time_out}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    {schedule.allow_early_in ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                            Early Clock-In
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {schedule.allow_early_in
                                                ? `Allowed up to ${schedule.early_in_limit_minutes} minutes early`
                                                : "Not permitted"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
