import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export default function TimetableOverview() {
  const timetables = [
    {
      id: "new",
      name: "Fall Semester 2025",
      status: "draft",
      date: "Generated on May 6, 2025",
      conflicts: 7,
      departments: "All Departments",
    },
    {
      id: "spring2025",
      name: "Spring Semester 2025",
      status: "published",
      date: "Published on Dec 15, 2024",
      conflicts: 0,
      departments: "All Departments",
    },
    {
      id: "fall2024",
      name: "Fall Semester 2024",
      status: "archived",
      date: "Archived on Jan 10, 2024",
      conflicts: 0,
      departments: "All Departments",
    },
  ]

  return (
    <div className="space-y-4">
      {timetables.map((timetable) => (
        <Card key={timetable.id}>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle>{timetable.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    timetable.status === "published"
                      ? "default"
                      : timetable.status === "draft"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {timetable.status.charAt(0).toUpperCase() + timetable.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">{timetable.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {timetable.status === "draft" && (
                <Link href={`/dashboard/timetables/${timetable.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
              )}
              <Link href={`/dashboard/timetables/${timetable.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </Link>
              {timetable.status === "draft" && (
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Departments</p>
                <p className="text-sm text-muted-foreground">{timetable.departments}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Conflicts</p>
                <p className="text-sm text-muted-foreground">
                  {timetable.conflicts > 0 ? (
                    <span className="text-amber-500 font-medium">{timetable.conflicts} conflicts need resolution</span>
                  ) : (
                    "No conflicts"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
