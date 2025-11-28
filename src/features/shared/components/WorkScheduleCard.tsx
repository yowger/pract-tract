import {
    Clock,
    MapPin,
    Camera,
    Calendar,
    Edit,
    type LucideIcon,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Map, Source, Layer } from "@vis.gl/react-maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import type { Schedule } from "@/types/schedule"
import { useUser } from "@/features/auth/hooks/useUser"
import { getUserRole } from "@/features/auth/types/auth"
import type { Feature } from "geojson"

interface WorkScheduleCardProps {
    schedule: Schedule
    formatDate: (date: string) => string
    formatTime: (time: string) => string
}

function createCircleGeoJSON(lng: number, lat: number, radiusMeters: number):Feature {
    const points = 64
    const coords: [number, number][] = []

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
        geometry: {
            type: "Polygon",
            coordinates: [coords],
        },
        properties: {},
    }
}

const MAP_STYLE =
    "https://api.maptiler.com/maps/streets-v4/style.json?key=l60bj9KIXXKDXbsOvzuz"

interface InfoCardProps {
    icon: LucideIcon
    label: string
    value: string
    iconColor?: string
}

const InfoCard: React.FC<InfoCardProps> = ({
    icon: Icon,
    label,
    value,
    iconColor = "text-blue-600",
}) => (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className={`${iconColor} mt-0.5`}>
            <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                {label}
            </p>
            <p className="text-sm font-medium text-slate-900">{value}</p>
        </div>
    </div>
)

interface ShiftCardProps {
    title: string
    timeIn: string
    timeOut: string
    grace: number
    undertime: number
    icon: LucideIcon
    formatTime: (time: string) => string
}

const ShiftCard: React.FC<ShiftCardProps> = ({
    title,
    timeIn,
    timeOut,
    grace,
    undertime,
    icon: Icon,
    formatTime,
}) => (
    <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-all">
        <div className="flex items-center gap-2 mb-4">
            <Icon size={18} className="text-slate-700" />
            <h4 className="font-semibold text-slate-900">{title}</h4>
        </div>

        <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Clock In</span>
                <span className="text-sm font-semibold text-slate-900">
                    {formatTime(timeIn)}
                </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Clock Out</span>
                <span className="text-sm font-semibold text-slate-900">
                    {formatTime(timeOut)}
                </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Late Grace</span>
                <span className="text-sm font-medium text-slate-700">
                    {grace} min
                </span>
            </div>

            <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-600">
                    Early Leave Grace
                </span>
                <span className="text-sm font-medium text-slate-700">
                    {undertime} min
                </span>
            </div>
        </div>
    </div>
)

interface RequirementBadgeProps {
    icon: LucideIcon
    label: string
    required: boolean
}

const RequirementBadge: React.FC<RequirementBadgeProps> = ({
    icon: Icon,
    label,
    required,
}) => (
    <div
        className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all ${
            required
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-slate-100 text-slate-400 border border-slate-200"
        }`}
    >
        <Icon size={16} />
        <span className="text-sm font-medium">{label}</span>
        {required && (
            <span className="ml-1 w-2 h-2 bg-blue-600 rounded-full"></span>
        )}
    </div>
)

const WorkScheduleCard: React.FC<WorkScheduleCardProps> = ({
    schedule,
    formatDate,
    formatTime,
}) => {
    const { data } = useUser()
    const role = data && getUserRole(data.user)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
                            Work Schedule
                        </h1>
                        <p className="text-slate-600">
                            View and manage your working hours
                        </p>
                    </div>

                    {role === "agent" && (
                        <Link to={`/agent/schedule/${schedule.id}/edit`}>
                            <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-sm hover:shadow-md active:scale-95">
                                <Edit size={18} />
                                Edit Schedule
                            </button>
                        </Link>
                    )}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoCard
                            icon={Calendar}
                            label="Schedule Period"
                            value={`${formatDate(
                                schedule.start_date
                            )} — ${formatDate(schedule.end_date)}`}
                            iconColor="text-purple-600"
                        />

                        <InfoCard
                            icon={Calendar}
                            label="Working Days"
                            value={
                                Array.isArray(schedule.day_of_week)
                                    ? schedule.day_of_week
                                          .map(
                                              (d) =>
                                                  d.charAt(0).toUpperCase() +
                                                  d.slice(1)
                                          )
                                          .join(", ")
                                    : "Not set"
                            }
                            iconColor="text-green-600"
                        />
                    </div>

                    <div className="border-t border-slate-100"></div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-5">
                            Shift Times
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <ShiftCard
                                title="Morning Shift"
                                icon={Clock}
                                timeIn={schedule.am_time_in}
                                timeOut={schedule.am_time_out}
                                grace={schedule.am_grace_period_minutes}
                                undertime={schedule.am_undertime_grace_minutes}
                                formatTime={formatTime}
                            />

                            <ShiftCard
                                title="Afternoon Shift"
                                icon={Clock}
                                timeIn={schedule.pm_time_in}
                                timeOut={schedule.pm_time_out}
                                grace={schedule.pm_grace_period_minutes}
                                undertime={schedule.pm_undertime_grace_minutes}
                                formatTime={formatTime}
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-100"></div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-5">
                            Clock-in Requirements
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            <RequirementBadge
                                icon={Camera}
                                label="AM Photo"
                                required={schedule.am_require_photo_in}
                            />
                            <RequirementBadge
                                icon={Camera}
                                label="PM Photo"
                                required={schedule.pm_require_photo_in}
                            />
                            <RequirementBadge
                                icon={MapPin}
                                label="AM Location"
                                required={schedule.am_require_location_in}
                            />
                            <RequirementBadge
                                icon={MapPin}
                                label="PM Location"
                                required={schedule.pm_require_location_in}
                            />
                        </div>
                    </div>

                    {schedule.lat && schedule.lng && (
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                Location
                            </h3>

                            <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-200">
                                <Map
                                    attributionControl={false}
                                    initialViewState={{
                                        longitude: schedule.lng,
                                        latitude: schedule.lat,
                                        zoom: 14,
                                    }}
                                    mapStyle={MAP_STYLE}
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <Source
                                        id="marker"
                                        type="geojson"
                                        data={{
                                            type: "Feature",
                                            properties: {},
                                            geometry: {
                                                type: "Point",
                                                coordinates: [
                                                    schedule.lng,
                                                    schedule.lat,
                                                ],
                                            },
                                        }}
                                    />
                                    <Layer
                                        id="marker-layer"
                                        type="circle"
                                        source="marker"
                                        paint={{
                                            "circle-radius": 6,
                                            "circle-color": "#2563eb",
                                            "circle-stroke-color": "#1e40af",
                                            "circle-stroke-width": 2,
                                        }}
                                    />

                                    <Source
                                        id="radius"
                                        type="geojson"
                                        data={createCircleGeoJSON(
                                            schedule.lng,
                                            schedule.lat,
                                            schedule.radius
                                        )}
                                    />
                                    <Layer
                                        id="radius-layer"
                                        type="line"
                                        source="radius"
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
        </div>
    )
}

export default WorkScheduleCard
