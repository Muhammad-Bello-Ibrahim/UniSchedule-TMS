import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check } from "lucide-react"

export default function ConflictsList() {
  const conflicts = [
    {
      id: 1,
      type: "Faculty Double-Booking",
      description: "Prof. Johnson is scheduled for two classes at the same time",
      details: "CS101 (Mon 10:00 AM) and ENG201 (Mon 10:00 AM)",
      severity: "high",
    },
    {
      id: 2,
      type: "Room Over-Allocation",
      description: "Room B201 is assigned to two different classes",
      details: "MATH301 (Wed 2:00 PM) and PHYS101 (Wed 2:00 PM)",
      severity: "high",
    },
    {
      id: 3,
      type: "Student Group Conflict",
      description: "Computer Science Year 2 has two mandatory classes at the same time",
      details: "CS201 (Tue 1:00 PM) and CS205 (Tue 1:00 PM)",
      severity: "medium",
    },
    {
      id: 4,
      type: "Room Capacity Exceeded",
      description: "Room A101 (capacity: 40) assigned to class with 52 students",
      details: "BUS101 (Thu 11:00 AM)",
      severity: "medium",
    },
    {
      id: 5,
      type: "Equipment Mismatch",
      description: "Lab class assigned to room without required equipment",
      details: "CHEM201 Lab (Fri 3:00 PM) in Room C305 (no lab equipment)",
      severity: "medium",
    },
    {
      id: 6,
      type: "Faculty Preference Violation",
      description: "Class scheduled during faculty's unavailable hours",
      details: "Prof. Smith - ART101 (Fri 8:00 AM) - Unavailable before 10:00 AM",
      severity: "low",
    },
    {
      id: 7,
      type: "Back-to-Back Location",
      description: "Classes scheduled back-to-back in distant buildings",
      details: "HIST101 (East Campus) followed by PSYCH201 (West Campus) with no travel time",
      severity: "low",
    },
  ]

  return (
    <div className="space-y-4">
      {conflicts.map((conflict) => (
        <Card key={conflict.id} className={conflict.severity === "high" ? "border-amber-300" : ""}>
          <CardHeader className={`pb-2 ${conflict.severity === "high" ? "bg-amber-50" : ""}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`h-5 w-5 ${
                    conflict.severity === "high"
                      ? "text-amber-500"
                      : conflict.severity === "medium"
                        ? "text-orange-500"
                        : "text-yellow-500"
                  }`}
                />
                <CardTitle className="text-base">{conflict.type}</CardTitle>
                <Badge
                  variant={
                    conflict.severity === "high"
                      ? "destructive"
                      : conflict.severity === "medium"
                        ? "default"
                        : "outline"
                  }
                >
                  {conflict.severity.charAt(0).toUpperCase() + conflict.severity.slice(1)}
                </Badge>
              </div>
              <Button size="sm" variant="outline" className="gap-1">
                <Check className="h-4 w-4" />
                Resolve
              </Button>
            </div>
            <CardDescription>{conflict.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{conflict.details}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
