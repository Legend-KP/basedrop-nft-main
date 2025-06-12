export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

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
          aspect_ratio: "1:1",
          post_url: `${URL}/api/frame`
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Frame API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function GET() {
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 