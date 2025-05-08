import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ResourceUtilization() {
  const rooms = [
    { id: 1, name: "A101", type: "Lecture Hall", capacity: 120, utilization: 85 },
    { id: 2, name: "B201", type: "Classroom", capacity: 60, utilization: 92 },
    { id: 3, name: "C305", type: "Laboratory", capacity: 40, utilization: 75 },
    { id: 4, name: "D102", type: "Seminar Room", capacity: 30, utilization: 45 },
    { id: 5, name: "E201", type: "Lecture Hall", capacity: 150, utilization: 62 },
  ]

  const faculty = [
    { id: 1, name: "Prof. Johnson", department: "Computer Science", courses: 4, hours: 12, utilization: 80 },
    { id: 2, name: "Dr. Smith", department: "Engineering", courses: 3, hours: 9, utilization: 60 },
    { id: 3, name: "Prof. Williams", department: "Business", courses: 5, hours: 15, utilization: 100 },
    { id: 4, name: "Dr. Brown", department: "Arts", courses: 2, hours: 6, utilization: 40 },
    { id: 5, name: "Prof. Davis", department: "Sciences", courses: 4, hours: 12, utilization: 80 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Room Utilization</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{room.name}</CardTitle>
                  <Badge variant="outline">{room.type}</Badge>
                </div>
                <CardDescription>Capacity: {room.capacity} students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Utilization</span>
                    <span className="text-sm font-medium">{room.utilization}%</span>
                  </div>
                  <Progress value={room.utilization} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Faculty Workload</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faculty.map((person) => (
            <Card key={person.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{person.name}</CardTitle>
                  <Badge variant="outline">{person.department}</Badge>
                </div>
                <CardDescription>
                  Courses: {person.courses} ({person.hours} hours/week)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Workload</span>
                    <span className="text-sm font-medium">{person.utilization}%</span>
                  </div>
                  <Progress value={person.utilization} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
