import React, { useState } from 'react';
import axios from 'axios';


const getAiResponse = async (prompt) => {
    try{
        const result = await axios.post(`${}`,{prompt},{withCredentials: true});
        if (result.status === 200) {
            return result.data.response;
        } else {
            throw new Error('Failed to fetch AI response');
        }
    }catch (error) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
};