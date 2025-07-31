import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  ShoppingCart, 
  Heart, 
  GraduationCap, 
  Plane, 
  Users, 
  CreditCard, 
  Music, 
  Building, 
  Languages,
  Play,
  Send,
  Copy,
  Check
} from "lucide-react";

interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  examples: Example[];
  benefits: string[];
}

interface Example {
  prompt: string;
  response: string;
  category: string;
}

const ChatbotUseCases = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [copiedExample, setCopiedExample] = useState<string | null>(null);
  const [demoInput, setDemoInput] = useState<string>("");
  const [demoResponse, setDemoResponse] = useState<string>("");
  const [isDemoLoading, setIsDemoLoading] = useState<boolean>(false);

  console.log("ChatbotUseCases component is rendering");

  const useCases: UseCase[] = [
    {
      id: "customer-support",
      title: "Customer Support",
      description: "Order tracking, returns, instant help",
      icon: MessageSquare,
      color: "bg-blue-500",
      examples: [
        {
          prompt: "I need help tracking my order #12345",
          response: "I can help you track your order! Let me check the status for order #12345. Your package is currently in transit and expected to arrive on Friday. Would you like me to send you tracking updates?",
          category: "Order Tracking"
        },
        {
          prompt: "How do I return an item?",
          response: "To return an item, you can: 1) Use our online return portal, 2) Visit any store location, or 3) Contact our support team. What's the reason for your return?",
          category: "Returns"
        }
      ],
      benefits: [
        "24/7 availability",
        "Instant responses",
        "Reduced wait times",
        "Lower support costs"
      ]
    },
    {
      id: "ecommerce",
      title: "E-Commerce Assistance",
      description: "Product recommendations, comparisons",
      icon: ShoppingCart,
      color: "bg-green-500",
      examples: [
        {
          prompt: "Can you suggest a gift under $50 for a 10-year-old?",
          response: "Great question! For a 10-year-old, I'd recommend: 1) Educational STEM toys ($30-45), 2) Art supplies set ($25-40), 3) Board games ($20-35), or 4) Books series ($15-30). What are their interests?",
          category: "Product Recommendations"
        },
        {
          prompt: "What's the difference between these two laptops?",
          response: "Let me compare those laptops for you. The main differences are: Processor speed, RAM capacity, storage type, and price point. Which features are most important for your needs?",
          category: "Product Comparison"
        }
      ],
      benefits: [
        "Personalized recommendations",
        "Increased sales",
        "Better customer experience",
        "Reduced cart abandonment"
      ]
    },
    {
      id: "healthcare",
      title: "Healthcare Support",
      description: "Symptom assessment, preventive care",
      icon: Heart,
      color: "bg-red-500",
      examples: [
        {
          prompt: "What should I do if I have a sore throat and mild fever?",
          response: "For a sore throat and mild fever, try: 1) Rest and stay hydrated, 2) Gargle with warm salt water, 3) Take over-the-counter pain relievers, 4) Monitor your temperature. If symptoms worsen or persist beyond 3 days, consult a healthcare provider.",
          category: "Symptom Assessment"
        },
        {
          prompt: "When should I get a flu shot?",
          response: "The best time to get a flu shot is early fall (September-October) before flu season begins. However, getting vaccinated later is still beneficial. Everyone 6 months and older should get an annual flu shot.",
          category: "Preventive Care"
        }
      ],
      benefits: [
        "24/7 medical guidance",
        "Reduced ER visits",
        "Better health awareness",
        "Appointment scheduling"
      ]
    },
    {
      id: "education",
      title: "Education & Tutoring",
      description: "Math explanations, science concepts",
      icon: GraduationCap,
      color: "bg-purple-500",
      examples: [
        {
          prompt: "Explain the Pythagorean theorem with a diagram",
          response: "The Pythagorean theorem states: a² + b² = c², where c is the hypotenuse. In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. Visualize it as: the area of the square on the hypotenuse equals the sum of areas of squares on the other sides.",
          category: "Math Tutoring"
        },
        {
          prompt: "What are the main causes of climate change?",
          response: "The main causes of climate change are: 1) Greenhouse gas emissions (CO2, methane), 2) Deforestation, 3) Industrial activities, 4) Transportation emissions, 5) Agricultural practices. Human activities are the primary driver of recent climate change.",
          category: "Science Education"
        }
      ],
      benefits: [
        "Personalized learning",
        "24/7 availability",
        "Interactive explanations",
        "Progress tracking"
      ]
    },
    {
      id: "travel",
      title: "Travel Planning",
      description: "Custom itineraries, travel advice",
      icon: Plane,
      color: "bg-yellow-500",
      examples: [
        {
          prompt: "Plan a 5-day trip to Italy with budget hotels",
          response: "Here's your 5-day Italy itinerary: Day 1-2: Rome (Colosseum, Vatican), Day 3: Florence (Uffizi Gallery), Day 4: Venice (Gondola ride), Day 5: Milan (Duomo). Budget hotels: $60-80/night. Total estimated cost: $800-1000 including food and transport.",
          category: "Itinerary Planning"
        },
        {
          prompt: "What's the best time to visit Japan?",
          response: "The best times to visit Japan are: Spring (March-May) for cherry blossoms, Fall (October-November) for autumn colors, and Winter (December-February) for skiing. Avoid Golden Week (late April-early May) due to crowds.",
          category: "Travel Advice"
        }
      ],
      benefits: [
        "Customized itineraries",
        "Cost optimization",
        "Local recommendations",
        "Booking assistance"
      ]
    },
    {
      id: "hr",
      title: "HR & Recruitment",
      description: "Benefits info, application process",
      icon: Users,
      color: "bg-indigo-500",
      examples: [
        {
          prompt: "What benefits does this job offer?",
          response: "This position offers: Health insurance (medical, dental, vision), 401(k) with 4% match, 20 PTO days, flexible work arrangements, professional development budget, and wellness programs. Would you like details about any specific benefit?",
          category: "Benefits Information"
        },
        {
          prompt: "How do I apply for this position?",
          response: "To apply: 1) Submit your resume and cover letter through our portal, 2) Complete the online assessment, 3) Schedule an initial screening call. The process typically takes 2-3 weeks. Do you have any questions about the application?",
          category: "Application Process"
        }
      ],
      benefits: [
        "Faster hiring process",
        "24/7 candidate support",
        "Reduced HR workload",
        "Better candidate experience"
      ]
    },
    {
      id: "banking",
      title: "Banking & Finance",
      description: "Account balance, bill payments",
      icon: CreditCard,
      color: "bg-emerald-500",
      examples: [
        {
          prompt: "What's my current account balance?",
          response: "Your current checking account balance is $2,450.67. Your savings account has $8,920.45. Recent transactions include: -$45.20 (coffee shop), +$1,200 (salary deposit). Would you like to see more transaction details?",
          category: "Account Information"
        },
        {
          prompt: "How do I set up automatic bill payments?",
          response: "To set up automatic bill payments: 1) Log into online banking, 2) Go to 'Bill Pay' section, 3) Add your payee, 4) Set payment amount and frequency, 5) Confirm setup. You can modify or cancel anytime.",
          category: "Bill Payment"
        }
      ],
      benefits: [
        "Secure transactions",
        "24/7 account access",
        "Fraud protection",
        "Financial guidance"
      ]
    },
    {
      id: "entertainment",
      title: "Entertainment & Lifestyle",
      description: "Jokes, movie recommendations",
      icon: Music,
      color: "bg-pink-500",
      examples: [
        {
          prompt: "Tell me a joke",
          response: "Why don't scientists trust atoms? Because they make up everything! 😄 Want another one? I have plenty more jokes, riddles, and funny stories to share!",
          category: "Humor"
        },
        {
          prompt: "Suggest a movie for date night",
          response: "For date night, I recommend: 1) 'The Notebook' (romance), 2) 'La La Land' (musical), 3) 'Crazy Rich Asians' (comedy), 4) 'A Star is Born' (drama). What genre do you both enjoy?",
          category: "Movie Recommendations"
        }
      ],
      benefits: [
        "Entertainment on demand",
        "Personalized recommendations",
        "Mood enhancement",
        "Social interaction"
      ]
    },
    {
      id: "business",
      title: "Internal Business Automation",
      description: "Meeting summaries, PTO queries",
      icon: Building,
      color: "bg-gray-500",
      examples: [
        {
          prompt: "Create a summary of today's team meeting",
          response: "Meeting Summary - Date: Today, Attendees: 8, Duration: 45 minutes. Key points: 1) Q4 goals finalized, 2) New project timeline approved, 3) Budget allocation discussed. Action items: John to prepare budget report by Friday, Sarah to schedule client meeting.",
          category: "Meeting Summaries"
        },
        {
          prompt: "What's my PTO balance?",
          response: "Your PTO balance: 12.5 days remaining. You've used 7.5 days this year. You can request time off through the HR portal. Would you like me to help you submit a PTO request?",
          category: "HR Queries"
        }
      ],
      benefits: [
        "Increased productivity",
        "Automated workflows",
        "Better communication",
        "Time savings"
      ]
    },
    {
      id: "translation",
      title: "Language Translation",
      description: "Instant translations, grammar help",
      icon: Languages,
      color: "bg-orange-500",
      examples: [
        {
          prompt: "Translate 'How are you?' into Spanish",
          response: "'How are you?' in Spanish is '¿Cómo estás?' (informal) or '¿Cómo está usted?' (formal). Pronunciation: 'KOH-moh ehs-TAHS'. Would you like to learn more Spanish phrases?",
          category: "Translation"
        },
        {
          prompt: "What's the difference between 'ser' and 'estar' in Spanish?",
          response: "'Ser' is used for permanent characteristics (I am tall - Soy alto), while 'estar' is for temporary states (I am tired - Estoy cansado). 'Ser' = identity/permanent, 'Estar' = condition/temporary.",
          category: "Grammar"
        }
      ],
      benefits: [
        "Instant translations",
        "Pronunciation help",
        "Cultural context",
        "Language learning"
      ]
    }
  ];

  const handleUseCaseSelect = (useCaseId: string) => {
    setSelectedUseCase(useCaseId);
  };

  const handleCopyExample = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedExample(text);
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const generateDemoResponse = async (input: string, useCase: UseCase) => {
    setIsDemoLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = "";
    
    // Generate contextual responses based on the use case
    switch (useCase.id) {
      case "customer-support":
        if (input.toLowerCase().includes("order") || input.toLowerCase().includes("track")) {
          response = "I can help you track your order! Let me check the status. Your package is currently in transit and expected to arrive within 2-3 business days. Would you like me to send you tracking updates via email?";
        } else if (input.toLowerCase().includes("return") || input.toLowerCase().includes("refund")) {
          response = "To process your return, you can: 1) Use our online return portal, 2) Visit any store location, or 3) Contact our support team. What's the reason for your return? I can guide you through the process.";
        } else {
          response = "I'm here to help with any customer service questions! I can assist with order tracking, returns, product information, and general inquiries. What can I help you with today?";
        }
        break;
        
      case "ecommerce":
        if (input.toLowerCase().includes("gift") || input.toLowerCase().includes("present")) {
          response = "Great question! I'd recommend: 1) Educational STEM toys ($30-45), 2) Art supplies set ($25-40), 3) Board games ($20-35), or 4) Books series ($15-30). What are their interests? I can provide more specific recommendations.";
        } else if (input.toLowerCase().includes("compare") || input.toLowerCase().includes("difference")) {
          response = "Let me compare those products for you. The main differences are: features, price point, quality, and warranty. Which aspects are most important for your needs? I can provide a detailed comparison.";
        } else {
          response = "I can help you find the perfect products! I can provide recommendations, compare options, check availability, and assist with your purchase. What are you looking for today?";
        }
        break;
        
      case "healthcare":
        if (input.toLowerCase().includes("sore throat") || input.toLowerCase().includes("fever")) {
          response = "For a sore throat and mild fever, try: 1) Rest and stay hydrated, 2) Gargle with warm salt water, 3) Take over-the-counter pain relievers, 4) Monitor your temperature. If symptoms worsen or persist beyond 3 days, consult a healthcare provider.";
        } else if (input.toLowerCase().includes("flu shot") || input.toLowerCase().includes("vaccine")) {
          response = "The best time to get a flu shot is early fall (September-October) before flu season begins. However, getting vaccinated later is still beneficial. Everyone 6 months and older should get an annual flu shot.";
        } else {
          response = "I can provide basic health guidance and symptom assessment. However, I'm not a substitute for professional medical advice. For serious symptoms, please consult a healthcare provider. What health question do you have?";
        }
        break;
        
      case "education":
        if (input.toLowerCase().includes("pythagorean") || input.toLowerCase().includes("theorem")) {
          response = "The Pythagorean theorem states: a² + b² = c², where c is the hypotenuse. In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. Visualize it as: the area of the square on the hypotenuse equals the sum of areas of squares on the other sides.";
        } else if (input.toLowerCase().includes("climate") || input.toLowerCase().includes("global warming")) {
          response = "The main causes of climate change are: 1) Greenhouse gas emissions (CO2, methane), 2) Deforestation, 3) Industrial activities, 4) Transportation emissions, 5) Agricultural practices. Human activities are the primary driver of recent climate change.";
        } else {
          response = "I can help you with various educational topics including math, science, history, and more! I can explain concepts, provide examples, and help with problem-solving. What subject would you like to learn about?";
        }
        break;
        
      case "travel":
        if (input.toLowerCase().includes("italy") || input.toLowerCase().includes("trip")) {
          response = "Here's your 5-day Italy itinerary: Day 1-2: Rome (Colosseum, Vatican), Day 3: Florence (Uffizi Gallery), Day 4: Venice (Gondola ride), Day 5: Milan (Duomo). Budget hotels: $60-80/night. Total estimated cost: $800-1000 including food and transport.";
        } else if (input.toLowerCase().includes("japan") || input.toLowerCase().includes("visit")) {
          response = "The best times to visit Japan are: Spring (March-May) for cherry blossoms, Fall (October-November) for autumn colors, and Winter (December-February) for skiing. Avoid Golden Week (late April-early May) due to crowds.";
        } else {
          response = "I can help you plan amazing trips! I can create custom itineraries, find accommodations, suggest activities, and provide travel advice. Where would you like to go?";
        }
        break;
        
      case "hr":
        if (input.toLowerCase().includes("benefit") || input.toLowerCase().includes("job")) {
          response = "This position offers: Health insurance (medical, dental, vision), 401(k) with 4% match, 20 PTO days, flexible work arrangements, professional development budget, and wellness programs. Would you like details about any specific benefit?";
        } else if (input.toLowerCase().includes("apply") || input.toLowerCase().includes("application")) {
          response = "To apply: 1) Submit your resume and cover letter through our portal, 2) Complete the online assessment, 3) Schedule an initial screening call. The process typically takes 2-3 weeks. Do you have any questions about the application?";
        } else {
          response = "I can help you with job applications, benefits information, company policies, and HR-related questions. What would you like to know about working with us?";
        }
        break;
        
      case "banking":
        if (input.toLowerCase().includes("balance") || input.toLowerCase().includes("account")) {
          response = "Your current checking account balance is $2,450.67. Your savings account has $8,920.45. Recent transactions include: -$45.20 (coffee shop), +$1,200 (salary deposit). Would you like to see more transaction details?";
        } else if (input.toLowerCase().includes("bill") || input.toLowerCase().includes("payment")) {
          response = "To set up automatic bill payments: 1) Log into online banking, 2) Go to 'Bill Pay' section, 3) Add your payee, 4) Set payment amount and frequency, 5) Confirm setup. You can modify or cancel anytime.";
        } else {
          response = "I can help you with account information, transactions, bill payments, transfers, and other banking services. What banking assistance do you need today?";
        }
        break;
        
      case "entertainment":
        if (input.toLowerCase().includes("joke") || input.toLowerCase().includes("funny")) {
          response = "Why don't scientists trust atoms? Because they make up everything! 😄 Want another one? I have plenty more jokes, riddles, and funny stories to share!";
        } else if (input.toLowerCase().includes("movie") || input.toLowerCase().includes("film")) {
          response = "For entertainment, I recommend: 1) 'The Notebook' (romance), 2) 'La La Land' (musical), 3) 'Crazy Rich Asians' (comedy), 4) 'A Star is Born' (drama). What genre do you enjoy?";
        } else {
          response = "I can provide entertainment recommendations, jokes, fun facts, and lifestyle suggestions! What kind of entertainment are you looking for today?";
        }
        break;
        
      case "business":
        if (input.toLowerCase().includes("meeting") || input.toLowerCase().includes("summary")) {
          response = "Meeting Summary - Date: Today, Attendees: 8, Duration: 45 minutes. Key points: 1) Q4 goals finalized, 2) New project timeline approved, 3) Budget allocation discussed. Action items: John to prepare budget report by Friday, Sarah to schedule client meeting.";
        } else if (input.toLowerCase().includes("pto") || input.toLowerCase().includes("vacation")) {
          response = "Your PTO balance: 12.5 days remaining. You've used 7.5 days this year. You can request time off through the HR portal. Would you like me to help you submit a PTO request?";
        } else {
          response = "I can help with business tasks, meeting summaries, PTO requests, project updates, and internal communications. What business assistance do you need?";
        }
        break;
        
      case "translation":
        if (input.toLowerCase().includes("spanish") || input.toLowerCase().includes("translate")) {
          response = "'How are you?' in Spanish is '¿Cómo estás?' (informal) or '¿Cómo está usted?' (formal). Pronunciation: 'KOH-moh ehs-TAHS'. Would you like to learn more Spanish phrases?";
        } else if (input.toLowerCase().includes("grammar") || input.toLowerCase().includes("ser") || input.toLowerCase().includes("estar")) {
          response = "'Ser' is used for permanent characteristics (I am tall - Soy alto), while 'estar' is for temporary states (I am tired - Estoy cansado). 'Ser' = identity/permanent, 'Estar' = condition/temporary.";
        } else {
          response = "I can help with translations, grammar explanations, pronunciation guides, and language learning. What language assistance do you need?";
        }
        break;
        
      default:
        response = "I'm here to help! I can assist with various tasks and answer your questions. What would you like to know?";
    }
    
    setDemoResponse(response);
    setIsDemoLoading(false);
  };

  const handleDemoSend = () => {
    if (!demoInput.trim() || !selectedCase) return;
    generateDemoResponse(demoInput, selectedCase);
  };

  const handleDemoKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDemoSend();
    }
  };

  const selectedCase = useCases.find(uc => uc.id === selectedUseCase);

  return (
    <div className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Main Uses of <span className="text-primary">Chatbots</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how chatbots are revolutionizing industries with intelligent automation and personalized assistance
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={useCase.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedUseCase === useCase.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleUseCaseSelect(useCase.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${useCase.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed View */}
        {selectedCase && (
          <div className="max-w-6xl mx-auto">
            <Card className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-12 h-12 ${selectedCase.color} rounded-full flex items-center justify-center`}>
                  <selectedCase.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedCase.title}</h3>
                  <p className="text-muted-foreground">{selectedCase.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Examples */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Example Conversations
                  </h4>
                  <div className="space-y-4">
                    {selectedCase.examples.map((example, index) => (
                      <Card key={index} className="p-4">
                        <div className="mb-3">
                          <Badge variant="secondary" className="mb-2">
                            {example.category}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">User:</p>
                            <p className="text-sm bg-muted p-2 rounded">{example.prompt}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Chatbot:</p>
                            <p className="text-sm bg-primary/10 p-2 rounded">{example.response}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyExample(example.prompt)}
                            className="text-xs"
                          >
                            {copiedExample === example.prompt ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            Copy Example
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Key Benefits
                  </h4>
                  <div className="space-y-3">
                    {selectedCase.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <p className="text-sm">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Demo */}
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <Play className="w-5 h-5 mr-2" />
                      Try It Yourself
                    </h4>
                    <div className="space-y-3">
                      <Input 
                        placeholder={`Try asking about ${selectedCase.title.toLowerCase()}...`}
                        className="bg-muted/50"
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        onKeyPress={handleDemoKeyPress}
                        disabled={isDemoLoading}
                      />
                      <Button 
                        className="w-full" 
                        onClick={handleDemoSend}
                        disabled={isDemoLoading}
                      >
                        {isDemoLoading ? (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Send Message
                      </Button>
                      {demoResponse && (
                        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Chatbot: {demoResponse}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-primary text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Chatbot Impact Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">67%</div>
                  <div className="text-sm opacity-90">Customer satisfaction increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">40%</div>
                  <div className="text-sm opacity-90">Cost reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm opacity-90">Query resolution rate</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUseCases; 