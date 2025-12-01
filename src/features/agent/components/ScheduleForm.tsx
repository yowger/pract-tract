import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { formSchema, type ScheduleFormValues } from "../api/schedule"
import {
    Layer,
    Map,
    Source,
    useMap,
    type MapLayerMouseEvent,
} from "@vis.gl/react-maplibre"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LocateIcon } from "lucide-react"
import "maplibre-gl/dist/maplibre-gl.css"
import { type Feature } from "geojson"

const daysOfWeek = [
    { key: "mon", label: "Monday" },
    { key: "tue", label: "Tuesday" },
    { key: "wed", label: "Wednesday" },
    { key: "thu", label: "Thursday" },
    { key: "fri", label: "Friday" },
    { key: "sat", label: "Saturday" },
    { key: "sun", label: "Sunday" },
]

interface ScheduleFormProps {
    onSubmit: (data: ScheduleFormValues) => void
    disabled?: boolean
    initialValues?: ScheduleFormValues
}

const MAP_STYLE =
    "https://api.maptiler.com/maps/streets-v4/style.json?key=l60bj9KIXXKDXbsOvzuz"

export function FlyToMyLocationButton({
    onLocationFound,
}: {
    onLocationFound: (lat: number, lng: number) => void
}) {
    const mapContext = useMap()

    const handleClick = () => {
        if (!mapContext?.current) {
            toast.error("Map is not ready yet")
            return
        }

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser")
            return
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                mapContext.current!.flyTo({
                    center: [longitude, latitude],
                    zoom: 15,
                    speed: 1.2,
                    curve: 1.5,
                    essential: true,
                })

                onLocationFound(latitude, longitude)
            },
            (err) => {
                console.error(err)
                toast.error("Unable to get location")
            },
            { enableHighAccuracy: true }
        )
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="absolute top-2 right-2 z-50 bg-white p-2 rounded shadow hover:bg-gray-100 transition"
        >
            <LocateIcon />
        </button>
    )
}

export function ClickMapPicker({
    onPick,
}: {
    onPick: (lat: number, lng: number) => void
}) {
    const mapContext = useMap()

    useEffect(() => {
        if (!mapContext.current) return

        const handleClick = (e: MapLayerMouseEvent) => {
            const { lng, lat } = e.lngLat
            onPick(lat, lng)
        }

        mapContext.current.on("click", handleClick)

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            mapContext?.current?.off("click", handleClick)
        }
    }, [mapContext, onPick])

    return null
}

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
        geometry: {
            type: "Polygon",
            coordinates: [coords],
        },
        properties: {},
    }
}

export function ScheduleForm({
    onSubmit,
    disabled,
    initialValues,
}: ScheduleFormProps) {
    const [userLocation, setUserLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)

    const [radius, setRadius] = useState(30)

    const form = useForm<ScheduleFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues ?? {
            day_of_week: ["mon", "tue", "wed", "thu", "fri"],
            am_time_in: "08:00",
            am_time_out: "11:30",
            pm_time_in: "13:00",
            pm_time_out: "17:00",
            am_require_photo_in: true,
            am_require_photo_out: false,
            am_require_location_in: true,
            am_require_location_out: true,
            pm_require_photo_in: true,
            pm_require_photo_out: false,
            pm_require_location_in: true,
            pm_require_location_out: true,
            allow_early_in: true,
            am_grace_period_minutes: 15,
            am_undertime_grace_minutes: 30,
            pm_grace_period_minutes: 15,
            pm_undertime_grace_minutes: 30,
            early_in_limit_minutes: 15,
        },
    })

    useEffect(() => {
        if (initialValues) {
            form.reset(initialValues)
        }

        if (initialValues?.location) {
            const [lat, lng] = initialValues.location.split(",").map(Number)
            setUserLocation({ lat, lng })
        }

        if (initialValues?.radius) {
            setRadius(initialValues.radius)
        }
    }, [initialValues, form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="day_of_week"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Days of the Week</FormLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    {daysOfWeek.map(({ key, label }) => (
                                        <label
                                            key={key}
                                            className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer"
                                        >
                                            <Checkbox
                                                checked={field.value?.includes(
                                                    key
                                                )}
                                                onCheckedChange={(checked) => {
                                                    const newDays = checked
                                                        ? [
                                                              ...(field.value ??
                                                                  []),
                                                              key,
                                                          ]
                                                        : field.value.filter(
                                                              (d) => d !== key
                                                          )
                                                    field.onChange(newDays)
                                                }}
                                            />
                                            <span className="capitalize text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div> */}

                <Separator />

                <FormField
                    control={form.control}
                    name="location"
                    render={() => (
                        <FormItem>
                            <FormLabel>Pick Location</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    <div className="w-full h-64 border rounded overflow-hidden relative">
                                        <Map
                                            attributionControl={false}
                                            initialViewState={{
                                                longitude:
                                                    userLocation?.lng ?? -100,
                                                latitude:
                                                    userLocation?.lat ?? 40,
                                                zoom: 10,
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            mapStyle={MAP_STYLE}
                                        >
                                            <FlyToMyLocationButton
                                                onLocationFound={(lat, lng) => {
                                                    setUserLocation({
                                                        lat,
                                                        lng,
                                                    })
                                                    form.setValue(
                                                        "location",
                                                        `${lat},${lng}`
                                                    )
                                                }}
                                            />
                                            <ClickMapPicker
                                                onPick={(lat, lng) => {
                                                    setUserLocation({
                                                        lat,
                                                        lng,
                                                    })
                                                    form.setValue(
                                                        "location",
                                                        `${lat},${lng}`
                                                    )
                                                }}
                                            />
                                            {userLocation && (
                                                <>
                                                    <Source
                                                        id="selected-location"
                                                        type="geojson"
                                                        data={{
                                                            type: "Feature",
                                                            properties: {},
                                                            geometry: {
                                                                type: "Point",
                                                                coordinates: [
                                                                    userLocation.lng,
                                                                    userLocation.lat,
                                                                ],
                                                            },
                                                        }}
                                                    />

                                                    <Layer
                                                        id="selected-location-circle"
                                                        type="circle"
                                                        source="selected-location"
                                                        paint={{
                                                            "circle-radius": 6,
                                                            "circle-color":
                                                                "#2563eb",
                                                            "circle-stroke-color":
                                                                "#1e40af",
                                                            "circle-stroke-width": 2,
                                                        }}
                                                    />

                                                    <Source
                                                        key={radius}
                                                        id="geofence-circle"
                                                        type="geojson"
                                                        data={createCircleGeoJSON(
                                                            userLocation.lng,
                                                            userLocation.lat,
                                                            radius
                                                        )}
                                                    />

                                                    <Layer
                                                        id="geofence-outline"
                                                        type="line"
                                                        source="geofence-circle"
                                                        paint={{
                                                            "line-color":
                                                                "#1e40af",
                                                            "line-width": 2,
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Map>

                                        <div className="absolute top-2 left-2 z-50 flex flex-col gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRadius((r) => {
                                                        const newRadius =
                                                            Math.min(r + 1, 300)
                                                        form.setValue(
                                                            "radius",
                                                            newRadius
                                                        )
                                                        return newRadius
                                                    })
                                                }}
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRadius((r) => {
                                                        const newRadius =
                                                            Math.max(r - 1, 5)
                                                        form.setValue(
                                                            "radius",
                                                            newRadius
                                                        )
                                                        return newRadius
                                                    })
                                                }}
                                            >
                                                –
                                            </button>
                                        </div>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="radius"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Radius</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        value={radius}
                                                        onChange={(e) => {
                                                            const newVal =
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            setRadius(newVal)
                                                            field.onChange(
                                                                newVal
                                                            )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Label>Coords</Label>
                                    <Input
                                        readOnly
                                        placeholder="Latitude,Longitude"
                                        value={
                                            userLocation
                                                ? `${userLocation.lat},${userLocation.lng}`
                                                : ""
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />

                <section>
                    <h3 className="text-lg font-medium mb-2">AM Schedule</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="am_time_in"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time In</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="am_time_out"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time Out</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {[
                            "am_require_photo_in",
                            "am_require_photo_out",
                            "am_require_location_in",
                            "am_require_location_out",
                        ].map((fieldName) => (
                            <FormField
                                key={fieldName}
                                control={form.control}
                                name={fieldName as keyof ScheduleFormValues}
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-md border p-2">
                                        <FormLabel className="text-sm capitalize">
                                            {fieldName
                                                .replace("am_", "")
                                                .replaceAll("_", " ")}
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={
                                                    field.value ? true : false
                                                }
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                            control={form.control}
                            name="am_grace_period_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grace Period (min)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="am_undertime_grace_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Undertime Grace (min)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <Separator />

                <section>
                    <h3 className="text-lg font-medium mb-2">PM Schedule</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="pm_time_in"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time In</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pm_time_out"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time Out</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {[
                            "pm_require_photo_in",
                            "pm_require_photo_out",
                            "pm_require_location_in",
                            "pm_require_location_out",
                        ].map((fieldName) => (
                            <FormField
                                key={fieldName}
                                control={form.control}
                                name={fieldName as keyof ScheduleFormValues}
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-md border p-2">
                                        <FormLabel className="text-sm capitalize">
                                            {fieldName
                                                .replace("pm_", "")
                                                .replaceAll("_", " ")}
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={
                                                    field.value ? true : false
                                                }
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                            control={form.control}
                            name="pm_grace_period_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grace Period (min)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pm_undertime_grace_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Undertime Grace (min)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <Separator />

                <FormField
                    control={form.control}
                    name="allow_early_in"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-md border p-2">
                            <FormLabel>Allow Early In</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="early_in_limit_minutes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Early In Limit (min)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={disabled}>
                    {disabled ? "Saving..." : "Save Schedule"}
                </Button>
            </form>
        </Form>
    )
}
