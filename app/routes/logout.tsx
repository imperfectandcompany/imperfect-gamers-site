// app/routes/logout.tsx
import { ActionFunctionArgs, json } from '@remix-run/node';
import { destroySession, getSession } from '~/auth/storage.server';

export async function action({
  request,
}: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  return json({ success: 'Logout successful' }, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
