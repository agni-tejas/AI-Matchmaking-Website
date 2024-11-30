// src/services/gptService.js

import axios from "axios";

// Function to call GPT for calculating match percentage
export const getMatchPercentageFromGPT = async (currentUserTags, userTags) => {
  const prompt = `
    Compare the following two sets of tags and provide a similarity percentage (0 to 100):
    Current User's Tags: ${currentUserTags.join(", ")}
    Other User's Tags: ${userTags.join(", ")}

    Provide a number between 0 and 100 representing how similar these two tag sets are.
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-4", // or use another model based on availability and pricing
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.2, // Low temperature for more consistent results
      },
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`, // Replace YOUR_API_KEY with the provided key
          "Content-Type": "application/json",
        },
      }
    );

    // Parsing response and returning match percentage
    const matchPercentage = parseFloat(response.data.choices[0].text.trim());
    return matchPercentage;
  } catch (error) {
    console.error("Error fetching match percentage from GPT:", error);
    return 0; // If there is an error, default to 0
  }
};
