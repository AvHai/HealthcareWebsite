import User from '../models/User.js';
import handleError from '../helper/handleError.js';
import handleSuccess from '../helper/handleSuccess.js';

export const getCurrentUser = async (req, res) => {
    try{
        const userId =req.userId;
        const user= await User.findById(userId).select('-password -__v');
        if(!user) {
            return handleError(res, 404, 'User not found');
        }
        return handleSuccess(res, 200, 'User retrieved successfully', user);
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        return handleError(res, 500, 'Internal server error');
    }
}


export const askAi = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password -__v');
        const userName = user.name;
        const { userPrompt } = req.body;
        if (!userPrompt) {
            return handleError(res, 400, 'User prompt is required');
        } 
        const aiJsonResponse = await geminiResponse(userPrompt, userName);
        if (!aiJsonResponse) {
            return handleError(res, 500, 'Failed to generate AI response');
        }
        const jsonMatch = aiJsonResponse.match(/```json\n([\s\S]*?)\n```/);
        if (!jsonMatch) {
            return handleError(res, 400, 'AI response does not contain valid JSON');
        }
        const aiResponse = JSON.parse(jsonMatch[0]);
        
        return handleSuccess(res, 200, 'AI response generated successfully', { response: aiResponse });
    }
    catch (error) {
        console.error('Error in askAi:', error);
        return handleError(res, 500, 'Internal server error');
    }
}