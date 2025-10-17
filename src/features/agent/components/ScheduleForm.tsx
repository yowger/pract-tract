import { useForm } from "react-hook-form"
import { z } from "zod"
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
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

const formSchema = z.object({
    company_id: z.string().optional(),
    day_of_week: z.array(z.string().min(1)).min(1, "Select at least one day"),
    start_date: z.string().optional(),
    end_date: z.string().optional(),

    am_time_in: z.string().optional(),
    am_time_out: z.string().optional(),
    am_require_photo_in: z.boolean(),
    am_require_photo_out: z.boolean(),
    am_require_location_in: z.boolean(),
    am_require_location_out: z.boolean(),
    am_grace_period_minutes: z.number().optional(),
    am_undertime_grace_minutes: z.number().optional(),

    pm_time_in: z.string().optional(),
    pm_time_out: z.string().optional(),
    pm_require_photo_in: z.boolean(),
    pm_require_photo_out: z.boolean(),
    pm_require_location_in: z.boolean(),
    pm_require_location_out: z.boolean(),
    pm_grace_period_minutes: z.number().optional(),
    pm_undertime_grace_minutes: z.number().optional(),

    allow_early_in: z.boolean(),
    early_in_limit_minutes: z.number().optional(),
})

type ScheduleFormValues = z.infer<typeof formSchema>

interface ScheduleFormProps {
    onSubmit: (data: ScheduleFormValues) => void
    companies?: { id: number; name: string }[]
}

export function ScheduleForm({ onSubmit, companies = [] }: ScheduleFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            day_of_week: [],
            am_require_photo_in: false,
            am_require_photo_out: false,
            am_require_location_in: false,
            am_require_location_out: false,
            pm_require_photo_in: false,
            pm_require_photo_out: false,
            pm_require_location_in: false,
            pm_require_location_out: false,
            allow_early_in: false,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {companies.length > 0 && (
                        <FormField
                            control={form.control}
                            name="company_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company (optional)</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ""}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select company" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {companies.map((c) => (
                                                <SelectItem
                                                    key={c.id}
                                                    value={String(c.id)}
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="day_of_week"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Days of the Week</FormLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    {daysOfWeek.map((day) => (
                                        <label
                                            key={day}
                                            className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer"
                                        >
                                            <Checkbox
                                                checked={field.value?.includes(
                                                    day
                                                )}
                                                onCheckedChange={(checked) => {
                                                    const newDays = checked
                                                        ? [
                                                              ...(field.value ??
                                                                  []),
                                                              day,
                                                          ]
                                                        : field.value.filter(
                                                              (d) => d !== day
                                                          )
                                                    field.onChange(newDays)
                                                }}
                                            />
                                            <span className="capitalize text-sm">
                                                {day}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <Separator />

                {/* AM Schedule */}
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

                <Button type="submit" className="w-full">
                    Save Schedule
                </Button>
            </form>
        </Form>
    )
}
