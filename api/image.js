import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get('prompt') || 'cat';
  
  // Ta clé API secrète (protégée ici, invisible pour le public)
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
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur génération' }, { status: 500 });
  }
}
