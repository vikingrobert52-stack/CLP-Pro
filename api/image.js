export default async function handler(req, res) {
  const prompt = req.query.prompt || 'cat';
  const API_KEY = "sk_E2cybCVFuQO6FDgIZMpHL4AeEcoxFdde";

  try {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;
    
    console.log('Calling Pollinations:', url);
    console.log('API Key:', API_KEY ? 'Present' : 'Missing');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': API_KEY,
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pollinations error:', errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const buffer = await response.arrayBuffer();
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
}
