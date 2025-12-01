import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { useRecordSelfAttendance } from "@/features/student/hooks/useAttendance"
import { toast } from "sonner"
import {
    useAttendances,
    useAttendanceStatus,
} from "@/features/shared/hooks/useAttendance"
import { AxiosError } from "axios"
import DataTable from "@/features/shared/components/Datatable"
import { AgentAttendanceColumns } from "@/features/agent/components/AgentAttendanceColumn"
import { useSchedule } from "@/features/agent/hooks/useSchedule"
import { Map, Source, Layer } from "@vis.gl/react-maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner"

const MAP_STYLE =
    "https://api.maptiler.com/maps/streets-v4/style.json?key=l60bj9KIXXKDXbsOvzuz"

function createCircleGeoJSON(
    lng: number,
    lat: number,
    radiusMeters: number
): Feature {
    const points = 64
    const coords = []
    const distanceX = radiusMeters / (111320 * Math.cos((lat * Math.PI) / 180))
    const distanceY = radiusMeters / 110540

    for (let i = 0; i <= points; i++) {
        const angle = (i * 360) / points
        const rad = (angle * Math.PI) / 180
        coords.push([
            lng + distanceX * Math.cos(rad),
            lat + distanceY * Math.sin(rad),
        ])
    }

    return {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [coords] },
        properties: {},
    }
}

import Webcam from "react-webcam"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCloudinaryBulkUpload } from "@/hooks/use-upload-bulk"
import type { Feature } from "geojson"

const StudentAttendancePage = () => {
    const { upload } = useCloudinaryBulkUpload()
    const { data: status } = useAttendanceStatus()
    console.log("🚀 ~ StudentAttendancePage ~ status:", status)
    const [showCamera, setShowCamera] = useState(false)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const webcamRef = useRef<Webcam>(null)
    const [scanned, setScanned] = useState(false)

    const [scanOpen, setScanOpen] = useState(false)

    const capturePhoto = () => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) setCapturedImage(imageSrc)
    }

    const { data: user } = useUser()
    const companyId =
        user && isStudent(user?.user)
            ? user?.user?.student?.company?.schedule?.id
            : undefined

    const [userLocation, setUserLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)

    const { data: schedule } = useSchedule(companyId)

    const { mutateAsync: recordSelfAttendance } = useRecordSelfAttendance()
    const studentId = user && isStudent(user?.user) ? user.user?.id : undefined

    const { data: attendances, isLoading: isLoadingAttendances } =
        useAttendances({
            per_page: 10,
            page: 1,
            student_id: studentId,
            start_date: new Date().toISOString().split("T")[0],
        })

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (time: string) => {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const handleScanResult = async (result: IDetectedBarcode[]) => {
        if (!result || result.length === 0 || scanned) return

        setScanned(true)

        const code = result[0]

        try {
            const data = JSON.parse(code.rawValue) as {
                companyId: number
                scheduleId: number
                timestamp: number
            }
            console.log("🚀 ~ handleScanResult ~ data:", data)

            if (data.companyId !== companyId) {
                toast.error("QR code does not belong to your company.")
                return
            }

            if (!studentId) {
                toast.error("Invalid Student ID.")
                return
            }

            if (!userLocation) {
                toast.error(
                    "You must turn on your location to clock in or out."
                )
                return
            }

            if (status?.require_photo) {
                setScanOpen(false)
                setShowCamera(true)

                return
            }

            await recordSelfAttendance({
                student_id: studentId,
                lat: userLocation.lat,
                lng: userLocation.lng,
            })

            toast.success("Successfully clocked in via QR!")
            setScanOpen(false)
        } catch (err) {
            console.error(err)
            toast.error("Invalid QR code.")
        }
    }

    const handleClockIn = async () => {
        if (!studentId) {
            toast.error("You must be logged in as student.")
            return
        }

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.")
            return
        }

        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                if (status?.require_photo) {
                    setShowCamera(true)
                    return
                }

                try {
                    await recordSelfAttendance({
                        student_id: studentId,
                        lat: latitude,
                        lng: longitude,
                    })

                    toast.success("Successfully clocked in.")
                } catch (error) {
                    console.log("🚀 ~ handleClockIn ~ error:", error)
                    if (error instanceof AxiosError) {
                        toast.error(
                            error?.response?.data?.error ||
                                "Failed to clock in."
                        )
                    }
                }
            },
            (error) => {
                console.error("Geolocation error:", error)
                toast.error("Unable to get your location.")
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }

    useEffect(() => {
        if (!navigator.geolocation) return

        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setUserLocation({ lat: latitude, lng: longitude })
            },
            (err) => console.error("Geolocation error:", err),
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }, [])

    const confirmPhoto = async () => {
        if (!capturedImage) {
            toast.error("No photo captured")
            return
        }
        if (!studentId || !userLocation) {
            toast.error("You must be logged in as student.")
            return
        }

        try {
            const blob = await (await fetch(capturedImage)).blob()
            const file = new File([blob], "attendance.jpg", {
                type: "image/jpeg",
            })

            const [uploaded] = await upload(file)

            console.log("🚀 ~ confirmPhoto ~ uploaded:", uploaded)

            await recordSelfAttendance({
                student_id: studentId,
                lat: userLocation.lat,
                lng: userLocation.lng,
                photo: uploaded.url,
            })

            toast.success("Attendance updated with photo")
            setShowCamera(false)
            setCapturedImage(null)
        } catch (err) {
            console.error("🚀 ~ confirmPhoto ~ error:", err)
            toast.error(
                err instanceof Error ? err.message : "Failed to upload photo"
            )
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-6 transition-all hover:shadow-md">
                        <div className="text-center space-y-3">
                            <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">
                                {formatDate(currentTime)}
                            </p>
                            <div className="text-7xl font-normal text-slate-800 tracking-tight">
                                {currentTime.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleClockIn}
                                className="group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
                            >
                                <Clock
                                    size={20}
                                    className="group-hover:rotate-12 transition-transform"
                                />
                                Clock In
                            </button>
                        </div>

                        <button
                            onClick={() => setScanOpen(true)}
                            className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full"
                        >
                            <Clock size={20} />
                            Clock In via QR
                        </button>
                    </div>

                    {schedule && (
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h2 className="text-xl font-bold mb-4">
                                Today's Schedule
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="font-medium">AM Shift</p>
                                    <p>
                                        {formatTime(schedule.am_time_in)} —{" "}
                                        {formatTime(schedule.am_time_out)}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">PM Shift</p>
                                    <p>
                                        {formatTime(schedule.pm_time_in)} —{" "}
                                        {formatTime(schedule.pm_time_out)}
                                    </p>
                                </div>
                            </div>

                            {schedule.lat && schedule.lng ? (
                                <div className="mb-4">
                                    <div className="flex gap-4 mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-blue-600 border border-blue-900 rounded-full"></div>
                                            <span className="text-sm text-gray-700">
                                                Schedule Location
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-green-600 border border-green-900 rounded-full"></div>
                                            <span className="text-sm text-gray-700">
                                                Your Location
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-64 border rounded overflow-hidden">
                                        <Map
                                            initialViewState={{
                                                longitude: schedule.lng,
                                                latitude: schedule.lat,
                                                zoom: 15,
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            mapStyle={MAP_STYLE}
                                            attributionControl={false}
                                        >
                                            <Source
                                                id="schedule-location"
                                                type="geojson"
                                                data={{
                                                    type: "Feature",
                                                    geometry: {
                                                        type: "Point",
                                                        coordinates: [
                                                            schedule.lng,
                                                            schedule.lat,
                                                        ],
                                                    },
                                                    properties: {},
                                                }}
                                            />
                                            <Layer
                                                id="schedule-location-circle"
                                                type="circle"
                                                source="schedule-location"
                                                paint={{
                                                    "circle-radius": 8,
                                                    "circle-color": "#2563eb",
                                                    "circle-stroke-color":
                                                        "#1e40af",
                                                    "circle-stroke-width": 2,
                                                    "circle-opacity": 0.7,
                                                }}
                                            />
                                            <Source
                                                id="geofence-circle"
                                                type="geojson"
                                                data={createCircleGeoJSON(
                                                    schedule.lng,
                                                    schedule.lat,
                                                    schedule.radius
                                                )}
                                            />
                                            <Layer
                                                id="geofence-outline"
                                                type="line"
                                                source="geofence-circle"
                                                paint={{
                                                    "line-color": "#1e40af",
                                                    "line-width": 2,
                                                }}
                                            />

                                            {userLocation && (
                                                <>
                                                    <Source
                                                        id="user-location"
                                                        type="geojson"
                                                        data={{
                                                            type: "Feature",
                                                            geometry: {
                                                                type: "Point",
                                                                coordinates: [
                                                                    userLocation.lng,
                                                                    userLocation.lat,
                                                                ],
                                                            },
                                                            properties: {},
                                                        }}
                                                    />
                                                    <Layer
                                                        id="user-location-circle"
                                                        type="circle"
                                                        source="user-location"
                                                        paint={{
                                                            "circle-radius": 8,
                                                            "circle-color":
                                                                "#16a34a",
                                                            "circle-stroke-color":
                                                                "#065f46",
                                                            "circle-stroke-width": 2,
                                                            "circle-opacity": 0.7,
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Map>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No location set for this schedule.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Today’s Attendance
                        </h2>
                        <DataTable
                            data={attendances?.data || []}
                            columns={AgentAttendanceColumns}
                            isLoading={isLoadingAttendances}
                        />
                    </div>
                </div>
            </div>

            {showCamera && (
                <Dialog
                    open={showCamera}
                    onOpenChange={(open) => {
                        setShowCamera(open)
                        if (!open) setCapturedImage(null)
                    }}
                >
                    <DialogContent>
                        <DialogTitle className="text-center">
                            Take a Photo
                        </DialogTitle>
                        <div className="flex flex-col items-center gap-4">
                            {capturedImage ? (
                                <img
                                    src={capturedImage}
                                    alt="Captured"
                                    className="rounded-md"
                                />
                            ) : (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-md"
                                />
                            )}

                            <div className="flex gap-3">
                                {!capturedImage ? (
                                    <Button onClick={capturePhoto}>
                                        Capture
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setCapturedImage(null)
                                            }
                                        >
                                            Retake
                                        </Button>
                                        <Button onClick={confirmPhoto}>
                                            Confirm
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {scanOpen && (
                <Dialog open={scanOpen} onOpenChange={setScanOpen}>
                    <DialogContent>
                        <DialogTitle>Scan QR Code</DialogTitle>
                        <div className="w-full h-96">
                            <Scanner
                                constraints={{ facingMode: "environment" }}
                                onScan={(result) => handleScanResult(result)}
                                onError={(err) => {
                                    if (err instanceof Error) {
                                        toast.error("Failed to scan QR code.")
                                    }
                                }}
                                components={{
                                    onOff: true,
                                    torch: true,
                                    zoom: true,
                                    finder: true,
                                }}
                            />
                        </div>
                        <Button
                            onClick={() => setScanOpen(false)}
                            className="mt-4"
                        >
                            Cancel
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default StudentAttendancePage
