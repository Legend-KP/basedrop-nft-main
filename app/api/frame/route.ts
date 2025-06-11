import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    version: 'vNext',
    image: 'https://i.ibb.co/XZHdD4Dz/IMG-20250521-WA0005.png',
    buttons: [
      {
        label: 'Mint NFT',
        action: 'link',
        target: 'https://basedrop-nft.vercel.app'
      }
    ]
  });
} 