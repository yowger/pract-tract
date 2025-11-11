"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    FileText,
    Calendar,
    User,
    Building,
    Clock,
    Loader2,
} from "lucide-react"
import type { ExcuseResponse } from "@/features/shared/api/excuseApi"

interface ExcuseModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    excuse?: ExcuseResponse
    showActions?: boolean
    onApprove?: (excuse: ExcuseResponse) => void
    onReject?: (excuse: ExcuseResponse) => void
    isApproving?: boolean
    isRejecting?: boolean
}

export function ExcuseModal({
    open,
    onOpenChange,
    excuse,
    showActions = true,
    onApprove,
    onReject,
    isApproving = false,
    isRejecting = false,
}: ExcuseModalProps) {
    if (!excuse) return null

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-green-100 text-green-800 border-green-200"
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200"
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const imageAttachments =
        excuse.attachments?.filter((att) => att.type === "image") || []
    const fileAttachments =
        excuse.attachments?.filter((att) => att.type !== "image") || []

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Excuse Slip Details</DialogTitle>
                    <DialogDescription>
                        Review the excuse slip information below
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="font-semibold text-lg">
                                        {excuse.student.user?.name || "N/A"}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        ({excuse.student.student_id})
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 ml-6">
                                    Program {excuse.student.program_id}, Section{" "}
                                    {excuse.student.section_id}
                                </div>
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                    excuse.status
                                )}`}
                            >
                                {excuse.status.charAt(0).toUpperCase() +
                                    excuse.status.slice(1)}
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">
                                Date of Absence:
                            </span>
                            <span>{formatDate(excuse.date)}</span>
                        </div>

                        <div>
                            <div className="font-medium text-sm mb-1">
                                Title / Reason:
                            </div>
                            <div className="text-sm text-gray-700">
                                {excuse.title || "-"}
                            </div>
                        </div>

                        {excuse.description && (
                            <div>
                                <div className="font-medium text-sm mb-1">
                                    Description:
                                </div>
                                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {excuse.description}
                                </div>
                            </div>
                        )}
                    </div>

                    {(fileAttachments.length > 0 ||
                        imageAttachments.length > 0) && (
                        <div className="border rounded-lg p-4">
                            <div className="font-medium text-sm mb-3">
                                Attachments:
                            </div>

                            {imageAttachments.length > 0 && (
                                <>
                                    <div className="font-medium text-xs text-gray-500 mb-1">
                                        Images
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {imageAttachments.map((att) => (
                                            <img
                                                key={att.url}
                                                src={att.url}
                                                alt={att.name || "Attachment"}
                                                className="w-20 h-20 object-cover rounded cursor-pointer border"
                                                onClick={() =>
                                                    window.open(
                                                        att.url,
                                                        "_blank"
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {fileAttachments.length > 0 && (
                                <>
                                    {imageAttachments.length > 0 && (
                                        <div className="border-t border-gray-200 my-2" />
                                    )}
                                    <div className="font-medium text-xs text-gray-500 mb-1">
                                        Files
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {fileAttachments.map((att) => (
                                            <button
                                                key={att.url}
                                                onClick={() =>
                                                    window.open(
                                                        att.url,
                                                        "_blank"
                                                    )
                                                }
                                                className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-left"
                                            >
                                                <FileText className="w-4 h-4" />
                                                <span>
                                                    {att.name || "File"}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="border rounded-lg p-4 space-y-2">
                        {excuse.student.company && (
                            <div className="flex items-center gap-2 text-sm">
                                <Building className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">Company:</span>
                                <span>{excuse.student.company.name}</span>
                            </div>
                        )}
                        {excuse.student.advisor && (
                            <div className="flex items-center gap-2 text-sm">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">Advisor:</span>
                                <span>{excuse.student.advisor.user.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">Submitted:</span>
                            <span>{formatDate(excuse.created_at)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-3 pt-4 border-t">
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>

                    <div className="flex gap-2">
                        {showActions && excuse.status === "pending" && (
                            <div className="flex gap-2">
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => onApprove?.(excuse)}
                                    disabled={isApproving || isRejecting}
                                >
                                    {isApproving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Approving...
                                        </>
                                    ) : (
                                        "Approve"
                                    )}
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() => onReject?.(excuse)}
                                    disabled={isApproving || isRejecting}
                                >
                                    {isRejecting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Rejecting...
                                        </>
                                    ) : (
                                        "Reject"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
