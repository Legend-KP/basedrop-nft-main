import {
  setUserNotificationDetails,
  deleteUserNotificationDetails,
} from "../../lib/notification";
import { sendFrameNotification } from "../../lib/notification-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Handle webhook payload
    if (body.untrustedData?.buttonIndex === 1) {
      // Example: Store notification details
      await setUserNotificationDetails({
        fid: body.untrustedData?.fid,
        appFid: body.untrustedData?.appFid,
      });
      
      // Send notification
      await sendFrameNotification("Action completed successfully!");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
