"use client"

import * as React from "react"
import { parse, format } from "date-fns"
import { Clock as ClockIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"

export default function TimePickerDemo({ value, onChange }) {
  const initial = value || undefined
  const [temp, setTemp] = React.useState(initial)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setTemp(value || undefined)
  }, [value])

  const display = (val) => {
    if (!val) return null
    try {
      const d = parse(val, 'HH:mm', new Date())
      return format(d, 'h:mm aa')
    } catch (e) {
      return val
    }
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="w-44 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <ClockIcon className="mr-2" />
          {value ? display(value) : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="fixed left-1/2 top-20 z-9999 w-[min(18rem,calc(100vw-1rem))] -translate-x-1/2 rounded-2xl border border-orange-200 bg-white p-3 text-stone-950 shadow-2xl ring-1 ring-black/5 dark:border-stone-800 dark:bg-stone-950 dark:text-amber-50"
      >
        <div className="w-full">
          <input
            type="time"
            value={temp || ''}
            onChange={(e) => setTemp(e.target.value)}
            className="w-full rounded-md border border-orange-200 bg-orange-50 px-3 py-2 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <PopoverClose asChild>
            <Button
              variant="ghost"
              onClick={() => {
                setTemp(value)
              }}
            >
              Cancel
            </Button>
          </PopoverClose>

          <PopoverClose asChild>
            <Button
              onClick={() => {
                if (onChange) onChange(temp)
                setOpen(false)
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
