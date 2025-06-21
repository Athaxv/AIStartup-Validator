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

  const handleSubmit = async () => {
    // Save the form data
    console.log("Saving form data:", formData);

    setIsLoading(true);
    // Simulate API call
    const res = await fetch("/api/analyze-startup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    console.log(result);
    setHasResults(true);
    setIsLoading(false);
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
            <RainbowButton className="bg-black" onClick={handleNewIdea}>
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
                          className={`border-gray-300/50 bg-white/70 transition-all duration-300 ${
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
                          className={`border-gray-300/50 bg-white/70 transition-all duration-300 ${
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
                        <SelectTrigger className="border-gray-300/50 bg-white/70 hover:border-gray-400 hover:shadow-md transition-all duration-300">
                          <SelectValue placeholder="Select revenue model" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 border-gray-200/50">
                          <SelectItem
                            value="subscription"
                            className="hover:bg-gray-50/80 transition-colors duration-200"
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
                          className={`border-gray-300/50 bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
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
                          className={`border-gray-300/50 bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
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
                          className={`border-gray-300/50 bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
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
                        <SelectTrigger className="border-gray-300/50 bg-white/70 hover:border-gray-400 hover:shadow-md transition-all duration-300">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 border-gray-200/50">
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
                          className={`border-gray-300/50 bg-white/70 min-h-[100px] transition-all duration-300 resize-none ${
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
          <div className="flex-1 bg-gradient-to-b from-white to-gray-50/30">
            <ScrollArea className="h-full">
              <div className="p-4 sm:p-6 md:p-8">
                {isLoading ? (
                  <SkeletonLoader />
                ) : !hasResults ? (
                  <div className="flex items-center justify-center h-full min-h-[500px]">
                    <div className="text-center space-y-8 max-w-lg">
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-3xl flex items-center justify-center shadow-2xl">
                          <BarChart3 className="h-16 w-16 text-gray-400" />
                        </div>
                        {/* <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div> */}
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
  Ready for AI Analysis
</h3>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                          Complete the startup details on the left panel and
                          click "Validate Startup Idea" to receive comprehensive
                          AI-powered insights, competitive analysis, and
                          actionable recommendations.
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
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
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      <div className="space-y-3">
                        <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                          {formData.startupName || "Your Startup"}
                          <CheckCircle2 className="h-8 w-8 ml-4 text-green-600" />
                        </h2>
                        <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
                          {formData.oneLiner}
                        </p>
                        <div className="flex items-center space-x-3 mt-4">
                          <Badge className="bg-gray-900/10 text-gray-900 hover:bg-gray-900/20 transition-colors duration-300 px-3 py-1">
                            {formData.revenueModel || "Revenue Model"}
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
                    <Card className="w-full max-w-full border-gray-200/40 shadow-xl bg-gradient-to-br from-white via-gray-50/30 to-white">
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
                            84
                          </div>
                          <div className="flex-1 space-y-4">
                            <Progress value={84} className="h-6 bg-gray-100" />
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
                            Strong Potential
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
                              <div  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {[
                                  {
                                    label: "Problem Severity",
                                    value: 88,
                                    color: "red",
                                    status: "High",
                                    desc: "Critical market need identified",
                                  },
                                  {
                                    label: "Solution Uniqueness",
                                    value: 68,
                                    color: "yellow",
                                    status: "Medium",
                                    desc: "Some differentiation present",
                                  },
                                  {
                                    label: "Market Timing",
                                    value: 94,
                                    color: "green",
                                    status: "Excellent",
                                    desc: "Perfect market conditions",
                                  },
                                  {
                                    label: "Scalability",
                                    value: 82,
                                    color: "blue",
                                    status: "High",
                                    desc: "Strong growth potential",
                                  },
                                ].map((item) => (
                                  <div key={item.label} className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-gray-600 font-medium">
                                        {item.label}
                                      </span>
                                      <Badge
                                        className={`${
                                          item.color === "red"
                                            ? "bg-red-100 text-red-800"
                                            : item.color === "yellow"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : item.color === "green"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-blue-100 text-blue-800"
                                        }`}
                                      >
                                        {item.status}
                                      </Badge>
                                    </div>
                                    <Progress
                                      value={item.value}
                                      className={`h-3 ${
                                        item.color === "red"
                                          ? "bg-red-50"
                                          : item.color === "yellow"
                                          ? "bg-yellow-50"
                                          : item.color === "green"
                                          ? "bg-green-50"
                                          : "bg-blue-50"
                                      }`}
                                    />
                                    <div className="text-xs text-gray-500">
                                      {item.desc}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

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
                            <CardContent className={"-translate-x-20"}>
                              <ChartContainer
                                config={{
                                  A: {
                                    label: "Score",
                                    color: "#8d354a",
                                  },
                                }}
                                className="h-[300px]"
                              >
                                <ResponsiveContainer width="100%" height="100%">
                                  <RadarChart data={mockRadarData}>
                                    <PolarGrid />
                                    <PolarAngleAxis
                                      dataKey="subject"
                                      className="text-xs"
                                    />
                                    <PolarRadiusAxis
                                      angle={90}
                                      domain={[0, 100]}
                                      className="text-xs"
                                    />
                                    <Radar
                                      name="Score"
                                      dataKey="A"
                                      stroke="#943346"
                                      fill="#bc4376"
                                      fillOpacity={0.1}
                                      strokeWidth={2}
                                    />
                                    <ChartTooltip
                                      content={<ChartTooltipContent />}
                                    />
                                  </RadarChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

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
                                  {[
                                    {
                                      label: "Age Range",
                                      value: "25-45 years",
                                    },
                                    {
                                      label: "Income Level",
                                      value: "$50K-$150K",
                                    },
                                    {
                                      label: "Tech Savviness",
                                      value: "High",
                                      badge: true,
                                    },
                                    {
                                      label: "Education",
                                      value: "College+",
                                      badge: true,
                                    },
                                  ].map((item) => (
                                    <div
                                      key={item.label}
                                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                    >
                                      <span className="text-gray-600">
                                        {item.label}
                                      </span>
                                      {item.badge ? (
                                        <Badge className="bg-green-100 text-green-800">
                                          {item.value}
                                        </Badge>
                                      ) : (
                                        <span className="font-medium">
                                          {item.value}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-gray-200/40 shadow-lg bg-white/90">
                            <CardHeader>
                              <CardTitle className="text-lg text-gray-900 flex items-center">
                                <PieChartIcon className="h-5 w-5 mr-2 text-green-500" />
                                Market Share Opportunity
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ChartContainer
                                config={{
                                  value: {
                                    label: "Market Share",
                                    color: "#a51f1f",
                                  },
                                }}
                                className="h-[300px]"
                              >
                                <ResponsiveContainer
                                  className={"-translate-x-20"}
                                  width="100%"
                                  height="100%"
                                >
                                  <PieChart>
                                    <Pie
                                      data={mockMarketShareData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={50}
                                      outerRadius={100}
                                      paddingAngle={2}
                                      dataKey="value"
                                    >
                                      {mockMarketShareData.map(
                                        (entry, index) => (
                                          <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                          />
                                        )
                                      )}
                                    </Pie>
                                    <ChartTooltip
                                      content={<ChartTooltipContent />}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="competitors" className="space-y-6">
                        <Card className="border-gray-200/40 shadow-lg bg-white/90">
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-900 flex items-center">
                              <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                              Competitor Benchmarking
                            </CardTitle>
                            <CardDescription>
                              Competitive landscape analysis with strength
                              scores
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                score: {
                                  label: "Competitive Strength",
                                  color: "#000000",
                                },
                              }}
                              className="h-[300px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={mockCompetitorData}
                                  margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <XAxis dataKey="name" className="text-xs" />
                                  <YAxis className="text-xs" />
                                  <ChartTooltip
                                    content={<ChartTooltipContent />}
                                  />
                                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                                    {mockCompetitorData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                      />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="growth" className="space-y-6">
                        <Card className="border-gray-200/40 shadow-lg bg-white/90">
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-900 flex items-center">
                              <LineChartIcon className="h-5 w-5 mr-2 text-green-500" />
                              Growth Opportunity Projection
                            </CardTitle>
                            <CardDescription>
                              6-month market opportunity and growth trends
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                opportunity: {
                                  label: "Growth Opportunity",
                                  color: "#c81e1e",
                                },
                                market: {
                                  label: "Market Trend",
                                  color: "#c91f85",
                                },
                                projection: {
                                  label: "AI Projection",
                                  color: "#d92ecb",
                                },
                              }}
                              className="h-[300px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                  data={mockGrowthData}
                                  margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <XAxis dataKey="month" className="text-xs" />
                                  <YAxis className="text-xs" />
                                  <ChartTooltip
                                    content={<ChartTooltipContent />}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="opportunity"
                                    stroke="#000000"
                                    strokeWidth={3}
                                    dot={{
                                      fill: "#000000",
                                      strokeWidth: 2,
                                      r: 5,
                                    }}
                                    activeDot={{
                                      r: 8,
                                      stroke: "#000000",
                                      strokeWidth: 2,
                                    }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="market"
                                    stroke="#6b7280"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{
                                      fill: "#6b7280",
                                      strokeWidth: 2,
                                      r: 4,
                                    }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="projection"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    strokeDasharray="3 3"
                                    dot={{
                                      fill: "#3b82f6",
                                      strokeWidth: 2,
                                      r: 4,
                                    }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="improvements" className="space-y-6">
                        <div className="space-y-6">
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

                          <div className="grid gap-4">
                            {mockImprovements.map((improvement, index) => (
                              <Card
                                key={index}
                                className="border-gray-200/40 shadow-lg bg-white/90"
                              >
                                <CardHeader>
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-3">
                                        <Badge
                                          className={`${getPriorityColor(
                                            improvement.priority
                                          )} font-medium`}
                                        >
                                          {improvement.priority} Priority
                                        </Badge>
                                        <span className="text-sm text-gray-500 font-medium">
                                          {improvement.category}
                                        </span>
                                      </div>
                                      <CardTitle className="text-lg text-gray-900">
                                        {improvement.title}
                                      </CardTitle>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {improvement.priority === "High" && (
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                      )}
                                      {improvement.priority === "Medium" && (
                                        <Award className="h-5 w-5 text-yellow-500" />
                                      )}
                                      {improvement.priority === "Low" && (
                                        <Shield className="h-5 w-5 text-green-500" />
                                      )}
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  <p className="text-gray-600 leading-relaxed">
                                    {improvement.description}
                                  </p>

                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 flex items-center">
                                      <Brain className="h-4 w-4 mr-2 text-blue-500" />
                                      Action Items
                                    </h4>
                                    <ul className="space-y-2">
                                      {improvement.actions.map(
                                        (action, actionIndex) => (
                                          <li
                                            key={actionIndex}
                                            className="flex items-start space-x-3 text-sm text-gray-600"
                                          >
                                            <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span>{action}</span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                    <div className="space-y-1">
                                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Expected Impact
                                      </div>
                                      <div className="text-sm font-medium text-green-600">
                                        {improvement.impact}
                                      </div>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Timeframe
                                      </div>
                                      <div className="text-sm font-medium text-blue-600">
                                        {improvement.timeframe}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          <Card className="border-gray-200/40 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                            <CardContent className="p-6">
                              <div className="text-center space-y-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <Sparkles className="h-6 w-6 text-blue-500" />
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    Next Steps
                                  </h4>
                                </div>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                  Focus on high-priority improvements first.
                                  These recommendations are based on AI analysis
                                  of successful startups in similar markets.
                                  Consider implementing these changes
                                  iteratively to maximize impact while managing
                                  resources effectively.
                                </p>
                                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                  <Rocket className="h-4 w-4 mr-2" />
                                  Download Action Plan
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
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
