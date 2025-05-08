import Link from "next/link"
import { CalendarDays, Users, Building2, BookOpen, BarChart3, Settings } from "lucide-react"

export default function DashboardNav() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block lg:w-60">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 bg-gray-200"
            >
              <CalendarDays className="h-4 w-4" />
              Timetables
            </Link>
            <Link
              href="/dashboard/faculty"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <Users className="h-4 w-4" />
              Faculty
            </Link>
            <Link
              href="/dashboard/rooms"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <Building2 className="h-4 w-4" />
              Rooms
            </Link>
            <Link
              href="/dashboard/courses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </Link>
            <Link
              href="/dashboard/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
