import axios from "axios";
import handleError from "../backend/helpers/handleError.js";
const geminiResponse = async (userPrompt,userName) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL;
        const prompt =``
        const result = await axios.post(apiUrl, {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        })
        return result.data.candidates[0].content.parts[0].text;
    }
    catch (error) {
        handleError(error);
        return { error: "An error occurred while processing your request." };
    }
};
export default geminiResponse;