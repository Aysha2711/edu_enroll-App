import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card.jsx";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";
import "../../styles/AdminReports.css";

const AdminReports = () => {
  const enrollmentData = [
    { month: "Jan", enrollments: 45 },
    { month: "Feb", enrollments: 52 },
    { month: "Mar", enrollments: 61 },
    { month: "Apr", enrollments: 58 },
    { month: "May", enrollments: 70 },
    { month: "Jun", enrollments: 78 },
  ];

  const topCourses = [
    { name: "Web Development Bootcamp", completionRate: 85, enrolled: 342 },
    { name: "Data Science & ML", completionRate: 78, enrolled: 287 },
    { name: "React & TypeScript", completionRate: 82, enrolled: 234 },
    { name: "Python for Beginners", completionRate: 91, enrolled: 198 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">Track performance and growth metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$45,670</div>
            <p className="text-xs text-success mt-1">+25% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">987</div>
            <p className="text-xs text-success mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
            <Award className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">456</div>
            <p className="text-xs text-success mt-1">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84%</div>
            <p className="text-xs text-success mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrollmentData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{data.month}</span>
                    <span className="text-sm text-muted-foreground">{data.enrollments} students</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${(data.enrollments / 100) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topCourses.map((course, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{course.name}</p>
                      <p className="text-xs text-muted-foreground">{course.enrolled} enrolled</p>
                    </div>
                    <span className="text-sm font-bold">{course.completionRate}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-success h-full rounded-full transition-all"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Monday", active: 234 },
                { day: "Tuesday", active: 267 },
                { day: "Wednesday", active: 298 },
                { day: "Thursday", active: 245 },
                { day: "Friday", active: 221 },
                { day: "Saturday", active: 189 },
                { day: "Sunday", active: 156 },
              ].map((day, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{day.day}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${(day.active / 300) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">{day.active}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Issued Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { student: "John Doe", course: "Web Development", date: "2024-01-20" },
                { student: "Jane Smith", course: "Data Science", date: "2024-01-19" },
                { student: "Mike Johnson", course: "React Advanced", date: "2024-01-18" },
                { student: "Sarah Wilson", course: "Python Basics", date: "2024-01-17" },
                { student: "Tom Brown", course: "Mobile Dev", date: "2024-01-16" },
              ].map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{cert.student}</p>
                    <p className="text-xs text-muted-foreground">{cert.course}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{cert.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
