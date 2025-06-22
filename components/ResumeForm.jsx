"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Lightbulb,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  RefreshCw,
  Info,
  Plus,
  Sparkles,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  Star,
  ArrowRight,
  Save,
  Eye,
  Award,
  Rocket,
  Shield,
  Brain,
  ChevronRight,
  Activity,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react";
import { RainbowButton } from "./magicui/rainbow-button";
import JSON5 from 'json5';

const mockGrowthData = [
  { month: "Jan", opportunity: 65, market: 45, projection: 58 },
  { month: "Feb", opportunity: 72, market: 52, projection: 65 },
  { month: "Mar", opportunity: 78, market: 58, projection: 72 },
  { month: "Apr", opportunity: 85, market: 65, projection: 78 },
  { month: "May", opportunity: 92, market: 72, projection: 85 },
  { month: "Jun", opportunity: 88, market: 68, projection: 82 },
];

const mockCompetitorData = [
  { name: "Direct", score: 75, color: "#1f2937", trend: "stable" },
  { name: "Indirect", score: 60, color: "#374151", trend: "growing" },
  { name: "Leaders", score: 90, color: "#4b5563", trend: "declining" },
  { name: "Emerging", score: 45, color: "#6b7280", trend: "growing" },
];

const mockMarketShareData = [
  { name: "Your Opportunity", value: 25, color: "#000000" },
  { name: "Direct Competitors", value: 35, color: "#374151" },
  { name: "Indirect Competitors", value: 25, color: "#6b7280" },
  { name: "Untapped Market", value: 15, color: "#d1d5db" },
];

const mockRadarData = [
  { subject: "Innovation", A: 85, fullMark: 100 },
  { subject: "Market Size", A: 78, fullMark: 100 },
  { subject: "Competition", A: 65, fullMark: 100 },
  { subject: "Team", A: 82, fullMark: 100 },
  { subject: "Timing", A: 94, fullMark: 100 },
  { subject: "Scalability", A: 88, fullMark: 100 },
];

const mockImprovements = [
  {
    category: "Market Strategy",
    priority: "High",
    title: "Strengthen Competitive Positioning",
    description:
      "Your solution has strong potential but faces established competitors. Focus on unique differentiators.",
    actions: [
      "Identify 2-3 unique features competitors lack",
      "Develop a clear value proposition statement",
      "Create comparison charts highlighting advantages",
    ],
    impact: "Could increase market capture by 15-20%",
    timeframe: "2-4 weeks",
  },
  {
    category: "Product Development",
    priority: "Medium",
    title: "Enhance User Experience Design",
    description:
      "Strong technical foundation needs better user experience to drive adoption.",
    actions: [
      "Conduct user journey mapping sessions",
      "Implement user feedback collection system",
      "Redesign onboarding flow for better conversion",
    ],
    impact: "Potential 25% improvement in user retention",
    timeframe: "4-6 weeks",
  },
  {
    category: "Go-to-Market",
    priority: "High",
    title: "Refine Target Audience Segmentation",
    description:
      "Your target audience is broad. Narrowing focus could improve marketing efficiency.",
    actions: [
      "Create detailed buyer personas",
      "Analyze customer acquisition costs by segment",
      "Develop segment-specific marketing messages",
    ],
    impact: "30% reduction in customer acquisition cost",
    timeframe: "1-2 weeks",
  },
  {
    category: "Revenue Model",
    priority: "Medium",
    title: "Optimize Pricing Strategy",
    description:
      "Current pricing model may not capture full value. Consider tiered approach.",
    actions: [
      "Research competitor pricing strategies",
      "Test different pricing tiers with focus groups",
      "Implement value-based pricing model",
    ],
    impact: "Potential 20% increase in average revenue per user",
    timeframe: "3-4 weeks",
  },
];

// --- SaaS-style ImprovementCard for Key Improvements tab ---
function ImprovementCard({ improvement }) {
  // Priority color and icon
  const priorityMap = {
    High: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <AlertTriangle className="h-5 w-5 text-red-500 ml-2" />,
      label: 'High Priority',
    },
    Medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Award className="h-5 w-5 text-yellow-500 ml-2" />,
      label: 'Medium Priority',
    },
    Low: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <Shield className="h-5 w-5 text-green-500 ml-2" />,
      label: 'Low Priority',
    },
    default: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: null,
      label: 'Priority',
    },
  };
  // Try to infer priority from expectedImpact if not present
  let priority = improvement.priority ||
    (improvement.expectedImpact === 'High' ? 'High' : improvement.expectedImpact === 'Medium' ? 'Medium' : improvement.expectedImpact === 'Low' ? 'Low' : 'default');
  const p = priorityMap[priority] || priorityMap.default;
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-4 transition hover:shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>{p.label}</span>
          {improvement.category && <span className="text-sm text-gray-500 font-medium">{improvement.category}</span>}
        </div>
        {p.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{improvement.title || improvement.actionItem}</h3>
      {improvement.description && <p className="text-gray-600 mb-4">{improvement.description}</p>}
      {/* Action Items */}
      {improvement.actions || improvement.actionItem ? (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold text-sm">
            <Brain className="h-4 w-4 mr-1 text-blue-500" />
            Action Items
          </div>
          <ul className="space-y-2 ml-2">
            {improvement.actions
              ? improvement.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))
              : (
                <li className="flex items-start gap-2 text-gray-700 text-sm">
                  <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{improvement.actionItem}</span>
                </li>
              )}
          </ul>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-6 border-t border-gray-100 pt-4 mt-4 text-sm">
        {improvement.impact && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Expected Impact</div>
            <div className="text-green-700 font-semibold">{improvement.impact}</div>
          </div>
        )}
        {improvement.expectedImpact && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Expected Impact</div>
            <div className={`font-semibold ${improvement.expectedImpact === 'High' ? 'text-green-700' : improvement.expectedImpact === 'Medium' ? 'text-yellow-700' : 'text-gray-700'}`}>{improvement.expectedImpact}</div>
          </div>
        )}
        {improvement.timeframe && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Timeframe</div>
            <div className="text-blue-700 font-semibold">{improvement.timeframe}</div>
          </div>
        )}
        {improvement.timeFrame && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Timeframe</div>
            <div className="text-blue-700 font-semibold">{improvement.timeFrame}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Modern Black & White CompetitorBar component ---
function CompetitorBar({ name, score, maxScore = 10 }) {
  // Score can be "7/10" or just a number
  let numericScore = 0;
  if (typeof score === 'string' && score.includes('/')) {
    numericScore = parseFloat(score.split('/')[0]);
  } else {
    numericScore = parseFloat(score);
  }
  const percent = Math.max(0, Math.min(100, (numericScore / maxScore) * 100));
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="font-semibold text-black w-32 truncate">{name}</span>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-black to-gray-800 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="ml-4 font-mono text-xs text-gray-700 min-w-[40px] text-right">{score}</span>
    </div>
  );
}

export default function StartupValidatorDashboard() {
  const [formData, setFormData] = useState({
    startupName: "",
    oneLiner: "",
    problemSolved: "",
    targetAudience: "",
    alternativesExist: "",
    biggestRisk: "",
    revenueModel: "",
    keyFeatures: "",
  });

  const [hasResults, setHasResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [completionProgress, setCompletionProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [activeTab, setActiveTab] = useState("market-fit");
  const [analysisResult, setAnalysisResult] = useState(null);

  // Calculate form completion progress
  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter((field) => field.trim() !== "").length;
    const progress = (filledFields / fields.length) * 100;
    setCompletionProgress(progress);
  }, [formData]);

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some((field) => field.trim() !== "")) {
        setLastSaved(new Date());
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  function extractFirstJson(str) {
    // Remove markdown code block markers if present
    let cleaned = str.replace(/```json[\r\n]*/i, '').replace(/```/, '').trim();
    // Find the first complete JSON object
    const firstBrace = cleaned.indexOf('{');
    if (firstBrace === -1) throw new Error('No JSON object found');
    let depth = 0;
    let end = -1;
    for (let i = firstBrace; i < cleaned.length; i++) {
      if (cleaned[i] === '{') depth++;
      if (cleaned[i] === '}') depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
    if (end === -1) throw new Error('No complete JSON object found');
    return cleaned.slice(firstBrace, end);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze-startup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      let cleaned = extractFirstJson(result.result);
      // Remove trailing commas (optional, JSON5 can handle it)
      // cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
      // Fix unquoted property names (optional, JSON5 can handle it)
      // cleaned = cleaned.replace(/([,{\[]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
      console.log('CLEANED JSON:', cleaned);
      const parsed = JSON5.parse(cleaned);
      setAnalysisResult(parsed);
      setHasResults(true);
    } catch (err) {
      setAnalysisResult({ reasonForRejection: "Could not parse AI response. Please try again or rephrase your input." });
      setHasResults(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewIdea = () => {
    setFormData({
      startupName: "",
      oneLiner: "",
      problemSolved: "",
      targetAudience: "",
      alternativesExist: "",
      biggestRisk: "",
      revenueModel: "",
      keyFeatures: "",
    });
    setHasResults(false);
    setCompletionProgress(0);
    setLastSaved(null);
    setActiveTab("market-fit");
  };

  const getFieldCharCount = (field) => {
    return formData[field]?.length || 0;
  };

  const getFieldMaxLength = (field) => {
    const limits = {
      startupName: 50,
      oneLiner: 150,
      problemSolved: 500,
      targetAudience: 400,
      biggestRisk: 300,
      keyFeatures: 400,
    };
    return limits[field] || 100;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const SkeletonLoader = () => (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      {/* Success Score Skeleton */}
      <Card className="border-gray-200/40 shadow-lg bg-white/90">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-8">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-lg" />
          ))}
        </div>

        {/* Tab Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200/40 shadow-lg bg-white/90">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-48" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gray-200/40 shadow-lg bg-white/90">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full rounded" />
            </CardContent>
          </Card> 
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Glass-like Top Navigation */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-gray-200/30 shadow-sm">
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Startup Validator
                </h1>
                <div className="text-xs text-gray-500 font-medium flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered Validation Platform
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            {/* <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600 font-medium">Progress</div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-600 to-black rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${completionProgress}%` }}
                  />
                </div>
                <div className="text-sm font-semibold text-gray-700 min-w-[3rem]">
                  {Math.round(completionProgress)}%
                </div>
              </div>

              {lastSaved && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Save className="h-3 w-3" />
                  <span>Auto-saved</span>
                </div>
              )}
            </div> */}
            <RainbowButton className="bg-black hidden lg:flex" variant="outline" onClick={handleNewIdea}>
              <Plus className="h-4 w-4 mr-2" />
              New Idea
              <Sparkles className="h-3 w-3 ml-2" />
            </RainbowButton>
            {/* <Button
              
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              
              
              
            </Button> */}
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)] lg:flex-row flex-col">
          {/* Left Panel - Input Form (40% on desktop) */}
          <div className="w-full lg:w-2/5 border-r border-gray-200/30 bg-gradient-to-b from-gray-50/30 to-white/50 relative">
            {/* Typing Indicator */}
            {/* {isTyping && (
              <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-blue-200/30">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
                <span className="text-xs text-blue-600 font-medium">Typing...</span>
              </div>
            )} */}

            <ScrollArea className="h-full">
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-gray-700" />
                    Validate Your Startup
                    <div className="ml-3 flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Provide comprehensive details about your startup idea to
                    receive AI-powered validation insights and actionable
                    recommendations.
                  </p>
                </div>

                {/* Basic Information Card */}
                <Card className="border-gray-200/40 shadow-sm bg-white/80 hover:shadow-lg hover:bg-white/90 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                        <Lightbulb className="h-4 w-4 text-white" />
                      </div>
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Startup Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="startup-name"
                        className={`text-sm font-medium transition-all duration-300 ${
                          focusedField === "startupName"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        Startup Name
                        {focusedField === "startupName" && (
                          <span className="ml-2 text-xs text-blue-600">
                            ✨ Make it memorable!
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Input
                          id="startup-name"
                          placeholder="Enter your startup name"
                          value={formData.startupName}
                          maxLength={getFieldMaxLength("startupName")}
                          onChange={(e) =>
                            handleInputChange("startupName", e.target.value)
                          }
                          onFocus={() => setFocusedField("startupName")}
                          onBlur={() => setFocusedField(null)}
                          className={`border-gray-300/50 bg-white/70 text-black transition-all duration-300 ${
                            focusedField === "startupName"
                              ? "border-gray-900 ring-2 ring-gray-900/20 shadow-lg scale-[1.02]"
                              : "hover:border-gray-400 hover:shadow-md"
                          }`}
                        />
                        {formData.startupName && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={`transition-colors duration-300 ${
                            getFieldCharCount("startupName") >
                            getFieldMaxLength("startupName") * 0.8
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getFieldCharCount("startupName")}/
                          {getFieldMaxLength("startupName")} characters
                        </span>
                        {formData.startupName && (
                          <span className="text-green-600">
                            ✓ Looking good!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* One-liner Pitch */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="one-liner"
                        className={`text-sm font-medium transition-all duration-300 ${
                          focusedField === "oneLiner"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        One-liner Pitch
                        {focusedField === "oneLiner" && (
                          <span className="ml-2 text-xs text-blue-600">
                            🎯 Keep it concise and compelling!
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Input
                          id="one-liner"
                          placeholder="Describe your startup in one compelling sentence"
                          value={formData.oneLiner}
                          maxLength={getFieldMaxLength("oneLiner")}
                          onChange={(e) =>
                            handleInputChange("oneLiner", e.target.value)
                          }
                          onFocus={() => setFocusedField("oneLiner")}
                          onBlur={() => setFocusedField(null)}
                          className={`border-gray-300/50 text-black bg-white/70 transition-all duration-300 ${
                            focusedField === "oneLiner"
                              ? "border-gray-900 ring-2 ring-gray-900/20 shadow-lg scale-[1.02]"
                              : "hover:border-gray-400 hover:shadow-md"
                          }`}
                        />
                        {formData.oneLiner && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={`transition-colors duration-300 ${
                            getFieldCharCount("oneLiner") >
                            getFieldMaxLength("oneLiner") * 0.8
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getFieldCharCount("oneLiner")}/
                          {getFieldMaxLength("oneLiner")} characters
                        </span>
                        {formData.oneLiner && formData.oneLiner.length > 50 && (
                          <span className="text-green-600">
                            ✓ Great detail!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Revenue Model */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        Revenue Model
                      </Label>
                      <Select
                        value={formData.revenueModel}
                        onValueChange={(value) =>
                          handleInputChange("revenueModel", value)
                        }
                      >
                        <SelectTrigger className="border-gray-300/50 text-black bg-white/70 hover:border-gray-400 hover:shadow-md transition-all duration-300">
                          <SelectValue placeholder="Select revenue model" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 text-black border-gray-200/50">
                          <SelectItem
                            value="subscription"
                            className="hover:bg-gray-50/80 text-black transition-colors duration-200"
                          >
                            💳 Subscription (SaaS)
                          </SelectItem>
                          <SelectItem
                            value="freemium"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            🆓 Freemium
                          </SelectItem>
                          <SelectItem
                            value="marketplace"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            🏪 Marketplace Commission
                          </SelectItem>
                          <SelectItem
                            value="advertising"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            📢 Advertising
                          </SelectItem>
                          <SelectItem
                            value="transaction"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            💰 Transaction Fees
                          </SelectItem>
                          <SelectItem
                            value="licensing"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            📄 Licensing
                          </SelectItem>
                          <SelectItem
                            value="other"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            ⚡ Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.revenueModel && (
                        <div className="text-xs text-green-600 flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Revenue model selected
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Problem & Solution Card */}
                <Card className="border-gray-200/40 shadow-sm bg-white/80 hover:shadow-lg hover:bg-white/90 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      Problem & Solution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Problem Solved */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="problem"
                        className={`text-sm font-medium transition-all duration-300 ${
                          focusedField === "problemSolved"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        Problem Solved
                        {focusedField === "problemSolved" && (
                          <span className="ml-2 text-xs text-blue-600">
                            🔍 Be specific about the pain point!
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="problem"
                          placeholder="What specific problem does your startup solve?"
                          value={formData.problemSolved}
                          maxLength={getFieldMaxLength("problemSolved")}
                          onChange={(e) =>
                            handleInputChange("problemSolved", e.target.value)
                          }
                          onFocus={() => setFocusedField("problemSolved")}
                          onBlur={() => setFocusedField(null)}
                          className={`border-gray-300/50 text-black bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
                            focusedField === "problemSolved"
                              ? "border-gray-900 ring-2 ring-gray-900/20 shadow-lg scale-[1.02]"
                              : "hover:border-gray-400 hover:shadow-md"
                          }`}
                        />
                        {formData.problemSolved && (
                          <div className="absolute right-3 top-3">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={`transition-colors duration-300 ${
                            getFieldCharCount("problemSolved") >
                            getFieldMaxLength("problemSolved") * 0.8
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getFieldCharCount("problemSolved")}/
                          {getFieldMaxLength("problemSolved")} characters
                        </span>
                        {formData.problemSolved &&
                          formData.problemSolved.length > 100 && (
                            <span className="text-green-600">
                              ✓ Detailed explanation!
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="target-audience"
                        className={`text-sm font-medium transition-all duration-300 flex items-center ${
                          focusedField === "targetAudience"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <Users className="h-4 w-4 mr-2 text-blue-600" />
                        Target Audience
                        {focusedField === "targetAudience" && (
                          <span className="ml-2 text-xs text-blue-600">
                            👥 Who exactly will use this?
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="target-audience"
                          placeholder="Who is your ideal customer? Be specific about demographics, needs, and behaviors."
                          value={formData.targetAudience}
                          maxLength={getFieldMaxLength("targetAudience")}
                          onChange={(e) =>
                            handleInputChange("targetAudience", e.target.value)
                          }
                          onFocus={() => setFocusedField("targetAudience")}
                          onBlur={() => setFocusedField(null)}
                          className={`border-gray-300/50 text-black bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
                            focusedField === "targetAudience"
                              ? "border-gray-900 ring-2 ring-gray-900/20 shadow-lg scale-[1.02]"
                              : "hover:border-gray-400 hover:shadow-md"
                          }`}
                        />
                        {formData.targetAudience && (
                          <div className="absolute right-3 top-3">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={`transition-colors duration-300 ${
                            getFieldCharCount("targetAudience") >
                            getFieldMaxLength("targetAudience") * 0.8
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getFieldCharCount("targetAudience")}/
                          {getFieldMaxLength("targetAudience")} characters
                        </span>
                        {formData.targetAudience &&
                          formData.targetAudience.length > 80 && (
                            <span className="text-green-600">
                              ✓ Well defined!
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="key-features"
                        className={`text-sm font-medium transition-all duration-300 ${
                          focusedField === "keyFeatures"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        Key Features
                        {focusedField === "keyFeatures" && (
                          <span className="ml-2 text-xs text-blue-600">
                            ⚡ What makes you unique?
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="key-features"
                          placeholder="List your main features and unique value propositions"
                          value={formData.keyFeatures}
                          maxLength={getFieldMaxLength("keyFeatures")}
                          onChange={(e) =>
                            handleInputChange("keyFeatures", e.target.value)
                          }
                          onFocus={() => setFocusedField("keyFeatures")}
                          onBlur={() => setFocusedField(null)}
                          className={`border-gray-300/50 text-black bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
                            focusedField === "keyFeatures"
                              ? "border-gray-900 ring-2 ring-gray-900/20 shadow-lg scale-[1.02]"
                              : "hover:border-gray-400 hover:shadow-md"
                          }`}
                        />
                        {formData.keyFeatures && (
                          <div className="absolute right-3 top-3">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={`transition-colors duration-300 ${
                            getFieldCharCount("keyFeatures") >
                            getFieldMaxLength("keyFeatures") * 0.8
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getFieldCharCount("keyFeatures")}/
                          {getFieldMaxLength("keyFeatures")} characters
                        </span>
                        {formData.keyFeatures &&
                          formData.keyFeatures.length > 100 && (
                            <span className="text-green-600">
                              ✓ Feature-rich!
                            </span>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Analysis Card */}
                <Card className="border-gray-200/40 shadow-sm bg-white/80 hover:shadow-lg hover:bg-white/90 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      Market Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Alternatives Exist */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Do Alternatives Exist?
                      </Label>
                      <Select
                        value={formData.alternativesExist}
                        onValueChange={(value) =>
                          handleInputChange("alternativesExist", value)
                        }
                      >
                        <SelectTrigger className="border-gray-300/50 text-black bg-white/70 hover:border-gray-400 hover:shadow-md transition-all duration-300">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 text-black border-gray-200/50">
                          <SelectItem
                            value="none"
                            className="hover:bg-green-50/80 transition-colors duration-200"
                          >
                            🎯 No direct alternatives
                          </SelectItem>
                          <SelectItem
                            value="few"
                            className="hover:bg-yellow-50/80 transition-colors duration-200"
                          >
                            🔍 Few alternatives exist
                          </SelectItem>
                          <SelectItem
                            value="many"
                            className="hover:bg-orange-50/80 transition-colors duration-200"
                          >
                            ⚠️ Many alternatives exist
                          </SelectItem>
                          <SelectItem
                            value="dominant"
                            className="hover:bg-red-50/80 transition-colors duration-200"
                          >
                            🏆 Market dominated by alternatives
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.alternativesExist && (
                        <div className="text-xs text-green-600 flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          Market position noted
                        </div>
                      )}
                    </div>

                    {/* Biggest Risk */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="biggest-risk"
                        className={`text-sm font-medium transition-all duration-300 flex items-center ${
                          focusedField === "biggestRisk"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                        What's the Biggest Risk/Challenge?
                        {focusedField === "biggestRisk" && (
                          <span className="ml-2 text-xs text-blue-600">
                            ⚠️ Identify potential obstacles!
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="biggest-risk"
                          placeholder="Identify the main risk or challenge your startup might face"
                          value={formData.biggestRisk}
                          maxLength={getFieldMaxLength("biggestRisk")}
                          onChange={(e) =>
                            handleInputChange("biggestRisk", e.target.value)
                          }
                          onFocus={() => setFocusedField("biggestRisk")}
                          onBlur={() => setFocusedField(null)}
                          className={`border-gray-300/50 text-black bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
                            focusedField === "biggestRisk"
                              ? "border-gray-900 ring-2 ring-gray-900/20 shadow-lg scale-[1.02]"
                              : "hover:border-gray-400 hover:shadow-md"
                          }`}
                        />
                        {formData.biggestRisk && (
                          <div className="absolute right-3 top-3">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={`transition-colors duration-300 ${
                            getFieldCharCount("biggestRisk") >
                            getFieldMaxLength("biggestRisk") * 0.8
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getFieldCharCount("biggestRisk")}/
                          {getFieldMaxLength("biggestRisk")} characters
                        </span>
                        {formData.biggestRisk &&
                          formData.biggestRisk.length > 50 && (
                            <span className="text-green-600">
                              ✓ Risk assessed!
                            </span>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Validate Button */}
                <div className="relative">
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isLoading || !formData.startupName || !formData.oneLiner
                    }
                    className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] disabled:hover:scale-100"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                        <span>Analyzing Your Idea</span>
                        <div className="ml-3 flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-3" />
                        <span className="font-semibold">
                          Validate Startup Idea
                        </span>
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </>
                    )}
                  </Button>

                  {/* Progress indicator for form completion */}
                  <div className="mt-4 flex items-center justify-center space-x-3 text-xs text-gray-500">
                    <div className="flex space-x-1">
                      {Object.entries(formData).map(([key, value], index) => (
                        <div
                          key={key}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            value.trim() !== ""
                              ? "bg-green-500 scale-110"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">
                      {
                        Object.values(formData).filter((v) => v.trim() !== "")
                          .length
                      }
                      /8 fields completed
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Right Panel - Results (60% on desktop) */}
          <div
            className="flex-1 bg-gradient-to-b from-white to-gray-50/30 w-full min-w-0 max-w-full lg:max-w-[60vw] xl:max-w-[70vw] 2xl:max-w-[80vw] flex flex-col"
          >
            <ScrollArea className="h-full w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="p-2 sm:p-4 md:p-6 lg:p-6 xl:p-8">
                {isLoading ? (
                  <SkeletonLoader />
                ) : !hasResults ? (
                  <div className="flex items-center justify-center h-full min-h-[400px] sm:min-h-[500px]">
                    <div className="text-center space-y-8 max-w-lg w-full">
                      <div className="relative">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-3xl flex items-center justify-center shadow-2xl">
                          <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                          Ready for AI Analysis
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                          Complete the startup details on the left panel and
                          click "Validate Startup Idea" to receive comprehensive
                          AI-powered insights, competitive analysis, and
                          actionable recommendations.
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                            />
                          ))}
                        </div>
                        <span className="font-medium">
                          Powered by Advanced AI
                        </span>
                        <Zap className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Handle API rejection */}
                    {analysisResult?.reasonForRejection ? (
                      <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-6">
                        <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-red-700">Submission Rejected</h2>
                        <p className="text-gray-700 text-lg">{analysisResult.reasonForRejection}</p>
                        <Button onClick={handleNewIdea} className="mt-4">Try Another Idea</Button>
                      </div>
                    ) : (
                      <>
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-3">
                            <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                              {analysisResult?.startupName || formData.startupName || "Your Startup"}
                              <CheckCircle2 className="h-8 w-8 ml-4 text-green-600" />
                            </h2>
                            <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
                              {analysisResult?.oneLiner || formData.oneLiner}
                            </p>
                            <div className="flex items-center space-x-3 mt-4">
                              <Badge className="bg-gray-900/10 text-gray-900 hover:bg-gray-900/20 transition-colors duration-300 px-3 py-1">
                                {analysisResult?.revenueModel || formData.revenueModel || "Revenue Model"}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-green-300 text-green-700 bg-green-50 px-3 py-1"
                              >
                                ✨ AI Analyzed
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-blue-300 text-blue-700 bg-blue-50 px-3 py-1"
                              >
                                🚀 Ready to Launch
                              </Badge>
                            </div>
                          </div>
                          <Button
                            onClick={handleSubmit}
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Revalidate Idea
                          </Button>
                        </div>

                        {/* Success Score */}
                        <Card className="border-gray-200/40 shadow-xl bg-gradient-to-br from-white via-gray-50/30 to-white">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-2xl text-gray-900 flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                  <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                Startup Success Score
                              </CardTitle>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-300" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-900 text-white border-0 shadow-xl">
                                  <p>
                                    AI-calculated viability score based on market
                                    fit, competition, and growth potential
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center space-x-8">
                              <div className="text-6xl -translate-y-4 font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                {analysisResult?.successScore ?? '--'}
                              </div>
                              <div className="flex-1 space-y-4">
                                <Progress value={Number(analysisResult?.successScore) || 0} className="h-6 bg-gray-100" />
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <XCircle className="h-4 w-4 mr-1 text-red-500" />
                                    Poor
                                  </span>
                                  <span className="flex items-center">
                                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                                    Excellent
                                  </span>
                                </div>
                              </div>
                              <Badge className="bg-gradient-to-r font-bold from-green-500 to-green-600 -translate-y-4.5 text-white shadow-lg rounded-lg px-2 text-sm">
                                {Number(analysisResult?.successScore) >= 80 ? 'Strong Potential' : Number(analysisResult?.successScore) >= 60 ? 'Good' : 'Needs Work'}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Analysis Tabs */}
                        <Tabs
                          value={activeTab}
                          onValueChange={setActiveTab}
                          className="space-y-6"
                        >
                          <TabsList className="grid w-full grid-cols-5 bg-gray-100/80  shadow-md">
                            {[
                              {
                                value: "market-fit",
                                label: "Market Fit",
                                icon: Target,
                              },
                              { value: "audience", label: "Audience", icon: Users },
                              {
                                value: "competitors",
                                label: "Competitors",
                                icon: BarChart3,
                              },
                              {
                                value: "growth",
                                label: "Growth",
                                icon: TrendingUp,
                              },
                              {
                                value: "improvements",
                                label: "Key Improvements",
                                icon: Rocket,
                              },
                            ].map((tab) => (
                              <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center space-x-2"
                              >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                  {tab.label}
                                </span>
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          {/* Market Fit Tab */}
                          <TabsContent value="market-fit" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <Card className="border-gray-200/40 shadow-lg bg-white/90">
                                <CardHeader>
                                  <CardTitle className="text-lg text-gray-900 flex items-center">
                                    <Target className="h-5 w-5 mr-2 text-red-500" />
                                    Market Fit Analysis
                                  </CardTitle>
                                  <CardDescription>
                                    AI assessment of how well your solution fits
                                    current market needs
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  <div className="grid grid-cols-1 gap-6">
                                    {analysisResult?.marketFitAnalysis ? (
                                      [
                                        {
                                          label: "Problem Severity",
                                          value: analysisResult.marketFitAnalysis.problemSeverity,
                                          color: "red",
                                          desc: "Critical market need identified",
                                        },
                                        {
                                          label: "Solution Uniqueness",
                                          value: analysisResult.marketFitAnalysis.solutionUniqueness,
                                          color: "yellow",
                                          desc: "Some differentiation present",
                                        },
                                        {
                                          label: "Market Timing",
                                          value: analysisResult.marketFitAnalysis.marketTiming,
                                          color: "green",
                                          desc: "Market timing assessment",
                                        },
                                        {
                                          label: "Scalability",
                                          value: analysisResult.marketFitAnalysis.scalability,
                                          color: "blue",
                                          desc: "Growth potential assessment",
                                        },
                                      ].map((item) => (
                                        <div key={item.label} className="space-y-3">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 font-medium">
                                              {item.label}
                                            </span>
                                            <Badge
                                              className={`$ {
                                                item.color === "red"
                                                  ? "bg-red-100 text-red-800"
                                                  : item.color === "yellow"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : item.color === "green"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-blue-100 text-blue-800"
                                              }`}
                                            >
                                              {item.value}
                                            </Badge>
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {item.desc}
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-gray-400 text-sm">No market fit analysis available.</div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Radar Chart Card */}
                              <Card className="border-gray-200/40 shadow-lg bg-white/90">
                                <CardHeader>
                                  <CardTitle className="text-lg text-gray-900 flex items-center">
                                    <Activity className="h-5 w-5 mr-2 text-purple-500" />
                                    Startup Radar Analysis
                                  </CardTitle>
                                  <CardDescription>
                                    Multi-dimensional assessment of your startup's
                                    strengths
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  {(() => {
                                    // Accepts both array and object for radar data
                                    let radarData = [];
                                    if (Array.isArray(analysisResult?.startupRadar)) {
                                      radarData = analysisResult.startupRadar;
                                    } else if (typeof analysisResult?.startupRadar === 'object' && analysisResult?.startupRadar !== null) {
                                      radarData = Object.entries(analysisResult.startupRadar).map(([key, value]) => ({ subject: key, A: typeof value === 'number' ? value : parseFloat(value) || 0, fullMark: 10 }));
                                    }
                                    if (radarData.length > 0) {
                                      return (
                                        <ChartContainer
                                          config={Object.fromEntries(radarData.map(d => [d.subject, { label: d.subject, color: '#943346' }]))}
                                          className="h-[300px]"
                                        >
                                          <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={radarData}>
                                              <PolarGrid />
                                              <PolarAngleAxis dataKey="subject" className="text-xs" />
                                              <PolarRadiusAxis angle={90} domain={[0, 10]} className="text-xs" />
                                              <Radar name="Score" dataKey="A" stroke="#943346" fill="#bc4376" fillOpacity={0.1} strokeWidth={2} />
                                              <ChartTooltip content={<ChartTooltipContent />} />
                                            </RadarChart>
                                          </ResponsiveContainer>
                                        </ChartContainer>
                                      );
                                    }
                                    return <div className="text-gray-400 text-sm">No radar analysis available.</div>;
                                  })()}
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>

                          {/* Audience Tab */}
                          <TabsContent value="audience" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <Card className="border-gray-200/40 shadow-lg bg-white/90">
                                <CardHeader>
                                  <CardTitle className="text-lg text-gray-900 flex items-center">
                                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                                    Target Audience Insights
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900">
                                      Demographics
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                      {analysisResult?.targetAudienceInsights ? (
                                        [
                                          { label: "Age Range", value: analysisResult.targetAudienceInsights.ageRange },
                                          { label: "Income Level", value: analysisResult.targetAudienceInsights.incomeLevel },
                                          { label: "Tech Savviness", value: analysisResult.targetAudienceInsights.techSavviness, badge: true },
                                          { label: "Education", value: analysisResult.targetAudienceInsights.educationLevel, badge: true },
                                        ].map((item) => (
                                          <div key={item.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">{item.label}</span>
                                            {item.badge ? (
                                              <Badge className="bg-green-100 text-green-800">{item.value}</Badge>
                                            ) : (
                                              <span className="font-medium">{item.value}</span>
                                            )}
                                          </div>
                                        ))
                                      ) : (
                                        <div className="text-gray-400 text-sm">No audience insights available.</div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Market Share Opportunity */}
                              <Card className="border-gray-200/40 shadow-lg bg-white/90">
                                <CardHeader>
                                  <CardTitle className="text-lg text-gray-900 flex items-center">
                                    <PieChartIcon className="h-5 w-5 mr-2 text-green-500" />
                                    Market Share Opportunity
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  {(() => {
                                    // Try to parse the marketShareOpportunity string into chart data
                                    let data = [];
                                    if (analysisResult?.marketShareOpportunity) {
                                      // Example expected: "Your Opportunity: 25% | Direct Competitors: 35% | Indirect Competitors: 25% | Untapped Market: 15%"
                                      const colorPalette = [
                                        '#000000', '#374151', '#6b7280', '#d1d5db', '#10b981', '#6366f1', '#f59e42', '#f43f5e'
                                      ];
                                      data = analysisResult.marketShareOpportunity.split('|').map((item, i) => {
                                        const match = item.match(/(.+?):\s*(\d+)%/);
                                        if (match) {
                                          return {
                                            name: match[1].trim(),
                                            value: parseInt(match[2], 10),
                                            color: colorPalette[i % colorPalette.length],
                                          };
                                        }
                                        return null;
                                      }).filter(Boolean);
                                    }
                                    if (data.length > 0) {
                                      return (
                                        <ChartContainer
                                          config={Object.fromEntries(data.map(d => [d.name, { label: d.name, color: d.color }]))}
                                          className="h-64"
                                        >
                                          <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                              <Pie
                                                data={data}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label={({ name, percent }) => `${name} (${Math.round(percent * 100)}%)`}
                                              >
                                                {data.map((entry, idx) => (
                                                  <Cell key={`cell-${idx}`} fill={entry.color} />
                                                ))}
                                              </Pie>
                                              <ChartTooltip content={<ChartTooltipContent />} />
                                            </PieChart>
                                          </ResponsiveContainer>
                                          <div className="flex flex-wrap justify-center gap-4 mt-4">
                                            {data.map((entry, idx) => (
                                              <span key={entry.name} className="flex items-center gap-2 text-xs">
                                                <span className="inline-block w-3 h-3 rounded-full" style={{ background: entry.color }}></span>
                                                {entry.name}
                                              </span>
                                            ))}
                                          </div>
                                        </ChartContainer>
                                      );
                                    }
                                    return <div className="text-gray-400 text-sm">No market share data.</div>;
                                  })()}
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>

                          {/* Competitors Tab */}
                          <TabsContent value="competitors" className="space-y-6">
                            <Card className="border-gray-200/40 shadow-lg bg-white/90">
                              <CardHeader>
                                <CardTitle className="text-lg text-gray-900 flex items-center">
                                  <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                                  Competitor Benchmarking
                                </CardTitle>
                                <CardDescription>
                                  Competitive landscape analysis with strength scores
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                {(() => {
                                  let competitors = [];
                                  if (analysisResult?.competitorBenchmarking?.graph) {
                                    // Try to parse: "Competitor A (7/10) | Competitor B (6/10) | ..."
                                    const parts = analysisResult.competitorBenchmarking.graph.split('|').map(s => s.trim()).filter(Boolean);
                                    competitors = parts.map(str => {
                                      const match = str.match(/(.+?)\s*\((\d+\/?\d*)\)/);
                                      if (match) {
                                        // Support both "7/10" and "7"
                                        let score = match[2].includes('/') ? (parseFloat(match[2].split('/')[0]) / parseFloat(match[2].split('/')[1] || 10)) * 10 : parseFloat(match[2]);
                                        return { name: match[1].trim(), score, rawScore: match[2].trim() };
                                      }
                                      return { name: str, score: 0, rawScore: '' };
                                    });
                                  }
                                  if (competitors.length > 0) {
                                    return (
                                      <>
                                        <ChartContainer
                                          config={Object.fromEntries(competitors.map((c, i) => [c.name, { label: c.name, color: `hsl(${(i * 60) % 360}, 60%, 40%)` }]))}
                                          className="h-64"
                                        >
                                          <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                              data={competitors}
                                              layout="vertical"
                                              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                                            >
                                              <XAxis type="number" domain={[0, 10]} className="text-xs" />
                                              <YAxis dataKey="name" type="category" className="text-xs" width={120} />
                                              <ChartTooltip content={<ChartTooltipContent />} />
                                              <Bar dataKey="score" radius={[8, 8, 8, 8]} fill="#6366f1">
                                                {competitors.map((entry, idx) => (
                                                  <Cell key={`cell-${idx}`} fill={`hsl(${(idx * 60) % 360}, 60%, 40%)`} />
                                                ))}
                                              </Bar>
                                            </BarChart>
                                          </ResponsiveContainer>
                                        </ChartContainer>
                                        {analysisResult?.competitorBenchmarking?.topCompetitors && (
                                          <div className="mt-8">
                                            <div className="font-semibold text-black mb-2">Top Competitors</div>
                                            <div className="flex flex-wrap gap-2">
                                              {analysisResult.competitorBenchmarking.topCompetitors.map((c, i) => (
                                                <span
                                                  key={i}
                                                  className="px-3 py-1 rounded-full bg-black text-white text-xs font-semibold shadow hover:bg-gray-900 transition"
                                                >
                                                  {c}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    );
                                  }
                                  return <div className="text-gray-400 text-sm">No competitor data available.</div>;
                                })()}
                              </CardContent>
                            </Card>
                          </TabsContent>

                          {/* Growth Tab */}
                          <TabsContent value="growth" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {analysisResult?.growthOpportunityProjection ? (
                                [
                                  { label: '1 Year', value: analysisResult.growthOpportunityProjection["1Year"] },
                                  { label: '3 Years', value: analysisResult.growthOpportunityProjection["3Years"] },
                                  { label: '5 Years', value: analysisResult.growthOpportunityProjection["5Years"] },
                                ].map((item, idx) => (
                                  <Card key={item.label} className="border-gray-200/40 shadow-lg bg-white/90 flex flex-col justify-between">
                                    <CardHeader>
                                      <CardTitle className="text-lg text-gray-900 flex items-center">
                                        <LineChartIcon className="h-5 w-5 mr-2 text-green-500" />
                                        {item.label} Projection
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="text-gray-700 text-base min-h-[80px] flex items-center">{item.value}</div>
                                    </CardContent>
                                  </Card>
                                ))
                              ) : (
                                <Card className="border-gray-200/40 shadow-lg bg-white/90">
                                  <CardContent>
                                    <div className="text-gray-400 text-sm">No growth projection data available.</div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </TabsContent>

                          {/* Improvements Tab */}
                          <TabsContent value="improvements" className="space-y-6">
                            <Card className="border-gray-200/40 shadow-lg bg-white/90">
                              <CardHeader className="pb-2">
                                <div className="text-center space-y-2">
                                  <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                                    <Rocket className="h-6 w-6 mr-2 text-blue-500" />
                                    Key Improvements & Recommendations
                                  </h3>
                                  <p className="text-gray-600">
                                    AI-powered actionable insights to enhance your
                                    startup's success potential
                                  </p>
                                </div>
                              </CardHeader>
                              <CardContent className="p-6 md:p-10">
                                <div className="grid gap-6">
                                  {Array.isArray(analysisResult?.keyRecommendations) && analysisResult.keyRecommendations.length > 0 ? (
                                    analysisResult.keyRecommendations.map((improvement, index) => (
                                      <ImprovementCard key={index} improvement={improvement} />
                                    ))
                                  ) : (
                                    <div className="text-gray-400 text-sm">No recommendations available.</div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
