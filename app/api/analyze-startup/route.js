// app/api/analyze-startup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const body = await req.json();
    console.log("output", body);
  const {
    startupName,
    pitch,
    revenueModel,
    industry,
    stage,
    description,
    problem,
  } = body;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = `
You are a startup advisor and investor. Analyze the following startup idea and provide a detailed evaluation covering:

1. Idea originality and clarity
2. Problem-solution fit
3. Market potential in the mentioned industry
4. Business model feasibility based on the revenue model
5. Execution readiness based on the startup stage
6. Areas of improvement or risks

Startup Info:
- Name: ${startupName}
- Pitch: ${pitch}
- Revenue Model: ${revenueModel}
- Industry: ${industry}
- Current Stage: ${stage}
- Description: ${description}
- Problem Being Solved: ${problem}

Your response should be in **valid JSON** using the structure below:
\`\`\`json
{
  "Result": "Detailed analysis of the startup based on the provided inputs. It should cover strengths, weaknesses, and a verdict.",
  "keyImprovements": ["List of actionable improvements here", "Like refining the revenue model", "Improving clarity in pitch", "..."],
  "score": number from 0 to 100
}
\`\`\`
`;



  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ analysis: text, score: String });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}