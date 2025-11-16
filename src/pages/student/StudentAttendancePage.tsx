import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { useRecordSelfAttendance } from "@/features/student/hooks/useAttendance"
import { toast } from "sonner"
import { useAttendances } from "@/features/shared/hooks/useAttendance"
import { AxiosError } from "axios"
import DataTable from "@/features/shared/components/Datatable"
import { AgentAttendanceColumns } from "@/features/agent/components/AgentAttendanceColumn"
import { useSchedule } from "@/features/agent/hooks/useSchedule"
import { Map, Source, Layer } from "@vis.gl/react-maplibre"
import "maplibre-gl/dist/maplibre-gl.css"

const MAP_STYLE =
    "https://api.maptiler.com/maps/streets-v4/style.json?key=l60bj9KIXXKDXbsOvzuz"

function createCircleGeoJSON(lng: number, lat: number, radiusMeters: number) {
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

const StudentAttendancePage = () => {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="text-center">
                        <p className="text-slate-600 text-lg mb-2">
                            {formatDate(currentTime)}
                        </p>
                        <div className="text-6xl font-bold text-blue-600 font-mono mb-4">
                            {currentTime.toLocaleTimeString()}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleClockIn}
                            className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-lg text-lg"
                        >
                            <Clock size={24} />
                            Clock In
                        </button>
                    </div>
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
    )
}

export default StudentAttendancePage
