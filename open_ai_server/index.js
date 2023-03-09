import express from 'express';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = 7777;
app.use(express.json());
app.use(express.static('webSite'));

dotenv.config();  // Reads env variables from .env

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config)

app.post('/api/ask', async (req, res) => {
  const body = req.body;
  console.log(body);
  const responseFromOpenAI = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    //prompt: body.prompt,
    messages: [{ "role": "user", "content": body.question }],
    temperature: 0.9,
    // max_tokens: 100,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    // stop: ['\n'],
  });
  if (responseFromOpenAI?.data?.choices?.length > 1)
    console.log("Extra answers!", responseFromOpenAI?.data?.choices)
  const answer = responseFromOpenAI?.data?.choices[0]?.message?.content;
  if (!answer) {
    throw "RAP: Should prolly respond with a 400 or 500 series"
  }

  res.status(200).send(JSON.stringify(answer))
})
app.listen(port, () => console.log(`listening on port ${port}`));