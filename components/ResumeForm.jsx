"use client";
import React from "react";
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

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="p-6 sm:p-10 flex flex-col justify-center items-center w-full min-h-screen">
      <h1 className="text-balance text-3xl font-sans -translate-y-7 font-semibold leading-none tracking-tighter sm:text-6xl md:text-6xl lg:text-8xl text-center">
        <LineShadowText className="italic" shadowColor={shadowColor}>
          StartupIdea
        </LineShadowText>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl">
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
          <Button type="submit" className="w-full transition-transform hover:scale-[1.02]">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResumeForm;
