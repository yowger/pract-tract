import { Clock, LocateIcon } from "lucide-react"
import type { Schedule } from "@/types/schedule"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Map, Source, Layer } from "@vis.gl/react-maplibre"
import "maplibre-gl/dist/maplibre-gl.css"

interface WorkScheduleCardProps {
    schedule: Schedule
    formatDate: (date: string) => string
    formatTime: (time: string) => string
}

function Requirement({
    label,
    required,
    color = "blue",
}: {
    label: string
    required: boolean | number
    color?: string
}) {
    const active = Boolean(required)

    return (
        <div
            className={`p-3 rounded-lg border text-center ${
                active
                    ? `border-${color}-500 bg-${color}-50 text-${color}-700`
                    : "border-gray-300 bg-gray-50 text-gray-500"
            }`}
        >
            <span className="text-xs font-medium">{label}</span>
        </div>
    )
}

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

const MAP_STYLE =
    "https://api.maptiler.com/maps/streets-v4/style.json?key=l60bj9KIXXKDXbsOvzuz"

export default function WorkScheduleCard({
    schedule,
    formatDate,
    formatTime,
}: WorkScheduleCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Work Schedule
                </h2>

                <Link to={`/agent/schedule/${schedule.id}/edit`}>
                    <Button variant="default">Update Schedule</Button>
                </Link>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                            Schedule Period
                        </p>
                        <p className="font-medium text-gray-900">
                            {formatDate(schedule.start_date)} —{" "}
                            {formatDate(schedule.end_date)}
                        </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                            Working Days
                        </p>
                        <p className="font-medium text-gray-900 capitalize">
                            {Array.isArray(schedule.day_of_week)
                                ? schedule.day_of_week.join(", ")
                                : "Not set"}
                        </p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Shift Times
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Morning Shift
                            </p>
                            <div className="space-y-2 pl-6 text-sm">
                                <p>
                                    <span className="text-gray-600">In:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.am_time_in)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">Out:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.am_time_out)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Grace Period:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.am_grace_period_minutes} mins
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Undertime Grace:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.am_undertime_grace_minutes}{" "}
                                        mins
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Afternoon Shift
                            </p>
                            <div className="space-y-2 pl-6 text-sm">
                                <p>
                                    <span className="text-gray-600">In:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.pm_time_in)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">Out:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.pm_time_out)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Grace Period:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.pm_grace_period_minutes} mins
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Undertime Grace:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.pm_undertime_grace_minutes}{" "}
                                        mins
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Requirements
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Requirement
                            label="AM Photo"
                            required={schedule.am_require_photo_in}
                            color="blue"
                        />
                        <Requirement
                            label="PM Photo"
                            required={schedule.pm_require_photo_in}
                            color="blue"
                        />
                        <Requirement
                            label="AM Location"
                            required={schedule.am_require_location_in}
                            color="purple"
                        />
                        <Requirement
                            label="PM Location"
                            required={schedule.pm_require_location_in}
                            color="purple"
                        />
                    </div>
                </div>

                {schedule.lat && schedule.lng && (
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Location
                        </h3>
                        <div className="w-full h-64 border rounded overflow-hidden">
                            <Map
                                attributionControl={false}
                                initialViewState={{
                                    longitude: schedule.lng,
                                    latitude: schedule.lat,
                                    zoom: 14,
                                }}
                                style={{ width: "100%", height: "100%" }}
                                mapStyle={MAP_STYLE}
                            >
                                <Source
                                    id="location-point"
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
                                    id="location-point-layer"
                                    type="circle"
                                    source="location-point"
                                    paint={{
                                        "circle-radius": 6,
                                        "circle-color": "#2563eb",
                                        "circle-stroke-color": "#1e40af",
                                        "circle-stroke-width": 2,
                                    }}
                                />

                                <Source
                                    id="location-radius"
                                    type="geojson"
                                    data={createCircleGeoJSON(
                                        schedule.lng,
                                        schedule.lat,
                                        schedule.radius
                                    )}
                                />
                                <Layer
                                    id="location-radius-layer"
                                    type="line"
                                    source="location-radius"
                                    paint={{
                                        "line-color": "#1e40af",
                                        "line-width": 2,
                                    }}
                                />
                            </Map>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
