import axios from "axios";
import { OPENAI_API_KEY } from "@env";
const apiEndpoint = "https://api.openai.com/v1/chat/completions";

export const getExplanation = async (
  correctSentence,
  wrongSentence,
  correctWord,
  wrongWord
) => {
  const prompt = `
Given the following sentence with only one difference between two words that are near synonyms, explain why the word in the first sentence fits the sentence while the word in the second sentence does not fit.
${correctSentence}
${wrongSentence}
The correct word is ${correctWord} and the incorrect word is ${wrongWord}
Write the explanation as follows.
Make it very short.
\n${correctWord} fits: <short-explanation>
\n${wrongWord} doesn’t: <short-explanation>
`;

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to fetch explanation from OpenAI:", error);
    return "Sorry, I couldn't retrieve an explanation at this time.";
  }
};
