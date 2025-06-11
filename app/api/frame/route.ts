import { NextResponse } from "next/server";

export async function POST() {
  try {
    const URL = process.env.NEXT_PUBLIC_URL || 'https://basedrop-nft.vercel.app';

    return NextResponse.json({
      frames: {
        version: '1',
        image: "https://i.ibb.co/XZHdD4Dz/IMG-20250521-WA0005.png",
        buttons: [
          {
            label: "Mint NFT",
            action: "link",
            target: URL
          }
        ],
        title: "BaseDrop NFT",
        image_aspect_ratio: "1:1"
      }
    });
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 