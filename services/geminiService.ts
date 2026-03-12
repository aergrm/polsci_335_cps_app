
import { GoogleGenAI } from "@google/genai";
import { SCHEDULE, ASSIGNMENTS } from '../constants';

// Initialize API Key safely
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

const SYLLABUS_CONTEXT = `
You are a Teaching Assistant for POL SCI 335: Comparative Political Systems.
Instructor: Ahmet Ergurum.
Semester: Spring 2026.
Textbook: Patterns of Democracy by Arend Lijphart (2nd ed).

KEY THEORETICAL FRAMEWORK:
Lijphart distinguishes democracies based on two dimensions:
1. The Executives-Parties Dimension (Joint-Power):
   - Party System (Two-party vs Multiparty)
   - Cabinets (One-party bare majority vs Broad coalition)
   - Executive-Legislative Relations (Dominance vs Balance)
   - Electoral System (Majoritarian/Plurality vs Proportional Representation)
   - Interest Groups (Pluralism vs Corporatism)

2. The Federal-Unitary Dimension (Divided-Power):
   - Federalism (Unitary/Centralized vs Federal/Decentralized)
   - Legislature (Unicameral vs Strong Bicameral)
   - Constitution (Flexible/Unwritten vs Rigid/Written)
   - Judicial Review (None vs Strong)
   - Central Bank (Dependent vs Independent)

Assignments:
${JSON.stringify(ASSIGNMENTS)}

Schedule:
${JSON.stringify(SCHEDULE)}

STRICT AI POLICY (FROM SYLLABUS):
- The use of Generative AI is NOT allowed for assignment completion in part (generating ideas is okay) or in whole (submitting text).
- SUBMITTING DIRECT TEXT FROM AI IS ACADEMIC MISCONDUCT.
- Permitted: Brainstorming, outlining, research assistance, explaining concepts.
- PROHIBITED: Generating essay content, answering quiz questions directly, writing the analysis for the student.

Your Goal: Help the student understand these 10 specific variables and guide them in their Country Analysis Project.

If asked to write an essay, REFUSE and cite the syllabus policy. Offer to help outline or brainstorm instead.
`;

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  if (!apiKey || !ai) {
    return "API Key is missing. Please set the REACT_APP_GEMINI_API_KEY environment variable in Vercel.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a chat session
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYLLABUS_CONTEXT,
      },
      history: history // Pass previous history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the course database right now. Please try again later.";
  }
};

export const generateProjectOutline = async (country: string, interest: string) => {
  if (!apiKey || !ai) {
    return "API Key is missing. Please set the REACT_APP_GEMINI_API_KEY environment variable in Vercel.";
  }

  const prompt = `
    Create a detailed research project outline for a comparative politics paper on ${country}.
    The student is specifically interested in: "${interest}".
    
    The outline must follow this structure based on the syllabus project requirements:
    1. Introduction (Why this country? Historical/Political Context)
    2. Institutional Analysis (Apply Lijphart's framework: Exec-Leg, Electoral/Party System, Federalism, etc.)
    3. Economic Governance or Foreign Policy Implications (Choose one focus area)
    4. Overall Assessment (Westminster vs Consensus spectrum placement)
    5. Conclusion (Implications for democratic quality)
    
    Keep it academic, structured, and helpful for an undergraduate student.
    REMINDER: Do not write the paper. Provide an outline only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYLLABUS_CONTEXT,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate outline. Please try again.";
  }
};