import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Code, Layers } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-secondary"></div>
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-6 text-sm bg-primary/10 text-primary border-primary/20">
          <Zap className="w-3 h-3 mr-2" />
          AI-Powered Developer Tools
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
          Your AI Web Dev
          <br />
          <span className="text-primary">Assistant</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Streamline your development workflow with an intelligent chatbot that integrates 
          all your favorite AI tools. Code, debug, and deploy faster than ever.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Chatting
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Code className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>
        
        {/* Feature preview cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-all duration-300">
            <MessageSquare className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Smart Conversations</h3>
            <p className="text-muted-foreground text-sm">Natural language understanding for complex dev tasks</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-all duration-300">
            <Layers className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Tool Integration</h3>
            <p className="text-muted-foreground text-sm">Seamless access to all your AI development tools</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-all duration-300">
            <Code className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Guided Workflows</h3>
            <p className="text-muted-foreground text-sm">Step-by-step assistance for any development task</p>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;