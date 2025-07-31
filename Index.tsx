import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import ToolsShowcase from "@/components/ToolsShowcase";
import ProjectManagement from "@/components/ProjectManagement";
import ChatbotUseCases from "@/components/ChatbotUseCases";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ChatInterface />
      <ChatbotUseCases />
      <ToolsShowcase />
      <ProjectManagement />
    </div>
  );
};

export default Index;
