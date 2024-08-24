const { Configuration, OpenAIApi } = require("openai");

import { EXPO_PUBLIC_OPENAI_API_KEY } from "@env";

const configuration = new Configuration({
  apiKey: EXPO_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getCompletion = async (prompt, model = "gpt-3.5-turbo") => {
  try {
    const messages = [{ role: "user", content: prompt }];
    const response = await openai.createChatCompletion({
      model,
      messages,
      temperature: 0,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating explanation:", error);
    throw error;
  }
};
