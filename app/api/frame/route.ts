import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(_req: NextRequest) {
  const URL = process.env.NEXT_PUBLIC_URL;

  return new Response(
    JSON.stringify({
      frame: {
        version: "1",
        image: `${URL}/basedrop-player.png`,
        buttons: [{
          label: "Connect Wallet",
          action: "link",
          target: URL
        }],
        aspect_ratio: "1:1"
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function GET() {
  return new Response('Method not allowed', { status: 405 });
} 