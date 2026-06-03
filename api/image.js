export default async function handler(req, res) {
  const prompt = req.query.prompt || 'cat';
  
  // Ta clé secrète est ici, personne ne peut la voir
  const API_KEY = "sk_E2cybCVFuQO6FDgIZMpHL4AeEcoxFdde";

  try {
    const response = await fetch(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error('API Error');

    const buffer = await response.arrayBuffer();
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
