// ~/mocks/node.ts

import { http, HttpResponse } from 'msw'


export const handlers = [

    http.post('/login', async ({ request }) => {
            const newLogin = await request.json() as Record<string, any>;
    
            if (newLogin && newLogin.email === 'test@example.com' && newLogin.password === 'password') {
                return new HttpResponse(JSON.stringify({ success: 'Login successful' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else {
                return new HttpResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
        }),
]