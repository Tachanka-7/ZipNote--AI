import { PizzaIcon } from "lucide-react";
import SummaryViewer from "../summaries/summary-viewer";
import { MotionDiv, MotionH3 } from "@/components/common/motion-wrapper";
import BgGradient from "@/components/common/bg-gradient";

const DEMO_SUMMARY = `
# Quick Overview
🌍 The Future is Remote: Work Trends in 2025

# 📄Document Details
• 📘 Type: Research Report
• 🎯 For: Business Leaders, HR Managers, and Remote Professionals

# ✨ Key Highlights
• 💼 68% of global companies now operate with hybrid or fully remote teams.
• 🧠 Remote workers report 22% higher job satisfaction than in-office peers.
• 🛠️ Automation tools and asynchronous workflows are driving efficiency.

# 🌟 Why It Matters
• 🌐 Remote work is redefining where, when, and how people work—giving companies access to global talent, lowering operational costs, and improving employee well-being. Those who adapt will thrive in this flexible-first era.

# 🔍 Main Points
• 📊 The shift to remote is driven by both employee demand and tech innovation
• 🚀 Companies that embrace remote tools report faster project completion rates
• 🏆 Businesses with remote-friendly policies attract and retain top talent

# 💡 Pro Tips
• 🧩 Invest in tools that support asynchronous communication (like Loom or Notion)
• 🧘 Encourage "virtual deep work hours" to boost focus across time zones
• 🌱 Create structured onboarding for remote hires to reduce churn

# 🧠 Key Terms to Know
• 🏠 Hybrid Work: A mix of in-office and remote work that offers flexibility
• ⏳ Async Communication: Messaging and collaboration that doesn’t require real-time response

# ✅ Bottom Line
• 🏠 Remote work is here to stay
• 🧘 Flexibility, autonomy, and digital fluency are the cornerstones of future-ready teams
• 🚀 Companies that adapt will unlock innovation, efficiency, and global reach

`
export default function DemoSection(){
    return <section className="relative">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                <BgGradient />
                </div>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs 
                border border-gray-500/20 mb-4">
                    <PizzaIcon className="w-6 h-6 text-rose-500"/>
                </div>
                <div className="text-center mb-16">
                    <MotionH3 
                        initial={{y:20, opacity: 0}}
                        whileInView={{y:0, opacity:1}} 
                        transition={{duration: 0.5, delay:0.2}}
                        className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
                        Watch how ZipNote AI{' '}
                        <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">Transforms this PDF </span>into an easy-to-read summary!
                    </MotionH3>
                </div>
                </div>
                <div className="flex justify-center items-center px-2 sm:px-4 lg:px-8">
                    <MotionDiv 
                        initial={{opacity:0}} 
                        whileInView={{opacity:1}}
                        transition={{duration:0.5}}
                        >
                        <div className="w-lg md:w-2xl">
                            <SummaryViewer className="h-[650px] w-full" summary={DEMO_SUMMARY}/>
                        </div>
                    </MotionDiv>
                </div>
        </div>
    </section>
}