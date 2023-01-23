const API_KEY = "";

export default async function requestAiResponse(message) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 50,
      temperature: 0,
    }),
  };
  const response = await fetch(
    "https://api.openai.com/v1/completions",
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}
