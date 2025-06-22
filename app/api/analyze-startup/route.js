// app/api/analyze-startup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { prisma } from "@/lib/prisma";
// import { prisma } from "@/lib/prisma";
// import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const body = await req.json();
  console.log("output", body);
  const {
  alternativesExist,
  biggestRisk,
  keyFeatures,
  oneLiner,
  problemSolved,
  revenueModel,
  startupName,
  targetAudience,
} = body;

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = `
  You are a world-class startup investor and a seasoned entrepreneur who has successfully built multiple multi-million dollar startups. Your job is to critically evaluate a startup idea and generate a professional-grade analysis for potential investors.

The user will provide the following details about a startup:

Startup Name: ${startupName}

One-liner Pitch: ${oneLiner}

Revenue Model: ${revenueModel}

Problem Solved: ${problemSolved}

Target Audience: ${targetAudience}

Key Features: ${keyFeatures}

Do Alternatives Exist?: ${alternativesExist}

Biggest Risk/Challenge: ${biggestRisk}

Analyze this startup idea as both an experienced investor and serial entrepreneur. Your analysis must be evidence-based, brutally honest, and strategic. Do not sugar-coat weak points. Think like you're risking real capital.

Provide a detailed breakdown with the following outputs:

{
  "startupName": "${startupName}",
  "successScore": "[0-100]",
  "marketFitAnalysis": {
    "problemSeverity": "[Low/Medium/High]",
    "solutionUniqueness": "[Low/Medium/High]",
    "marketTiming": "[Too Early/Perfect Timing/Late]",
    "scalability": "[Low/Moderate/High]"
  },
  "startupRadar": {
    "innovationScore": "[0-10]",
    "teamStrength": "[0-10]",
    "executionRisk": "[Low/Medium/High]",
    "fundingRequired": "$[Estimated in USD]",
    "burnRateRisk": "[Low/Medium/High]"
  },
  "targetAudienceInsights": {
    "ageRange": "[e.g., 18-30]",
    "incomeLevel": "[Low/Middle/High]",
    "techSavviness": "[Low/Medium/High]",
    "educationLevel": "[Basic/College/Postgrad/Professional]"
  },
  "marketShareOpportunity": "[e.g., Small niche (~1%), Emerging (~5-10%), Large (>20% potential)]",
  "competitorBenchmarking": {
    "graph": "[Text-based bar graph or JSON array of key competitors with ratings]",
    "topCompetitors": ["Competitor A", "Competitor B", "Competitor C"]
  },
  "growthOpportunityProjection": {
    "1Year": "[Description and expected metrics]",
    "3Years": "[Description and expected metrics]",
    "5Years": "[Description and expected metrics]"
  },
  "keyRecommendations": [
    {
      "actionItem": "Description of what to improve",
      "expectedImpact": "High/Medium/Low",
      "timeFrame": "e.g., 1-3 months"
    },
    {
      "actionItem": "Another improvement area",
      "expectedImpact": "High/Medium/Low",
      "timeFrame": "e.g., 3-6 months"
    }
  ]
}
Before analysis, validate the user input. If any section includes placeholder names (e.g., "dsffg", "asdf", "abc123", "gibberish text"), or clearly nonsensical or irrelevant words, mark the entire startup idea as invalid and assign:

"successScore": "0"

"reasonForRejection": "Invalid or placeholder inputs detected. Fields must contain meaningful and realistic startup data."

In such cases, skip the full analysis and just return the rejection message in JSON.

Keep the tone professional, sharp, and data-driven. Focus on ROI potential and practical execution risks. Assume the reader is a venture capitalist evaluating whether this idea deserves funding.
`

try {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("new_Result", text);
  // const cleaned = text.replace(/```json\n?/, "").replace(/```/, "").trim();
  // const parsed = JSON.parse(cleaned);
  // console.log(parsed)
  // console.log(parsed.Result);
  // console.log("Yhi", parsed.keyImprovements[1]) // ✅ Output: 20

 
  return NextResponse.json({ result: text });
} catch (error) {
  console.error("Gemini error:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
}


// prompt = `
//   You are a world-class startup investor and a seasoned entrepreneur who has successfully built multiple multi-million dollar startups. Your job is to critically evaluate a startup idea and generate a professional-grade analysis for potential investors.

// The user will provide the following details about a startup:

// Startup Name: ${startupName}

// One-liner Pitch: ${pitch}

// Revenue Model: ${revenueModel}

// Problem Solved: ${problem}

// Target Audience: ${targetAudience}

// Key Features: ${features}

// Do Alternatives Exist?: ${alternatives}

// Biggest Risk/Challenge: ${challenge}

// Analyze this startup idea as both an experienced investor and serial entrepreneur. Your analysis must be evidence-based, brutally honest, and strategic. Do not sugar-coat weak points. Think like you're risking real capital.

// Provide a detailed breakdown with the following outputs:

// {
//   "startupName": "${startupName}",
//   "successScore": "[0-100]",
//   "marketFitAnalysis": {
//     "problemSeverity": "[Low/Medium/High]",
//     "solutionUniqueness": "[Low/Medium/High]",
//     "marketTiming": "[Too Early/Perfect Timing/Late]",
//     "scalability": "[Low/Moderate/High]"
//   },
//   "startupRadar": {
//     "innovationScore": "[0-10]",
//     "teamStrength": "[0-10]",
//     "executionRisk": "[Low/Medium/High]",
//     "fundingRequired": "$[Estimated in USD]",
//     "burnRateRisk": "[Low/Medium/High]"
//   },
//   "targetAudienceInsights": {
//     "ageRange": "[e.g., 18-30]",
//     "incomeLevel": "[Low/Middle/High]",
//     "techSavviness": "[Low/Medium/High]",
//     "educationLevel": "[Basic/College/Postgrad/Professional]"
//   },
//   "marketShareOpportunity": "[e.g., Small niche (~1%), Emerging (~5-10%), Large (>20% potential)]",
//   "competitorBenchmarking": {
//     "graph": "[Text-based bar graph or JSON array of key competitors with ratings]",
//     "topCompetitors": ["Competitor A", "Competitor B", "Competitor C"]
//   },
//   "growthOpportunityProjection": {
//     "1Year": "[Description and expected metrics]",
//     "3Years": "[Description and expected metrics]",
//     "5Years": "[Description and expected metrics]"
//   },
//   "keyRecommendations": [
//     {
//       "actionItem": "Description of what to improve",
//       "expectedImpact": "High/Medium/Low",
//       "timeFrame": "e.g., 1-3 months"
//     },
//     {
//       "actionItem": "Another improvement area",
//       "expectedImpact": "High/Medium/Low",
//       "timeFrame": "e.g., 3-6 months"
//     }
//   ]
// }


// Keep the tone professional, sharp, and data-driven. Focus on ROI potential and practical execution risks. Assume the reader is a venture capitalist evaluating whether this idea deserves funding.
// `