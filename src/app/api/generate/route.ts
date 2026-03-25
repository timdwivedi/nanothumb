import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const NANO_BANANA_KEY = process.env.NANO_BANANA_API_KEY;
  if (!NANO_BANANA_KEY) {
    return NextResponse.json({ error: "Server missing Nano Banana API Key." }, { status: 500 });
  }

  const body = await req.json();
  const { prompt, inspirationUrl, faceImages } = body;

  let options: string[] = [];
  try {
    const parseDataUrl = (dataUrl: string) => {
      const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (!matches) return null;
      return { mimeType: matches[1], data: matches[2] };
    };

    const headshot = faceImages && faceImages.length > 0 ? parseDataUrl(faceImages[0]) : null;
    const inspiration = inspirationUrl ? parseDataUrl(inspirationUrl) : null;

    const parts: any[] = [];
    if (inspiration) {
      parts.push({ text: "Here is the inspiration thumbnail image:" });
      parts.push({ inlineData: inspiration });
    }
    if (headshot) {
      parts.push({ text: "Here is the headshot to swap in:" });
      parts.push({ inlineData: headshot });
    }

    const systemConstraint = `
CRITICAL CONSTRAINTS:
1. DO NOT change the placement, scale, or boundaries of the character. They must appear in the exact same spatial coordinates as the person in the inspiration image.
2. DO NOT change the font size, font family, font color, or text placement. When altering text, the new text must perfectly match the typography style and exact coordinates of the original text.
3. The image MUST output exactly in a 16:9 aspect ratio (1920x1080).
4. Strictly clone the background without adding extra shapes, borders, or colors.

USER PROMPT MODIFICATIONS: ${prompt}`;

    parts.push({ text: `Task: Generate a new YouTube thumbnail based strictly on the layout, background, and aesthetic of the inspiration image.\n\n${systemConstraint}` });

    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/nano-banana-pro-preview:generateContent?key=${NANO_BANANA_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] })
    });

    if (!aiResponse.ok) {
      console.error("Nano Banana API Error", await aiResponse.text());
      return NextResponse.json({ error: "Nano Banana API failed to generate." }, { status: 500 });
    }

    const data = await aiResponse.json();
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData) {
          options.push(`data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`);
        }
      }
    }

    if (options.length === 1) {
      options = [options[0], options[0], options[0]];
    } else if (options.length === 0) {
      options = ["/thumbnail_mockup.png", "/demo_editor_2d.png", "/thumbnail_mockup.png"];
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed calling AI API" }, { status: 500 });
  }

  return NextResponse.json({ success: true, options });
}
