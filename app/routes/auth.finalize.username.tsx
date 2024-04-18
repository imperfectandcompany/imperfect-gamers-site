import { json, ActionFunction } from '@remix-run/node'

export let action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const username = formData.get('username')
    // Here we would handle additional logic for user registration completion
    // Such as saving the username, and possibly assigning other user details,
    // For example adding roles, preferences, or other relevant data
    // Mock result of user update process
    const updateResult = await updateUserWithDetails(username as string);
    if (!updateResult.ok) {
        return json(
            { success: false, message: updateResult.message },
            { status: 400 },
        );
    }
    // We assume updateUserWithDetails returns a status and potentially a user object or token
    return json({
        success: true,
        message: 'User registration completed successfully.',
        userDetails: updateResult.userDetails,
    });
}

// Placeholder function simulating user update logic.
async function updateUserWithDetails(username: string) {
    try {
        // Simulating a check that the username is still available at the time of finalizing
        if (['user1', 'admin', 'sample'].includes(username.toLowerCase())) {
            return { ok: false, message: 'Username no longer available' };
        }

        // Update the user with the provided username
        // Assuming a successful update process in your data layer
        let updatedUserDetails = {
            username,
            updated_at: new Date().toISOString(),
            someOtherUserSetting: 'updated',
        };

        return { ok: true, userDetails: updatedUserDetails };
    } catch (error) {
        console.error('Failed to update user', error);
        return { ok: false, message: 'An error occurred during user update.' };
    }
}
