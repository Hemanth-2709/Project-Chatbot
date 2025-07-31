import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Plus,
  Calendar,
  Users,
  Target,
  TrendingUp
} from "lucide-react";

const ProjectManagement = () => {
  const projects = [
    {
      name: "E-commerce Platform",
      progress: 75,
      status: "In Progress",
      dueDate: "Dec 15, 2024",
      tasks: 12,
      completedTasks: 9,
      priority: "High"
    },
    {
      name: "Mobile App Backend",
      progress: 45,
      status: "In Progress",
      dueDate: "Jan 20, 2025",
      tasks: 8,
      completedTasks: 4,
      priority: "Medium"
    },
    {
      name: "Portfolio Website",
      progress: 100,
      status: "Completed",
      dueDate: "Nov 30, 2024",
      tasks: 6,
      completedTasks: 6,
      priority: "Low"
    }
  ];

  const recentTasks = [
    {
      title: "Implement user authentication",
      status: "completed",
      time: "2 hours ago"
    },
    {
      title: "Design database schema",
      status: "in-progress",
      time: "4 hours ago"
    },
    {
      title: "Set up CI/CD pipeline",
      status: "pending",
      time: "1 day ago"
    }
  ];

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Target className="w-3 h-3 mr-2" />
            Project Management
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Stay <span className="text-primary">Organized</span> & Productive
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your projects, manage tasks, and get AI-powered insights 
            to boost your development productivity
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Projects Overview */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Active Projects</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
              
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge 
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className={project.status === "Completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : ""}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.dueDate}
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {project.completedTasks}/{project.tasks} tasks
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            project.priority === "High" ? "border-red-500/50 text-red-400" :
                            project.priority === "Medium" ? "border-yellow-500/50 text-yellow-400" :
                            "border-green-500/50 text-green-400"
                          }`}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Tasks */}
            <Card className="p-6 bg-card/50 backdrop-blur border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
              <div className="space-y-3">
                {recentTasks.map((task, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      task.status === "completed" ? "bg-green-400" :
                      task.status === "in-progress" ? "bg-yellow-400" :
                      "bg-muted-foreground"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                    {task.status === "completed" && (
                      <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                    )}
                    {task.status === "in-progress" && (
                      <Clock className="w-4 h-4 text-yellow-400 mt-1" />
                    )}
                    {task.status === "pending" && (
                      <AlertCircle className="w-4 h-4 text-muted-foreground mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-card/50 backdrop-blur border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Productivity</span>
                  </div>
                  <span className="text-sm font-medium text-green-400">+15%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="text-sm font-medium">24 tasks</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Active Projects</span>
                  </div>
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectManagement;