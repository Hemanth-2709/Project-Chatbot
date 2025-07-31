import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Bug, 
  Palette, 
  Database, 
  Rocket, 
  GitBranch,
  Zap,
  Settings,
  ArrowRight
} from "lucide-react";

const ToolsShowcase = () => {
  const tools = [
    {
      icon: Code,
      name: "Code Generator",
      description: "Generate clean, optimized code in any framework",
      features: ["React/Vue/Angular", "TypeScript/JavaScript", "API Integration"],
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Bug,
      name: "Smart Debugger",
      description: "AI-powered debugging and error resolution",
      features: ["Error Analysis", "Performance Issues", "Best Practices"],
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      icon: Palette,
      name: "UI Designer",
      description: "Create beautiful interfaces with AI assistance",
      features: ["Component Library", "CSS Generation", "Responsive Design"],
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Database,
      name: "Database Helper",
      description: "Database design and query optimization",
      features: ["Schema Design", "Query Optimization", "Migration Scripts"],
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: Rocket,
      name: "Deploy Assistant",
      description: "Streamlined deployment and DevOps automation",
      features: ["CI/CD Pipeline", "Cloud Deployment", "Monitoring Setup"],
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      icon: GitBranch,
      name: "Git Helper",
      description: "Version control and collaboration made easy",
      features: ["Commit Messages", "Branch Strategy", "Code Reviews"],
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    }
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-2" />
            Integrated Tools
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            All Your <span className="text-primary">Dev Tools</span> in One Place
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access a comprehensive suite of AI-powered development tools through 
            a single, intuitive chat interface
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={index} 
                className={`p-6 hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur border ${tool.borderColor} hover:shadow-elevated group`}
              >
                <div className={`w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${tool.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                      <Settings className="w-3 h-3 mr-2 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:bg-primary/10">
                  Try Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            <Code className="w-5 h-5 mr-2" />
            Explore All Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;