

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckSquare,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  MessageSquare,
  FolderOpen,
  Users,
} from "lucide-react";

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Welcome back, Employee! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your work progress and upcoming tasks.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5</div>
            <p className="text-xs text-muted-foreground">Out of 40 hours</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 on track, 1 delayed</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
            <CardDescription>Your assigned tasks for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Task items */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Fix login authentication bug</p>
                  <p className="text-sm text-muted-foreground">Due in 2 hours</p>
                </div>
              </div>
              <Badge variant="destructive">High</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Review pull request #234</p>
                  <p className="text-sm text-muted-foreground">Due today</p>
                </div>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Update project documentation</p>
                  <p className="text-sm text-muted-foreground">Due tomorrow</p>
                </div>
              </div>
              <Badge variant="outline">Low</Badge>
            </div>

            <Button className="w-full" variant="outline">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="ghost">
              <Clock className="mr-2 h-4 w-4" />
              Clock In/Out
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Calendar className="mr-2 h-4 w-4" />
              Request Leave
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <MessageSquare className="mr-2 h-4 w-4" />
              Team Chat
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Target className="mr-2 h-4 w-4" />
              View Goals
            </Button>
          </CardContent>
        </Card>

        {/* Current Projects */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Current Projects
            </CardTitle>
            <CardDescription>Projects you're working on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Project items */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">E-commerce Platform</h4>
                <Badge>Frontend</Badge>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-sm text-muted-foreground">75% complete - Due Dec 15</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Mobile App Redesign</h4>
                <Badge variant="secondary">UI/UX</Badge>
              </div>
              <Progress value={45} className="h-2" />
              <p className="text-sm text-muted-foreground">45% complete - Due Jan 10</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">API Documentation</h4>
                <Badge variant="outline">Documentation</Badge>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-sm text-muted-foreground">90% complete - Due Dec 5</p>
            </div>
          </CardContent>
        </Card>

        {/* Team Updates */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Updates
            </CardTitle>
            <CardDescription>Recent team activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">Vijay B</p>
                <p className="text-xs text-muted-foreground">
                  Completed the user authentication module
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">Hari K</p>
                <p className="text-xs text-muted-foreground">
                  Deployed the staging environment
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">Sandeep K</p>
                <p className="text-xs text-muted-foreground">
                  Updated project requirements
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-medium">Dec</p>
                  <p className="text-lg font-bold">5</p>
                </div>
                <div>
                  <p className="font-medium">Team Standup</p>
                  <p className="text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-medium">Dec</p>
                  <p className="text-lg font-bold">6</p>
                </div>
                <div>
                  <p className="font-medium">Sprint Planning</p>
                  <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-medium">Dec</p>
                  <p className="text-lg font-bold">8</p>
                </div>
                <div>
                  <p className="font-medium">Performance Review</p>
                  <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
