"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Check } from "lucide-react"

export default function ConflictResolution() {
  const [currentConflict, setCurrentConflict] = useState(1)
  const [resolvedConflicts, setResolvedConflicts] = useState<number[]>([])

  const conflicts = [
    {
      id: 1,
      type: "Faculty Double-Booking",
      description: "Prof. Johnson is scheduled for two classes at the same time",
      details: "CS101 (Mon 10:00 AM) and ENG201 (Mon 10:00 AM)",
      options: [
        { id: 1, description: "Move CS101 to Mon 1:00 PM in Room A101" },
        { id: 2, description: "Move ENG201 to Tue 10:00 AM in Room B201" },
        { id: 3, description: "Assign ENG201 to Dr. Smith instead" },
      ],
    },
    {
      id: 2,
      type: "Room Over-Allocation",
      description: "Room B201 is assigned to two different classes",
      details: "MATH301 (Wed 2:00 PM) and PHYS101 (Wed 2:00 PM)",
      options: [
        { id: 1, description: "Move MATH301 to Room C305 at the same time" },
        { id: 2, description: "Move PHYS101 to Wed 4:00 PM in the same room" },
        { id: 3, description: "Move PHYS101 to Room E201 at the same time" },
      ],
    },
    {
      id: 3,
      type: "Student Group Conflict",
      description: "Computer Science Year 2 has two mandatory classes at the same time",
      details: "CS201 (Tue 1:00 PM) and CS205 (Tue 1:00 PM)",
      options: [
        { id: 1, description: "Move CS201 to Thu 1:00 PM in the same room" },
        { id: 2, description: "Move CS205 to Wed 3:00 PM in Room A101" },
        { id: 3, description: "Make CS205 optional for this semester" },
      ],
    },
  ]

  const handleResolve = (conflictId: number) => {
    setResolvedConflicts([...resolvedConflicts, conflictId])

    // Move to next conflict if available
    if (currentConflict < conflicts.length) {
      setCurrentConflict(currentConflict + 1)
    }
  }

  const isResolved = (conflictId: number) => {
    return resolvedConflicts.includes(conflictId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Conflict Resolution</h3>
        <div className="text-sm text-muted-foreground">
          Resolved: {resolvedConflicts.length} / {conflicts.length}
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Conflict</TabsTrigger>
          <TabsTrigger value="all">All Conflicts</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {conflicts.map(
            (conflict) =>
              conflict.id === currentConflict && (
                <Card key={conflict.id} className={isResolved(conflict.id) ? "border-green-300" : "border-amber-300"}>
                  <CardHeader className={`${isResolved(conflict.id) ? "bg-green-50" : "bg-amber-50"}`}>
                    <div className="flex items-center gap-2">
                      {isResolved(conflict.id) ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                      <CardTitle>{conflict.type}</CardTitle>
                    </div>
                    <CardDescription>{conflict.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm mb-4">{conflict.details}</p>

                    {!isResolved(conflict.id) && (
                      <div className="space-y-4">
                        <h4 className="font-medium">Suggested Resolutions:</h4>
                        <div className="space-y-2">
                          {conflict.options.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                            >
                              <span>{option.description}</span>
                              <Button size="sm" onClick={() => handleResolve(conflict.id)}>
                                Apply
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2">
                          <h4 className="font-medium mb-2">Custom Resolution:</h4>
                          <div className="flex gap-2">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select action" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="move">Move class</SelectItem>
                                <SelectItem value="reassign">Reassign faculty</SelectItem>
                                <SelectItem value="change">Change room</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button onClick={() => handleResolve(conflict.id)}>Apply Custom</Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {isResolved(conflict.id) && (
                      <div className="p-4 bg-green-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Conflict Resolved</span>
                        </div>
                        <p className="text-sm mt-1">This conflict has been successfully resolved.</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled={currentConflict <= 1}>
                      Previous Conflict
                    </Button>
                    <Button
                      disabled={currentConflict >= conflicts.length}
                      onClick={() => setCurrentConflict(currentConflict + 1)}
                    >
                      Next Conflict
                    </Button>
                  </CardFooter>
                </Card>
              ),
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {conflicts.map((conflict) => (
            <Card key={conflict.id} className={isResolved(conflict.id) ? "border-green-300" : ""}>
              <CardHeader className={`pb-2 ${isResolved(conflict.id) ? "bg-green-50" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isResolved(conflict.id) ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                    <CardTitle className="text-base">{conflict.type}</CardTitle>
                  </div>
                  {!isResolved(conflict.id) && (
                    <Button size="sm" variant="outline" onClick={() => setCurrentConflict(conflict.id)}>
                      Resolve
                    </Button>
                  )}
                </div>
                <CardDescription>{conflict.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{conflict.details}</p>
                {isResolved(conflict.id) && <div className="mt-2 text-sm text-green-600 font-medium">Resolved</div>}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
