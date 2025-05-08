"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import TimetableCalendar from "@/components/timetable-calendar"
import ConflictResolution from "@/components/conflict-resolution"
import { AlertTriangle, Download, Mail, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewTimetablePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("calendar")
  const [showExportDialog, setShowExportDialog] = useState(false)

  const handleSave = () => {
    // Simulate saving
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Fall Semester 2025</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge>Draft</Badge>
                <span className="text-sm text-muted-foreground">Generated on May 6, 2025</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export Timetable</DialogTitle>
                    <DialogDescription>Choose a format to export the timetable</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="format" className="text-right">
                        Format
                      </label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="PDF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="ical">iCalendar</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="scope" className="text-right">
                        Scope
                      </label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="eng">Engineering</SelectItem>
                          <SelectItem value="bus">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowExportDialog(false)}>Export</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="bg-amber-50 border-b">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle>Conflicts Detected</CardTitle>
              </div>
              <CardDescription>The generated timetable has 7 conflicts that need to be resolved</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md">
                  <div>
                    <p className="font-medium">Faculty Double-Booking</p>
                    <p className="text-sm text-muted-foreground">
                      Prof. Johnson is scheduled for two classes at the same time (Mon 10:00 AM)
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("conflicts")}>
                    Resolve
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md">
                  <div>
                    <p className="font-medium">Room Over-Allocation</p>
                    <p className="text-sm text-muted-foreground">
                      Room B201 is assigned to two different classes (Wed 2:00 PM)
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("conflicts")}>
                    Resolve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="conflicts">Conflicts (7)</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="space-y-4">
              <TimetableCalendar />
            </TabsContent>
            <TabsContent value="conflicts" className="space-y-4">
              <ConflictResolution />
            </TabsContent>
            <TabsContent value="stats" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">Room utilization chart</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Faculty Load</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">Faculty load chart</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Time Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">Time distribution chart</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
