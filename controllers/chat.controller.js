const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration); 

module.exports.chat = (req,res,next) => {
  res.render('chat');
};

module.exports.message = (req,res,next) => {
  const response = openai.createCompletion({
    model: 'text-davinci-003',
    prompt: req.body.message,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256
  });

  response.then((data) => {
      const message = {message: data.data.choices[0].text};
      res.send(message);
  }).catch((err) => {
      res.send(err);
  });
};