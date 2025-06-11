import { NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  const URL = process.env.NEXT_PUBLIC_URL;

  return new Response(
    JSON.stringify({
      version: "vNext",
      image: "https://i.ibb.co/XZHdD4Dz/IMG-20250521-WA0005.png",
      buttons: [
        {
          label: "Mint NFT",
          action: "link",
          target: URL
        }
      ],
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
} 