import { render, screen } from '@testing-library/react';
import { createRemixStub } from '@remix-run/testing';
import { json } from '@remix-run/node';
import { test, expect } from 'vitest';
import Store from '~/routes/store';

test('Join now button is visible', async () => {
  const App = createRemixStub([
    {
			id: 'routes/store',
			path: '/store',
      Component: Store,
      loader: () => json({
        isAuthenticated: false,
        isSteamLinked: false,
        isOnboarded: false,
        username: null,
        userToken: null,
        steamId: null,
        uid: null,
        email: null,
        basketId: null,
        packages: [],
        checkoutUrl: null,
      }),
    },
  ]);

  const routeUrl = '/store';  // Ensure this matches the intended test route
  await render(<App initialEntries={[routeUrl]} />, {
    wrapper: ({ children }) => <>{children}</>
  });

  // Wait for the button to be in the document.
  // Since it's a simple visibility check, `waitFor` might not be necessary unless the button is the result of an async operation.
  // If it's just rendered statically, `getByRole` would be enough... we have plans for dynamic rendering though.
  const button = await screen.findByRole('button', { name: 'Join Now' });
  expect(button).toBeInTheDocument();
});
