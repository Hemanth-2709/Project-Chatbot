import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Code, Bug, Rocket, FileCode, BarChart3, Globe } from "lucide-react";
import AIService, { AIResponse, AIConfig } from "@/services/aiService";
import AIConfigPanel from "./AIConfigPanel";
import AIAnalytics from "./AIAnalytics";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
  time: string;
  tools?: string[];
  suggestions?: string[];
  code?: string;
  language?: string;
  confidence?: number;
  model?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hello! I'm your AI-powered development assistant. I can help you with any programming language - Python, JavaScript, TypeScript, React, Java, C#, PHP, Go, Rust, and more! Ask me to generate code, debug issues, explain concepts, or help with any development task!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "Generate a Python web scraper",
        "Create a React component",
        "Build a JavaScript API",
        "Debug TypeScript code"
      ],
      model: "ai-assistant"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    openaiApiKey: "",
    anthropicApiKey: "",
    localModelUrl: "",
    enableLocalProcessing: true,
    enableCodeGeneration: true,
    enableRealTimeAnalysis: true
  });

  // Initialize AI Service
  const [aiService] = useState(() => new AIService(aiConfig));

  // Update AI service when config changes
  useEffect(() => {
    aiService.updateConfig(aiConfig);
  }, [aiConfig, aiService]);

  // Language options for quick selection
  const languages = [
    { value: "all", label: "All Languages", icon: Globe },
    { value: "python", label: "Python", icon: Code },
    { value: "javascript", label: "JavaScript", icon: Code },
    { value: "typescript", label: "TypeScript", icon: Code },
    { value: "react", label: "React", icon: Code },
    { value: "java", label: "Java", icon: Code },
    { value: "csharp", label: "C#", icon: Code },
    { value: "php", label: "PHP", icon: Code },
    { value: "go", label: "Go", icon: Code },
    { value: "rust", label: "Rust", icon: Code }
  ];

  // Query categories for quick access
  const queryCategories = [
    {
      category: "Code Generation",
      icon: Code,
      queries: [
        "Generate a Python web scraper",
        "Create a React component",
        "Build a JavaScript API",
        "Write a TypeScript function"
      ]
    },
    {
      category: "Debugging",
      icon: Bug,
      queries: [
        "Debug this React component",
        "Fix this Python error",
        "Troubleshoot JavaScript issue",
        "Solve TypeScript compilation error"
      ]
    },
    {
      category: "Architecture",
      icon: Rocket,
      queries: [
        "Design system architecture",
        "Plan database schema",
        "Choose design patterns",
        "Structure API endpoints"
      ]
    },
    {
      category: "Testing",
      icon: Code,
      queries: [
        "Write unit tests",
        "Create integration tests",
        "Set up testing framework",
        "Generate test cases"
      ]
    },
    {
      category: "Deployment",
      icon: Rocket,
      queries: [
        "Deploy to production",
        "Set up CI/CD pipeline",
        "Configure hosting",
        "Optimize for performance"
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Process query through AI service
      const aiResponse: AIResponse = await aiService.processQuery(inputValue);
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: aiResponse.content,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        code: aiResponse.code,
        language: aiResponse.language,
        suggestions: aiResponse.suggestions,
        tools: aiResponse.tools,
        confidence: aiResponse.confidence,
        model: aiResponse.model
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('AI processing error:', error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: "I'm having trouble processing your request. Please try again or check your AI configuration.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: "error-handler"
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleConfigUpdate = (newConfig: AIConfig) => {
    setAiConfig(newConfig);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const getFilteredSuggestions = () => {
    if (selectedLanguage === "all") {
      return [
        "Generate a Python web scraper",
        "Create a React component",
        "Build a JavaScript API",
        "Debug TypeScript code"
      ];
    }
    
    const languageSpecificQueries = {
      python: [
        "Generate a Python web scraper",
        "Create a FastAPI application",
        "Write a data analysis script",
        "Build a machine learning model"
      ],
      javascript: [
        "Create a React component",
        "Build an Express.js API",
        "Write a Node.js function",
        "Debug JavaScript code"
      ],
      typescript: [
        "Create a TypeScript interface",
        "Build a typed API",
        "Write a generic function",
        "Debug TypeScript errors"
      ],
      react: [
        "Create a React component",
        "Build a custom hook",
        "Set up React context",
        "Debug React rendering"
      ],
      java: [
        "Create a Spring Boot API",
        "Write a Java class",
        "Build a REST service",
        "Debug Java exceptions"
      ],
      csharp: [
        "Create an ASP.NET API",
        "Write a C# class",
        "Build a .NET service",
        "Debug C# code"
      ]
    };
    
    return languageSpecificQueries[selectedLanguage] || languageSpecificQueries.python;
  };

  return (
    <div className="relative">
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Chat with Your <span className="text-primary">AI Assistant</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience natural conversations that understand your development context across all programming languages
            </p>
          </div>

          {/* Language Selector */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {languages.map((lang) => {
                const Icon = lang.icon;
                return (
                  <Button
                    key={lang.value}
                    variant={selectedLanguage === lang.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageSelect(lang.value)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{lang.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Query Categories */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {queryCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.category} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{category.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.queries.map((query, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs h-8"
                          onClick={() => handleSuggestionClick(query)}
                        >
                          {query}
                        </Button>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border border-border/50 overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">DevAssist AI</h3>
                      <p className="text-sm text-muted-foreground">
                        {isLoading ? "Thinking..." : `Online • Ready to help with ${selectedLanguage === "all" ? "all languages" : selectedLanguage}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                      {isLoading ? "Processing" : "Active"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAnalytics(!showAnalytics)}
                      className="flex items-center space-x-1"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Analytics</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-gradient-primary text-white'
                      }`}>
                        {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-lg p-4 ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted border border-border/50'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-2 ${
                          msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {msg.time}
                          {msg.model && (
                            <span className="ml-2 text-xs opacity-70">• {msg.model}</span>
                          )}
                          {msg.confidence && (
                            <span className="ml-2 text-xs opacity-70">• {Math.round(msg.confidence * 100)}% confidence</span>
                          )}
                        </p>
                        
                        {msg.code && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                <FileCode className="w-3 h-3 inline mr-1" />
                                {msg.language?.toUpperCase()} Code
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs h-6"
                                onClick={() => navigator.clipboard.writeText(msg.code || '')}
                              >
                                Copy
                              </Button>
                            </div>
                            <pre className="bg-background/50 rounded-md p-3 text-xs overflow-x-auto border border-border/50">
                              <code>{msg.code}</code>
                            </pre>
                          </div>
                        )}
                        
                        {msg.tools && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.tools.map((tool, toolIndex) => (
                              <Badge key={toolIndex} variant="secondary" className="text-xs">
                                <Code className="w-3 h-3 mr-1" />
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {msg.suggestions && (
                          <div className="mt-3 space-y-2">
                            {msg.suggestions.map((suggestion, suggestionIndex) => (
                              <Button 
                                key={suggestionIndex} 
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-8 w-full justify-start"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                <Bug className="w-3 h-3 mr-2" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="rounded-lg p-4 bg-muted border border-border/50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border/50 bg-muted/20">
                <div className="flex items-center space-x-3">
                  <Input 
                    placeholder={`Ask me to generate ${selectedLanguage === "all" ? "any" : selectedLanguage} code, debug issues, or help with development...`}
                    className="flex-1 bg-background/50"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <Button 
                    size="icon" 
                    variant="default"
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Generate Code
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Bug className="w-3 h-3 mr-1" />
                      Debug Issue
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Rocket className="w-3 h-3 mr-1" />
                      Deploy Help
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Press Enter to send
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Analytics Overlay */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur z-40 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">AI Analytics Dashboard</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnalytics(false)}
                >
                  ×
                </Button>
              </div>
              <AIAnalytics aiConfig={aiConfig} />
            </div>
          </div>
        </div>
      )}

      {/* AI Configuration Panel */}
      <AIConfigPanel 
        onConfigUpdate={handleConfigUpdate}
        currentConfig={aiConfig}
      />
    </div>
  );
};

export default ChatInterface;