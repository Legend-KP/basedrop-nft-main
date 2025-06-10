import type { FrameNotificationDetails } from "@farcaster/frame-sdk";
import { redis } from "./redis";

const notificationServiceKey =
  process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME ?? "minikit";

function getUserNotificationDetailsKey(fid: number): string {
  return `${notificationServiceKey}:user:${fid}`;
}

export async function getUserNotificationDetails(
  fid: number,
): Promise<FrameNotificationDetails | null> {
  if (!redis) {
    return null;
  }

  return await redis.get<FrameNotificationDetails>(
    getUserNotificationDetailsKey(fid),
  );
}

interface NotificationDetails {
    fid?: number;
    appFid?: number;
    url?: string;
}

export async function setUserNotificationDetails(details: NotificationDetails) {
    try {
        // Store user notification details
        console.log('Setting notification details:', details);
        // Add your storage logic here
    } catch (error) {
        console.error('Error setting notification details:', error);
    }
}

export async function deleteUserNotificationDetails(fid: number) {
    try {
        // Delete user notification details
        console.log('Deleting notification details for fid:', fid);
        // Add your deletion logic here
    } catch (error) {
        console.error('Error deleting notification details:', error);
    }
}
