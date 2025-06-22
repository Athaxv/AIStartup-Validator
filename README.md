# 🚀 Startup Idea Validator

> An intelligent validator for your next big startup idea — powered by AI.  
> Built with `Next.js`, `Prisma ORM`, `NeonDB`, `Gemini API`, and styled with `ShadCN`.

---

## 📌 Overview

**Startup Idea Validator** is a full-stack web application that helps entrepreneurs validate their startup ideas using AI. It analyzes your idea based on key startup parameters like pitch, market, revenue model, and more — returning a **detailed analysis**, **AI-powered score**, and **key improvements** to enhance your pitch.

---

## ⚙️ Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | Next.js + ShadCN UI            |
| Backend        | API Routes (Next.js)           |
| ORM            | Prisma ORM                     |
| Database       | NeonDB                         |
| AI Integration | Gemini API (by Google)         |
| Styling        | Tailwind CSS + ShadCN          |

---

## 🧠 Features

- ✅ **Form-driven Input**: Collects startup name, pitch, model, market, and pain points.
- 🎯 **AI-Powered Evaluation**: Sends your idea to Gemini API and returns:
  - 🔍 In-depth analysis
  - 📈 AI score (0–100)
  - 🔧 Tailored improvement suggestions
- 💡 **Responsive Design** with clean animations and beautiful UI using `ShadCN`.

---

## 🏗️ Project Structure

/app
/api/analyze-startup.ts # API route for Gemini processing
/components/ # Reusable UI components (ShadCN)
/lib/db.ts # Prisma + NeonDB connection
/pages # Page components
/styles # Tailwind styles
prisma/schema.prisma # DB schema


---

## 🔐 Environment Variables

Create a `.env` file in the root and add the following:

```env
DATABASE_URL="your-neondb-url"
GEMINI_API_KEY="your-google-gemini-api-key"


git clone https://github.com/yourusername/startup-idea-validator.git
cd startup-idea-validator
npm install

# Setup DB
npx prisma generate
npx prisma migrate dev

# Run locally
npm run dev

