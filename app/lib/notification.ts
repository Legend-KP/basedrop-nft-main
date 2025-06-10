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