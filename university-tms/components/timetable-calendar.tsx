"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TimetableCalendar() {
  const [view, setView] = useState("week")
  const [currentWeek, setCurrentWeek] = useState("Week 1 (May 6 - May 12)")

  // Sample timetable data
  const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const events = [
    { day: "Monday", start: "10:00", end: "12:00", course: "CS101", room: "A101", faculty: "Prof. Johnson" },
    { day: "Monday", start: "14:00", end: "16:00", course: "MATH201", room: "B201", faculty: "Dr. Smith" },
    { day: "Tuesday", start: "9:00", end: "11:00", course: "ENG101", room: "C305", faculty: "Prof. Williams" },
    { day: "Tuesday", start: "13:00", end: "15:00", course: "CS201", room: "A101", faculty: "Prof. Johnson" },
    { day: "Wednesday", start: "10:00", end: "12:00", course: "PHYS101", room: "D102", faculty: "Dr. Brown" },
    { day: "Wednesday", start: "14:00", end: "16:00", course: "MATH301", room: "B201", faculty: "Dr. Smith" },
    { day: "Thursday", start: "11:00", end: "13:00", course: "BUS101", room: "A101", faculty: "Prof. Davis" },
    { day: "Friday", start: "9:00", end: "11:00", course: "ART101", room: "E201", faculty: "Prof. Wilson" },
    { day: "Friday", start: "15:00", end: "17:00", course: "CHEM201", room: "C305", faculty: "Dr. Martinez" },
  ]

  // Function to get event for a specific day and time
  const getEvent = (day: string, time: string) => {
    return events.find(
      (event) =>
        event.day === day &&
        Number.parseInt(event.start.split(":")[0]) <= Number.parseInt(time.split(":")[0]) &&
        Number.parseInt(event.end.split(":")[0]) > Number.parseInt(time.split(":")[0]),
    )
  }

  // Function to check if an event spans multiple hours
  const isMultiHourStart = (day: string, time: string) => {
    const event = getEvent(day, time)
    if (!event) return false

    return (
      Number.parseInt(event.start.split(":")[0]) === Number.parseInt(time.split(":")[0]) &&
      Number.parseInt(event.end.split(":")[0]) - Number.parseInt(event.start.split(":")[0]) > 1
    )
  }

  // Function to check if this is a continuation cell (not the start of an event)
  const isContinuation = (day: string, time: string) => {
    const event = getEvent(day, time)
    if (!event) return false

    return Number.parseInt(event.start.split(":")[0]) < Number.parseInt(time.split(":")[0])
  }

  // Function to get rowspan for multi-hour events
  const getRowSpan = (day: string, time: string) => {
    const event = getEvent(day, time)
    if (!event) return 1

    return Number.parseInt(event.end.split(":")[0]) - Number.parseInt(event.start.split(":")[0])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={currentWeek} onValueChange={setCurrentWeek}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Week 1 (May 6 - May 12)">Week 1 (May 6 - May 12)</SelectItem>
              <SelectItem value="Week 2 (May 13 - May 19)">Week 2 (May 13 - May 19)</SelectItem>
              <SelectItem value="Week 3 (May 20 - May 26)">Week 3 (May 20 - May 26)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-50 min-w-[80px]">Time</th>
                  {weekDays.map((day) => (
                    <th key={day} className="border p-2 bg-gray-50 min-w-[180px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className="border p-2 text-center font-medium text-sm">{time}</td>
                    {weekDays.map((day) => {
                      const event = getEvent(day, time)

                      // Skip cells that are continuations of multi-hour events
                      if (isContinuation(day, time)) {
                        return null
                      }

                      // For multi-hour events, use rowspan
                      if (isMultiHourStart(day, time)) {
                        const rowSpan = getRowSpan(day, time)
                        return (
                          <td
                            key={`${day}-${time}`}
                            className="border p-2 bg-blue-50 hover:bg-blue-100 transition-colors"
                            rowSpan={rowSpan}
                          >
                            <div className="font-medium">{event?.course}</div>
                            <div className="text-sm text-muted-foreground">{event?.room}</div>
                            <div className="text-sm text-muted-foreground">{event?.faculty}</div>
                          </td>
                        )
                      }

                      // Empty cell
                      return <td key={`${day}-${time}`} className="border p-2 hover:bg-gray-50 transition-colors"></td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
