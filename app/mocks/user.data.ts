// Define a fake databank of users
export const users = [
    {
      email: 'test@example.com',
      password: 'password123',
      userToken: 'fake-token-123',
      uid: 123,
      isOnboarded: true,
      steamVerified: true,
      steamId: 1234567890 // This user is Steam verified, so they have a Steam ID.
    },
    {
      email: 'user@example.com',
      password: 'securePassword',
      userToken: 'fake-token-456',
      uid: 456,
      isOnboarded: false,
      steamVerified: false,
      steamId: null // This user is not Steam verified, so their Steam ID is null.
    },
    {
      email: 'error@example.com',
      password: 'errorPass',
      userToken: 'error-token',
      uid: 789,
      isOnboarded: false,
      steamVerified: false,
      steamId: null // This user is not Steam verified, so their Steam ID is null.
    },
    {
      email: 'onboarded_nosteam@example.com',
      password: 'onboard123',
      userToken: 'onboarded-token',
      uid: 999,
      isOnboarded: true,
      steamVerified: false,
      steamId: null // This user is not Steam verified, so their Steam ID is null.
    }
  ];
  
