import OpenAI from "openai";
import { knowledgeBase } from "../data/knowledge_base";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message } = req.body;
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

    return res.status(200).json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
}
