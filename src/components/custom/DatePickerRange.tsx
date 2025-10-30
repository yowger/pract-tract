"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

interface DatePickerRangeProps {
    value?: DateRange
    onChange?: (range: DateRange | undefined) => void
    className?: string
}

const DatePickerRange = ({
    value,
    onChange,
    className,
}: DatePickerRangeProps) => {
    const [range, setRange] = useState<DateRange | undefined>(value)

    const handleSelect = (selected: DateRange | undefined) => {
        setRange(selected)
        onChange?.(selected)
    }

    const formattedLabel =
        range?.from && range?.to
            ? `${format(range.from, "MMM d, yyyy")} - ${format(
                  range.to,
                  "MMM d, yyyy"
              )}`
            : "Select date range"

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`justify-between font-normal w-[220px] ${
                        className || ""
                    }`}
                >
                    {formattedLabel}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                <Calendar
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerRange
