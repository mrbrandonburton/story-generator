const axios = require('axios');

   module.exports = async (req, res) => {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method Not Allowed' });
     }

     const { prompt } = req.body;

     try {
       const response = await axios.post('https://api.anthropic.com/v1/chat/completions', {
         model: "claude-3-sonnet-20240229",
         messages: [{ role: "user", content: prompt }],
         max_tokens: 1000
       }, {
         headers: {
           'Content-Type': 'application/json',
           'x-api-key': process.env.ANTHROPIC_API_KEY
         }
       });

       res.status(200).json(response.data);
     } catch (error) {
       console.error('Error:', error.response ? error.response.data : error.message);
       res.status(500).json({ error: 'An error occurred while generating the story.' });
     }
   };