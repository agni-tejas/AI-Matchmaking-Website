import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "pk-UWYZQDMaZrEibVVcDwoHZYTWGpVvkvZmqYHJEwShRlkBsZue",
  baseURL: "https://api.pawan.krd/cosmosrp/v1/chat/completions",
});

const completion = await openai.chat.completions.create({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "What is API",
    },
  ],
});

console.log(completion.choices[0].message);
