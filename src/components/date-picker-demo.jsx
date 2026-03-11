"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"

export default function DatePickerDemo({ value, onChange }) {
  const initial = value ? new Date(value) : undefined
  const [date, setDate] = React.useState(initial)
  const [temp, setTemp] = React.useState(initial)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const dt = value ? new Date(value) : undefined
    setDate(dt)
    setTemp(dt)
  }, [value])

  const handleSelect = (d) => {
    setTemp(d)
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-72 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="fixed left-1/2 top-4 z-9999 w-[min(22rem,calc(100vw-1rem))] -translate-x-1/2 rounded-2xl border border-orange-200 bg-white p-3 text-stone-950 shadow-2xl ring-1 ring-black/5 dark:border-stone-800 dark:bg-stone-950 dark:text-amber-50"
      >
        <div className="w-full">
          <Calendar mode="single" selected={temp} onSelect={handleSelect} />
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <PopoverClose asChild>
            <Button
              variant="ghost"
              onClick={() => {
                setTemp(date)
              }}
            >
              Cancel
            </Button>
          </PopoverClose>

          <PopoverClose asChild>
            <Button
              onClick={() => {
                setDate(temp)
                if (onChange) onChange(temp)
              }}
              disabled={!temp}
            >
              Select
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
