"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LineShadowText } from "./magicui/line-shadow-text";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const formSchema = z.object({
  startupName: z.string().min(2, { message: "Startup name must be at least 2 characters." }),
  pitch: z.string().min(5, { message: "Pitch must be at least 5 characters." }),
  revenueModel: z.string().min(1, { message: "Select a revenue model." }),
  industry: z.string().min(1, { message: "Select an industry." }),
  stage: z.string().min(1, { message: "Select a stage." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  problem: z.string().min(10, { message: "Problem must be at least 10 characters." }),
});

function ResumeForm() {
  const theme = useTheme();
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false);
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startupName: "",
      pitch: "",
      revenueModel: "",
      industry: "",
      stage: "",
      description: "",
      problem: "",
    },
  });
   const [dialogOpen, setDialogOpen] = useState(false);
  const [aiResult, setAIResult] = useState(null);


const onSubmit = async (values) => {
  setLoading(true);
  try {
    const res = await fetch("/api/analyze-startup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    // Clean and parse the Gemini output
    // const cleaned = data.analysis
    //   .replace(/```json\n?/, "")
    //   .replace(/```/, "")
    //   .trim();

    console.log("parsed", data)
    if (data?.analysis && typeof data.score === "number") {
  setAIResult({
    Result: data.analysis,
    score: data.score,
    keyImprovements: data.keyImprovements || [],
  });
  setDialogOpen(true);
} else {
  console.error("Gemini returned invalid structure:", data);
}
  } catch (err) {
    console.error("API error:", err);
  } finally {
    setLoading(false); 
  }
};



  return (
    <div className="p-6 sm:p-10 flex flex-col justify-center items-center w-full min-h-screen">
      <h1 className="text-balance text-3xl font-sans -translate-y-7 font-semibold leading-none tracking-tighter sm:text-6xl md:text-6xl lg:text-8xl text-center">
        <LineShadowText className="italic" shadowColor={shadowColor}>
          StartupIdea
        </LineShadowText>
      </h1>
      <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl">
          <FormField
            control={form.control}
            name="startupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Shadcn" className="transition-all focus:animate-pulse hover:shadow-md" />
                </FormControl>
                <FormDescription>Drop your creative name for your startup</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pitch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One Line Pitch</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. AI to automate marketing" className="transition-all focus:animate-pulse hover:shadow-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="revenueModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>$ Revenue Model</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full transition-all hover:shadow-md focus:animate-pulse">
                      <SelectValue placeholder="Select revenue model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscription">Subscription/SaaS</SelectItem>
                      <SelectItem value="one-time">One-time Purchase</SelectItem>
                      <SelectItem value="freemium">Freemium</SelectItem>
                      <SelectItem value="marketplace">Marketplace Commission</SelectItem>
                      <SelectItem value="ads">Advertising</SelectItem>
                      <SelectItem value="licensing">Licensing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full transition-all hover:shadow-md focus:animate-pulse">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Current Stage</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full transition-all hover:shadow-md focus:animate-pulse">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="early">Early Stage</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idea Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Tell us about your startup..." className="transition-all focus:animate-pulse hover:shadow-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What Problem Are You Solving?</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Describe the pain point you're addressing..." className="transition-all focus:animate-pulse hover:shadow-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
  type="submit"
  className="w-full transition-transform hover:scale-[1.02]"
  disabled={loading}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
        ></path>
      </svg>
      Submitting...
    </div>
  ) : (
    "Submit"
  )}
</Button>

        </form>
      </Form>
<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="bg-white dark:bg-neutral-900 text-black dark:text-white border border-gray-200 dark:border-neutral-700 shadow-xl rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden px-6 py-5">
    <DialogHeader className="sticky top-0 bg-white dark:bg-neutral-900 z-10 pb-4 border-b border-neutral-200 dark:border-neutral-700">
      <DialogTitle className="text-2xl font-bold tracking-tight">
        🚀 Startup Validation Report
      </DialogTitle>
      <DialogDescription className="text-md font-medium text-neutral-700 dark:text-neutral-300">
        AI Potential Score:{" "}
        <span
          className={`ml-2 text-lg font-bold ${
            aiResult?.score > 80
              ? "text-green-500"
              : aiResult?.score > 50
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {aiResult?.score ?? "--"}/100
        </span>
      </DialogDescription>
    </DialogHeader>

    {/* Scrollable Content */}
    <div className="overflow-y-auto max-h-[calc(80vh-130px)] pr-2 mt-4">
      {/* Analysis Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2 border-b border-neutral-300 dark:border-neutral-600 pb-1">
          📊 Detailed Analysis
        </h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
          {aiResult?.Result || "No analysis available."}
        </p>
      </div>

      {/* Key Improvements Section */}
      {aiResult?.keyImprovements?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 border-b border-neutral-300 dark:border-neutral-600 pb-1">
            🔧 Key Improvements
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-neutral-700 dark:text-neutral-300">
            {aiResult.keyImprovements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>


    </div>
  );
}

export default ResumeForm;
