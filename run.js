// Make sure to include these imports:
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

async function run() {
    const uploadResult = await fileManager.uploadFile(
        `./whiteboard-drawing.png`,
        {
            mimeType: "image/jpeg",
            displayName: "WhiteBoard Drawing",
        },
    );

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
        `
        You are AURA, an advanced AI assistant designed to assist with drawing and problem-solving tasks.
        - For complex calculations (like calculus, algebra, geometry), provide short, direct answers without step-by-step explanations.
        - If asked about your name, respond with "I am AURA, your AI assistant."
        - For logic gates, provide a simplified Boolean expression.
        - If asked about a DFA, respond with the language the DFA accepts.
        - If asked about someone famous, give their identity and why they are known.
        - For programming questions or algorithms (like DSA), offer brief and direct solutions.
        - Respond in a conversational and empathetic tone, aiming for clarity.
        - Understand and identify drawings and provide appropriate responses.

        If you have been uploaded an image with a whiteboard drawing, analyze the image and provide a response based on the content in the drawing.
        `,
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        },
    ]);

    // Output the result from the AI response
    console.log(result.response.text());
    return result.response.text();
}

run();
export default run;
