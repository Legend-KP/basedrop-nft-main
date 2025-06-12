/// <reference types="node" />

function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD, 
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: {
      version: "1",
      image: `${URL}/basedrop-player.png`,
      buttons: [{
        label: "Mint NFT"
      }],
      post_url: `${URL}/api/frame`,
      aspect_ratio: "1:1"
    },
    app: {
      name: "BaseDrop NFT",
      description: "Exclusive BaseDrop NFT that unlocks perks in future games by Trenchverse",
      tags: ["nft", "gaming", "basedrop"],
    }
  });
}
