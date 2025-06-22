"use client";
import React from "react";

function AnalysisForm() {
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
    <div className="flex-1 bg-gradient-to-b from-white to-gray-50/30">
      <ScrollArea className="h-full">
        <div className="p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <SkeletonLoader />
          ) : !hasResults || !apiResponse ? (
            <div className="flex items-center justify-center h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-lg px-4">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-3xl flex items-center justify-center shadow-2xl">
                    <BarChart3 className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-gray-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Ready for AI Analysis
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    Complete the startup details on the left panel and click
                    "Validate Startup Idea" to receive comprehensive AI-powered
                    insights, competitive analysis, and actionable
                    recommendations.
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-sm text-gray-500">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="font-medium">Powered by Advanced AI</span>
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center">
                    {formData.startupName || "Your Startup"}
                    <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ml-3 sm:ml-4 text-green-600" />
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                    {formData.oneLiner}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <Badge className="bg-gray-900/10 text-gray-900 hover:bg-gray-900/20 transition-colors duration-300 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                      {formData.revenueModel || "Revenue Model"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-green-300 text-green-700 bg-green-50 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      ✨ AI Analyzed
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-blue-300 text-blue-700 bg-blue-50 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      🚀 Ready to Launch
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
                >
                  <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Revalidate Idea
                </Button>
              </div>

              {/* Success Score */}
              <Card className="border-gray-200/40 shadow-xl bg-gradient-to-br from-white via-gray-50/30 to-white">
                <CardHeader className="pb-4 sm:pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900 flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                      Startup Success Score
                    </CardTitle>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors duration-300" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white border-0 shadow-xl max-w-xs">
                        <p className="text-sm">
                          AI-calculated viability score based on market fit,
                          competition, and growth potential
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-8">
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent text-center sm:text-left">
                      {apiResponse.data.successScore}
                    </div>
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <Progress
                        value={apiResponse.data.successScore}
                        className="h-4 sm:h-5 lg:h-6 bg-gray-100"
                      />
                      <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center">
                          <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-red-500" />
                          Poor
                        </span>
                        <span className="flex items-center">
                          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                          Excellent
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={`bg-gradient-to-r ${getSuccessScoreColor(
                        apiResponse.data.successScore
                      )} text-white shadow-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base mx-auto sm:mx-0`}
                    >
                      {getSuccessScoreLabel(apiResponse.data.successScore)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Mobile-First Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4 sm:space-y-6"
              >
                {/* Mobile-Optimized Tab List */}
                <div className="relative">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-gray-100/80 p-1 sm:p-1.5 rounded-xl shadow-lg gap-1 h-auto">
                    {[
                      {
                        value: "market-fit",
                        label: "Market Fit",
                        shortLabel: "Market",
                        icon: Target,
                      },
                      {
                        value: "audience",
                        label: "Audience",
                        shortLabel: "Audience",
                        icon: Users,
                      },
                      {
                        value: "competitors",
                        label: "Competitors",
                        shortLabel: "Compete",
                        icon: BarChart3,
                      },
                      {
                        value: "growth",
                        label: "Growth",
                        shortLabel: "Growth",
                        icon: TrendingUp,
                      },
                      {
                        value: "improvements",
                        label: "Key Improvements",
                        shortLabel: "Improve",
                        icon: Rocket,
                      },
                    ].map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-2 h-auto min-h-[3rem] sm:min-h-[2.5rem]"
                      >
                        <tab.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="hidden sm:inline lg:hidden text-center leading-tight">
                          {tab.shortLabel}
                        </span>
                        <span className="hidden lg:inline text-center leading-tight">
                          {tab.label}
                        </span>
                        <span className="sm:hidden text-center leading-tight text-[10px]">
                          {tab.shortLabel}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Active Tab Indicator for Mobile */}
                  <div className="sm:hidden mt-2 text-center">
                    <span className="text-xs font-medium text-gray-600">
                      {activeTab === "market-fit" && "Market Fit Analysis"}
                      {activeTab === "audience" && "Target Audience Insights"}
                      {activeTab === "competitors" && "Competitor Analysis"}
                      {activeTab === "growth" && "Growth Projections"}
                      {activeTab === "improvements" && "Key Improvements"}
                    </span>
                  </div>
                </div>

                <TabsContent
                  value="market-fit"
                  className="space-y-4 sm:space-y-6 mt-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Market Fit Analysis Card */}
                    <Card className="border-gray-200/40 shadow-lg bg-white/90">
                      <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base sm:text-lg text-gray-900 flex items-center">
                            <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-500" />
                            Market Fit Analysis
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardExpansion("market-fit")}
                            className="lg:hidden h-8 w-8 p-0"
                          >
                            {expandedCard === "market-fit" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <CardDescription className="text-xs sm:text-sm">
                          AI assessment of how well your solution fits current
                          market needs
                        </CardDescription>
                      </CardHeader>
                      <CardContent
                        className={`space-y-4 sm:space-y-6 ${
                          expandedCard === "market-fit" || expandedCard === null
                            ? "block"
                            : "hidden lg:block"
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                          {[
                            {
                              label: "Problem Severity",
                              value: apiResponse.data.marketFit.problemSeverity,
                              color: "red",
                              status:
                                apiResponse.data.marketFit.problemSeverity >= 80
                                  ? "High"
                                  : apiResponse.data.marketFit
                                      .problemSeverity >= 60
                                  ? "Medium"
                                  : "Low",
                              desc: "Critical market need identified",
                            },
                            {
                              label: "Solution Uniqueness",
                              value:
                                apiResponse.data.marketFit.solutionUniqueness,
                              color: "yellow",
                              status:
                                apiResponse.data.marketFit.solutionUniqueness >=
                                80
                                  ? "High"
                                  : apiResponse.data.marketFit
                                      .solutionUniqueness >= 60
                                  ? "Medium"
                                  : "Low",
                              desc: "Differentiation from competitors",
                            },
                            {
                              label: "Market Timing",
                              value: apiResponse.data.marketFit.marketTiming,
                              color: "green",
                              status:
                                apiResponse.data.marketFit.marketTiming >= 80
                                  ? "Excellent"
                                  : apiResponse.data.marketFit.marketTiming >=
                                    60
                                  ? "Good"
                                  : "Poor",
                              desc: "Market readiness for solution",
                            },
                            {
                              label: "Scalability",
                              value: apiResponse.data.marketFit.scalability,
                              color: "blue",
                              status:
                                apiResponse.data.marketFit.scalability >= 80
                                  ? "High"
                                  : apiResponse.data.marketFit.scalability >= 60
                                  ? "Medium"
                                  : "Low",
                              desc: "Growth potential assessment",
                            },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="space-y-2 sm:space-y-3"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                  {item.label}
                                </span>
                                <Badge
                                  className={`text-xs ${
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
                                className={`h-2 sm:h-3 ${
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

                    {/* Radar Chart Card */}
                    <Card className="border-gray-200/40 shadow-lg bg-white/90">
                      <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base sm:text-lg text-gray-900 flex items-center">
                            <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-500" />
                            Startup Radar Analysis
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardExpansion("radar")}
                            className="lg:hidden h-8 w-8 p-0"
                          >
                            {expandedCard === "radar" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <CardDescription className="text-xs sm:text-sm">
                          Multi-dimensional assessment of your startup's
                          strengths
                        </CardDescription>
                      </CardHeader>
                      <CardContent
                        className={`${
                          expandedCard === "radar" || expandedCard === null
                            ? "block"
                            : "hidden lg:block"
                        }`}
                      >
                        <ChartContainer
                          config={{
                            score: {
                              label: "Score",
                              color: "#374151",
                            },
                          }}
                          className="h-48 sm:h-64 lg:h-[300px]"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={apiResponse.data.radarData}>
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
                                dataKey="score"
                                stroke="#374151"
                                fill="#374151"
                                fillOpacity={0.1}
                                strokeWidth={2}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent
                  value="audience"
                  className="space-y-4 sm:space-y-6 mt-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Demographics Card */}
                    <Card className="border-gray-200/40 shadow-lg bg-white/90">
                      <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base sm:text-lg text-gray-900 flex items-center">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                            Target Audience Insights
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardExpansion("demographics")}
                            className="lg:hidden h-8 w-8 p-0"
                          >
                            {expandedCard === "demographics" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent
                        className={`space-y-4 sm:space-y-6 ${
                          expandedCard === "demographics" ||
                          expandedCard === null
                            ? "block"
                            : "hidden lg:block"
                        }`}
                      >
                        <div className="space-y-3 sm:space-y-4">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            Demographics
                          </h4>
                          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            {apiResponse.data.audienceInsights.demographics.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg"
                                >
                                  <span className="text-gray-600">
                                    {item.label}
                                  </span>
                                  {item.badge ? (
                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                      {item.value}
                                    </Badge>
                                  ) : (
                                    <span className="font-medium">
                                      {item.value}
                                    </span>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Market Share Card */}
                    <Card className="border-gray-200/40 shadow-lg bg-white/90">
                      <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base sm:text-lg text-gray-900 flex items-center">
                            <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
                            Market Share Opportunity
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardExpansion("market-share")}
                            className="lg:hidden h-8 w-8 p-0"
                          >
                            {expandedCard === "market-share" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent
                        className={`${
                          expandedCard === "market-share" ||
                          expandedCard === null
                            ? "block"
                            : "hidden lg:block"
                        }`}
                      >
                        <ChartContainer
                          config={{
                            value: {
                              label: "Market Share",
                              color: "#000000",
                            },
                          }}
                          className="h-48 sm:h-64 lg:h-[300px]"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={
                                  apiResponse.data.audienceInsights.marketShare
                                }
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {apiResponse.data.audienceInsights.marketShare.map(
                                  (entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  )
                                )}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent
                  value="competitors"
                  className="space-y-4 sm:space-y-6 mt-6"
                >
                  <Card className="border-gray-200/40 shadow-lg bg-white/90">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base sm:text-lg text-gray-900 flex items-center">
                          <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-500" />
                          Competitor Benchmarking
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardExpansion("competitors")}
                          className="lg:hidden h-8 w-8 p-0"
                        >
                          {expandedCard === "competitors" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <CardDescription className="text-xs sm:text-sm">
                        Competitive landscape analysis with strength scores
                      </CardDescription>
                    </CardHeader>
                    <CardContent
                      className={`${
                        expandedCard === "competitors" || expandedCard === null
                          ? "block"
                          : "hidden lg:block"
                      }`}
                    >
                      <ChartContainer
                        config={{
                          score: {
                            label: "Competitive Strength",
                            color: "#000000",
                          },
                        }}
                        className="h-48 sm:h-64 lg:h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={apiResponse.data.competitors}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <XAxis dataKey="name" className="text-xs" />
                            <YAxis className="text-xs" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                              {apiResponse.data.competitors.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                )
                              )}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="growth"
                  className="space-y-4 sm:space-y-6 mt-6"
                >
                  <Card className="border-gray-200/40 shadow-lg bg-white/90">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base sm:text-lg text-gray-900 flex items-center">
                          <LineChartIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
                          Growth Opportunity Projection
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardExpansion("growth")}
                          className="lg:hidden h-8 w-8 p-0"
                        >
                          {expandedCard === "growth" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <CardDescription className="text-xs sm:text-sm">
                        6-month market opportunity and growth trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent
                      className={`${
                        expandedCard === "growth" || expandedCard === null
                          ? "block"
                          : "hidden lg:block"
                      }`}
                    >
                      <ChartContainer
                        config={{
                          opportunity: {
                            label: "Growth Opportunity",
                            color: "#000000",
                          },
                          market: {
                            label: "Market Trend",
                            color: "#6b7280",
                          },
                          projection: {
                            label: "AI Projection",
                            color: "#3b82f6",
                          },
                        }}
                        className="h-48 sm:h-64 lg:h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={apiResponse.data.growthData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <XAxis dataKey="month" className="text-xs" />
                            <YAxis className="text-xs" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="opportunity"
                              stroke="#000000"
                              strokeWidth={3}
                              dot={{ fill: "#000000", strokeWidth: 2, r: 5 }}
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
                              dot={{ fill: "#6b7280", strokeWidth: 2, r: 4 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="projection"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              strokeDasharray="3 3"
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="improvements"
                  className="space-y-4 sm:space-y-6 mt-6"
                >
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center justify-center">
                        <Rocket className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-500" />
                        Key Improvements & Recommendations
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        AI-powered actionable insights to enhance your startup's
                        success potential
                      </p>
                    </div>

                    <div className="grid gap-4 sm:gap-6">
                      {apiResponse.data.improvements.map(
                        (improvement, index) => (
                          <Card
                            key={index}
                            className="border-gray-200/40 shadow-lg bg-white/90"
                          >
                            <CardHeader className="pb-3 sm:pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="space-y-2 flex-1">
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <Badge
                                      className={`${getPriorityColor(
                                        improvement.priority
                                      )} font-medium text-xs`}
                                    >
                                      {improvement.priority} Priority
                                    </Badge>
                                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                                      {improvement.category}
                                    </span>
                                  </div>
                                  <CardTitle className="text-base sm:text-lg text-gray-900">
                                    {improvement.title}
                                  </CardTitle>
                                </div>
                                <div className="flex items-center justify-between sm:justify-start gap-2">
                                  {improvement.priority === "High" && (
                                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                  )}
                                  {improvement.priority === "Medium" && (
                                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                                  )}
                                  {improvement.priority === "Low" && (
                                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      toggleCardExpansion(
                                        `improvement-${index}`
                                      )
                                    }
                                    className="lg:hidden h-8 w-8 p-0"
                                  >
                                    {expandedCard === `improvement-${index}` ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent
                              className={`space-y-4 sm:space-y-6 ${
                                expandedCard === `improvement-${index}` ||
                                expandedCard === null
                                  ? "block"
                                  : "hidden lg:block"
                              }`}
                            >
                              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                {improvement.description}
                              </p>

                              <div className="space-y-3 sm:space-y-4">
                                <h4 className="font-semibold text-gray-900 flex items-center text-sm sm:text-base">
                                  <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-blue-500" />
                                  Action Items
                                </h4>
                                <ul className="space-y-1 sm:space-y-2">
                                  {improvement.actions.map(
                                    (action, actionIndex) => (
                                      <li
                                        key={actionIndex}
                                        className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600"
                                      >
                                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span>{action}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                                <div className="space-y-1">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Expected Impact
                                  </div>
                                  <div className="text-xs sm:text-sm font-medium text-green-600">
                                    {improvement.impact}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Timeframe
                                  </div>
                                  <div className="text-xs sm:text-sm font-medium text-blue-600">
                                    {improvement.timeframe}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>

                    <Card className="border-gray-200/40 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardContent className="p-4 sm:p-6">
                        <div className="text-center space-y-3 sm:space-y-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                              Next Steps
                            </h4>
                          </div>
                          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Focus on high-priority improvements first. These
                            recommendations are based on AI analysis of
                            successful startups in similar markets. Consider
                            implementing these changes iteratively to maximize
                            impact while managing resources effectively.
                          </p>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                            <Rocket className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
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
  );
}

export default AnalysisForm;
