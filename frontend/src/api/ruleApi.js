import axios from 'axios';

const API_URL = 'http://localhost:3001/api/rules';

// Function to evaluate a rule
export const evaluateRule = async (ast, data) => {
  try {
    const response = await axios.post(`${API_URL}/evaluate`, { ast, data });
    return response.data;
  } catch (error) {
    console.error('Error evaluating rule:', error);
    throw error;
  }
};
