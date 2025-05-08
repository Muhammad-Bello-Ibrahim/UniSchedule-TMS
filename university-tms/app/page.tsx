import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CalendarDays } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CalendarDays className="h-6 w-6" />
            <span className="text-xl">UniTMS</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container px-4 py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                University Timetable Management System
              </h1>
              <p className="text-muted-foreground md:text-xl">
                A centralized platform for generating, managing, and distributing conflict-free schedules for all
                university faculties.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Timetable Management System"
                className="aspect-square rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Automated Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Generate conflict-free timetables using constraint-based optimization algorithms that consider faculty
                  availability, room capacities, and student groups.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conflict Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Real-time validation for clashes including faculty double-booking, room over-allocation, and student
                  group conflicts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resource Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Efficiently assign rooms based on capacity, equipment requirements, and location to optimize resource
                  utilization.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} University Timetable Management System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
