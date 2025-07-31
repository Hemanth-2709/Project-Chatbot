import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Brain, 
  Cloud, 
  Cpu, 
  Zap, 
  Shield, 
  Key,
  TestTube,
  Activity
} from "lucide-react";

interface AIConfigPanelProps {
  onConfigUpdate: (config: any) => void;
  currentConfig: any;
}

const AIConfigPanel = ({ onConfigUpdate, currentConfig }: AIConfigPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState(currentConfig || {
    openaiApiKey: "",
    anthropicApiKey: "",
    localModelUrl: "",
    enableLocalProcessing: true,
    enableCodeGeneration: true,
    enableRealTimeAnalysis: true,
    enableSecurityScanning: true,
    enablePerformanceOptimization: true
  });

  const [testResults, setTestResults] = useState<any>(null);

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigUpdate(newConfig);
  };

  const testAIConnection = async (service: string) => {
    setTestResults({ ...testResults, [service]: 'testing' });
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setTestResults({ 
        ...testResults, 
        [service]: success ? 'success' : 'failed' 
      });
    }, 2000);
  };

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'failed': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'testing': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getTestStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Connected';
      case 'failed': return 'Failed';
      case 'testing': return 'Testing...';
      default: return 'Not Tested';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 shadow-lg bg-gradient-primary hover:scale-105"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-96 p-6 bg-card/95 backdrop-blur border border-border/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Configuration
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              ×
            </Button>
          </div>

          <div className="space-y-4">
            {/* API Keys Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center">
                <Key className="w-4 h-4 mr-2" />
                API Keys
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={config.openaiApiKey}
                  onChange={(e) => handleConfigChange('openaiApiKey', e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={getTestStatusColor(testResults?.openai)}
                  >
                    {getTestStatusText(testResults?.openai)}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => testAIConnection('openai')}
                    disabled={!config.openaiApiKey}
                  >
                    <TestTube className="w-3 h-3 mr-1" />
                    Test
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                  value={config.anthropicApiKey}
                  onChange={(e) => handleConfigChange('anthropicApiKey', e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={getTestStatusColor(testResults?.anthropic)}
                  >
                    {getTestStatusText(testResults?.anthropic)}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => testAIConnection('anthropic')}
                    disabled={!config.anthropicApiKey}
                  >
                    <TestTube className="w-3 h-3 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </div>

            {/* Local AI Configuration */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center">
                <Cpu className="w-4 h-4 mr-2" />
                Local AI Settings
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="local-model-url">Local Model URL</Label>
                <Input
                  id="local-model-url"
                  placeholder="http://localhost:11434"
                  value={config.localModelUrl}
                  onChange={(e) => handleConfigChange('localModelUrl', e.target.value)}
                />
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                AI Features
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4" />
                    <Label htmlFor="local-processing">Local Processing</Label>
                  </div>
                  <Switch
                    id="local-processing"
                    checked={config.enableLocalProcessing}
                    onCheckedChange={(checked) => handleConfigChange('enableLocalProcessing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <Label htmlFor="code-generation">Code Generation</Label>
                  </div>
                  <Switch
                    id="code-generation"
                    checked={config.enableCodeGeneration}
                    onCheckedChange={(checked) => handleConfigChange('enableCodeGeneration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <Label htmlFor="real-time-analysis">Real-time Analysis</Label>
                  </div>
                  <Switch
                    id="real-time-analysis"
                    checked={config.enableRealTimeAnalysis}
                    onCheckedChange={(checked) => handleConfigChange('enableRealTimeAnalysis', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <Label htmlFor="security-scanning">Security Scanning</Label>
                  </div>
                  <Switch
                    id="security-scanning"
                    checked={config.enableSecurityScanning}
                    onCheckedChange={(checked) => handleConfigChange('enableSecurityScanning', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <Label htmlFor="performance-optimization">Performance Optimization</Label>
                  </div>
                  <Switch
                    id="performance-optimization"
                    checked={config.enablePerformanceOptimization}
                    onCheckedChange={(checked) => handleConfigChange('enablePerformanceOptimization', checked)}
                  />
                </div>
              </div>
            </div>

            {/* AI Models Status */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center">
                <Cloud className="w-4 h-4 mr-2" />
                Available Models
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="secondary" className="justify-center">
                  <Brain className="w-3 h-3 mr-1" />
                  GPT-4
                </Badge>
                <Badge variant="secondary" className="justify-center">
                  <Brain className="w-3 h-3 mr-1" />
                  Claude-3
                </Badge>
                <Badge variant="secondary" className="justify-center">
                  <Cpu className="w-3 h-3 mr-1" />
                  Local LLM
                </Badge>
                <Badge variant="secondary" className="justify-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Code Assistant
                </Badge>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={() => {
                  // Reset to default config
                  const defaultConfig = {
                    openaiApiKey: "",
                    anthropicApiKey: "",
                    localModelUrl: "",
                    enableLocalProcessing: true,
                    enableCodeGeneration: true,
                    enableRealTimeAnalysis: true,
                    enableSecurityScanning: true,
                    enablePerformanceOptimization: true
                  };
                  setConfig(defaultConfig);
                  onConfigUpdate(defaultConfig);
                }}
              >
                Reset to Default
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // Export config
                  const configData = JSON.stringify(config, null, 2);
                  const blob = new Blob([configData], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'ai-config.json';
                  a.click();
                }}
              >
                Export Config
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIConfigPanel; 