import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import OpenAI from "openai";
import { knowledgeBase } from "./src/data/knowledge_base.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Log the API key (first 5 chars) for debugging
console.log(
  "API Key starts with:",
  process.env.OPENAI_API_KEY?.substring(0, 5)
);

// Function to convert knowledge base to a string format
const formatKnowledgeBase = () => {
  const sections = [];

  // Personal Info
  sections.push(`About Mohit Rai:
- Role: ${knowledgeBase.personal.role}
- Location: ${knowledgeBase.personal.location}
- Email: ${knowledgeBase.personal.email}
- Certifications: ${knowledgeBase.personal.certifications.join(", ")}`);

  // Skills
  sections.push(`Skills:
Frontend: ${knowledgeBase.skills.frontend.join(", ")}
Cloud: ${knowledgeBase.skills.cloud.join(", ")}
Testing: ${knowledgeBase.skills.testing.join(", ")}
Tools: ${knowledgeBase.skills.tools.join(", ")}`);

  // Experience
  sections.push(`Experience:
${knowledgeBase.experience
  .map(
    (exp) => `
${exp.role}:
${exp.description}
Key Highlights:
${exp.highlights.map((h) => `- ${h}`).join("\n")}`
  )
  .join("\n")}`);

  // FAQs
  sections.push(`Common Questions:
${knowledgeBase.faqs
  .map(
    (faq) => `
Q: ${faq.question}
A: ${faq.answer}`
  )
  .join("\n")}`);

  return sections.join("\n\n");
};

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    console.log("Received message:", message);
    console.log(
      "Using API Key:",
      process.env.OPENAI_API_KEY.substring(0, 5) + "..."
    );

    const knowledgeBaseContent = formatKnowledgeBase();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Mohit's AI assistant for his portfolio website. Use ONLY the following information about Mohit to answer questions. If you don't find the specific information in this knowledge base, say that you don't have that information.

${knowledgeBaseContent}

Instructions:
1. Be friendly and professional
2. Keep responses concise but informative
3. Only use information from the provided knowledge base
4. If asked about something not in the knowledge base, politely say you don't have that specific information
5. For technical questions, refer to the skills and experience sections`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    res.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
});

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
