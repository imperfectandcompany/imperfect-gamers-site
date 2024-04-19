// @/app/auth/steam.server.ts
import { createHmac } from 'crypto'
import { getEnvVar } from '~/utils/general'

// Necessary for securing the application and authenticating users with Steam.
export function checkSignature(query: URLSearchParams): boolean {
    const signedParams = query.get('openid.signed')?.split(',')
    if (!signedParams) return false
    
    const sharedSecret = getEnvVar('STEAM_SHARED_SECRET')

    const signatureBaseString = signedParams
        .map(field => `${field}:${query.get(`openid.${field}`)}`)
        .join('\n')
    const hmac = createHmac('sha1', sharedSecret)
    hmac.update(signatureBaseString)
    const ourSignature = hmac.digest('base64')

    const theirSignature = query.get('openid.sig')
    return ourSignature === theirSignature
}