import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CheckSquare,
  Clock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function Tasks() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tasks</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CheckSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">14</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* High Priority Task */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Fix Authentication Bug</CardTitle>
                  <CardDescription>Critical bug affecting user login functionality</CardDescription>
                </div>
                <Badge variant="destructive">High Priority</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: Today, 5:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Assigned by: Vijay B</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={30} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">30% Complete</span>
                  <Button size="sm">Update Progress</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medium Priority Task */}
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Review Code PR #234</CardTitle>
                  <CardDescription>Review and test the new feature implementation</CardDescription>
                </div>
                <Badge variant="secondary">Medium Priority</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: Tomorrow, 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Assigned by: Hari K</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={60} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">60% Complete</span>
                  <Button size="sm">Update Progress</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Low Priority Task */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Update Documentation</CardTitle>
                  <CardDescription>Update API documentation with latest changes</CardDescription>
                </div>
                <Badge variant="outline">Low Priority</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: Next Week</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Self-assigned</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={10} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">10% Complete</span>
                  <Button size="sm">Update Progress</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Task */}
          <Card className="border-l-4 border-l-blue-500 bg-muted/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Database Migration</CardTitle>
                  <CardDescription>Migrate user data to new database schema</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Completed: Yesterday</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Assigned by: Sandeep K</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={100} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">100% Complete</span>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">No Pending Tasks</h3>
                <p className="text-muted-foreground">All your tasks are either in progress or completed.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inprogress">
          <div className="space-y-4">
            {/* Show only in-progress tasks */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Fix Authentication Bug</CardTitle>
                    <CardDescription>Critical bug affecting user login functionality</CardDescription>
                  </div>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: Today, 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={30} className="h-2" />
                  <span className="text-sm text-muted-foreground">30% Complete</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {/* Show only completed tasks */}
            <Card className="border-l-4 border-l-blue-500 bg-muted/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Database Migration</CardTitle>
                    <CardDescription>Migrate user data to new database schema</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Completed: Yesterday</span>
                    </div>
                  </div>
                  <Progress value={100} className="h-2" />
                  <span className="text-sm text-muted-foreground">100% Complete</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}