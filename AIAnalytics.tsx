import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Brain, 
  Zap, 
  Clock, 
  TrendingUp, 
  Activity,
  Cpu,
  Cloud,
  Code,
  Bug,
  Shield,
  Target
} from "lucide-react";

interface AIAnalyticsProps {
  aiConfig: any;
}

const AIAnalytics = ({ aiConfig }: AIAnalyticsProps) => {
  const [analytics, setAnalytics] = useState({
    totalQueries: 1247,
    successfulQueries: 1189,
    averageResponseTime: 1.2,
    codeGenerationCount: 456,
    debuggingCount: 234,
    explanationCount: 312,
    optimizationCount: 145,
    modelUsage: {
      'local-ai': 45,
      'gpt-4': 35,
      'claude-3': 20
    },
    performanceMetrics: {
      accuracy: 94.2,
      speed: 87.5,
      reliability: 96.8
    },
    recentActivity: [
      { type: 'code_generation', model: 'gpt-4', time: '2 min ago', success: true },
      { type: 'debugging', model: 'local-ai', time: '5 min ago', success: true },
      { type: 'optimization', model: 'claude-3', time: '8 min ago', success: true },
      { type: 'explanation', model: 'gpt-4', time: '12 min ago', success: false }
    ]
  });

  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    // Simulate real-time analytics updates
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 3),
        successfulQueries: prev.successfulQueries + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSuccessRate = () => {
    return ((analytics.successfulQueries / analytics.totalQueries) * 100).toFixed(1);
  };

  const getModelColor = (model: string) => {
    switch (model) {
      case 'gpt-4': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'claude-3': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'local-ai': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'code_generation': return <Code className="w-4 h-4" />;
      case 'debugging': return <Bug className="w-4 h-4" />;
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'explanation': return <Brain className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          AI Analytics Dashboard
        </h2>
        <div className="flex space-x-2">
          <Badge variant="outline">24h</Badge>
          <Badge variant="outline">7d</Badge>
          <Badge variant="outline">30d</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Queries</p>
              <p className="text-2xl font-bold">{analytics.totalQueries.toLocaleString()}</p>
            </div>
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <div className="mt-2">
            <Progress value={parseFloat(getSuccessRate())} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {getSuccessRate()}% success rate
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold">{analytics.averageResponseTime}s</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2">
            <Progress value={87} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Fast performance
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Code Generated</p>
              <p className="text-2xl font-bold">{analytics.codeGenerationCount}</p>
            </div>
            <Code className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <Progress value={78} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              High quality code
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Models</p>
              <p className="text-2xl font-bold">{Object.keys(analytics.modelUsage).length}</p>
            </div>
            <Cloud className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2">
            <Progress value={95} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              All systems operational
            </p>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Accuracy</span>
                <span>{analytics.performanceMetrics.accuracy}%</span>
              </div>
              <Progress value={analytics.performanceMetrics.accuracy} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Speed</span>
                <span>{analytics.performanceMetrics.speed}%</span>
              </div>
              <Progress value={analytics.performanceMetrics.speed} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Reliability</span>
                <span>{analytics.performanceMetrics.reliability}%</span>
              </div>
              <Progress value={analytics.performanceMetrics.reliability} className="h-3" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Model Usage Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.modelUsage).map(([model, percentage]) => (
              <div key={model} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={getModelColor(model)}>
                    {model.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={percentage} className="w-20 h-2" />
                  <span className="text-sm font-medium">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Query Types Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Query Types Breakdown
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-500/10 rounded-lg">
            <Code className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{analytics.codeGenerationCount}</p>
            <p className="text-sm text-muted-foreground">Code Generation</p>
          </div>
          <div className="text-center p-4 bg-red-500/10 rounded-lg">
            <Bug className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold">{analytics.debuggingCount}</p>
            <p className="text-sm text-muted-foreground">Debugging</p>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg">
            <Brain className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{analytics.explanationCount}</p>
            <p className="text-sm text-muted-foreground">Explanations</p>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{analytics.optimizationCount}</p>
            <p className="text-sm text-muted-foreground">Optimization</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {analytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getActivityIcon(activity.type)}
                <div>
                  <p className="font-medium capitalize">
                    {activity.type.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time} • {activity.model}
                  </p>
                </div>
              </div>
              <Badge 
                variant={activity.success ? "default" : "destructive"}
                className={activity.success ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}
              >
                {activity.success ? "Success" : "Failed"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Configuration Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Cpu className="w-5 h-5 mr-2" />
          AI Configuration Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${aiConfig.enableLocalProcessing ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm">Local Processing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${aiConfig.enableCodeGeneration ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm">Code Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${aiConfig.enableRealTimeAnalysis ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm">Real-time Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${aiConfig.enableSecurityScanning ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm">Security Scanning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${aiConfig.enablePerformanceOptimization ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm">Performance Optimization</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${aiConfig.openaiApiKey || aiConfig.anthropicApiKey ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm">Cloud AI Connected</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAnalytics; 