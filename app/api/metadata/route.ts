import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    return NextResponse.json({
        name: "I'm a BaseDrop Player",
        description: "Exclusive BaseDrop NFT that unlocks perks in future games by Trenchverse",
        image: "https://i.ibb.co/XZHdD4Dz/IMG-20250521-WA0005.png",
        external_url: baseUrl,
        attributes: [
            {
                trait_type: "Collection",
                value: "BaseDrop"
            },
            {
                trait_type: "Type",
                value: "Player"
            }
        ]
    });
} 