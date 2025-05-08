"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function GenerateTimetablePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 90),
  })

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate timetable generation
    setTimeout(() => {
      setIsGenerating(false)
      router.push("/dashboard/timetables/new")
    }, 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Generate Timetable</h1>
            <p className="text-muted-foreground">Configure parameters and generate a new timetable</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Timetable Parameters</CardTitle>
              <CardDescription>
                Set the constraints and preferences for the timetable generation algorithm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="constraints">Constraints</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Timetable Name
                      </Label>
                      <Input id="name" placeholder="Fall Semester 2025" className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Date Range</Label>
                      <div className="col-span-3">
                        <DatePickerWithRange date={date} setDate={setDate} />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="eng">Engineering</SelectItem>
                          <SelectItem value="bus">Business</SelectItem>
                          <SelectItem value="arts">Arts & Humanities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="algorithm" className="text-right">
                        Algorithm
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Genetic Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                          <SelectItem value="constraint">Constraint Satisfaction</SelectItem>
                          <SelectItem value="simulated">Simulated Annealing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="constraints" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Working Hours</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-time" className="text-sm">
                            Start Time
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="8:00 AM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8">8:00 AM</SelectItem>
                              <SelectItem value="9">9:00 AM</SelectItem>
                              <SelectItem value="10">10:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time" className="text-sm">
                            End Time
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="6:00 PM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="16">4:00 PM</SelectItem>
                              <SelectItem value="17">5:00 PM</SelectItem>
                              <SelectItem value="18">6:00 PM</SelectItem>
                              <SelectItem value="19">7:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Lecture Duration</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="default-duration" className="text-sm">
                            Default Duration
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="1 hour" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 hour</SelectItem>
                              <SelectItem value="1.5">1.5 hours</SelectItem>
                              <SelectItem value="2">2 hours</SelectItem>
                              <SelectItem value="3">3 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buffer-time" className="text-sm">
                            Buffer Time
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="15 minutes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No buffer</SelectItem>
                              <SelectItem value="10">10 minutes</SelectItem>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Conflict Prevention</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="faculty-conflicts" defaultChecked />
                          <label
                            htmlFor="faculty-conflicts"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Prevent faculty double-booking
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="room-conflicts" defaultChecked />
                          <label
                            htmlFor="room-conflicts"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Prevent room over-allocation
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="student-conflicts" defaultChecked />
                          <label
                            htmlFor="student-conflicts"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Prevent student group conflicts
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Algorithm Iterations</Label>
                        <span className="text-sm text-muted-foreground">5000</span>
                      </div>
                      <Slider defaultValue={[5000]} max={10000} step={100} />
                      <p className="text-xs text-muted-foreground">
                        Higher values may produce better results but take longer to generate
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Optimization Goals</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="faculty-preferences" defaultChecked />
                          <label
                            htmlFor="faculty-preferences"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Prioritize faculty preferences
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="room-utilization" defaultChecked />
                          <label
                            htmlFor="room-utilization"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Maximize room utilization
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="student-travel" defaultChecked />
                          <label
                            htmlFor="student-travel"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Minimize student travel between buildings
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Special Constraints</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lunch-break" />
                          <label
                            htmlFor="lunch-break"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Enforce lunch break (12-1 PM)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="weekend-free" />
                          <label
                            htmlFor="weekend-free"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Keep weekends free
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Timetable"
                )}
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
