import { createCookieSessionStorage, createCookie } from '@remix-run/node'
import { createTypedCookie } from 'remix-utils/typed-cookie'
import { z } from 'zod'

type SessionData = {
	uid?: number
	userToken?: string
	steamId?: string
	email?: string
	username?: string
	isPremium?: boolean // Track premium status
}

export const sessionStorage = createCookieSessionStorage<SessionData>({
	cookie: {
		name: '_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: ['n3wsecr3t', 'olds3cret'],
		secure: process.env.NODE_ENV === 'production',
	},
})

export const { getSession, commitSession, destroySession } = sessionStorage

const inBasketSchema = z.object({
	quantity: z.number(),
	price: z.number(),
	gift_username_id: z.string().nullable(),
	gift_username: z.string().nullable(),
})

const baseItemSchema = z.object({
	id: z.number(),
	name: z.string(),
})

const basket = baseItemSchema.extend({
	description: z.string(),
	in_basket: inBasketSchema,
	image: z.string().nullable(),
})

const storeCookieSchema = z
	.object({
		basketId: z.string().optional().nullable(),
		packages: z.array(basket).optional().nullable(),
		checkoutUrl: z.string().url().optional().nullable(),
	})
	.default({})
	.nullable()

export const storeCookie = createTypedCookie({
	cookie: createCookie('user-store', {
		path: '/',
		secrets: ['n3wsecr3t', 'olds3cret'],
		sameSite: 'strict',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
	}),
	schema: storeCookieSchema,
})
