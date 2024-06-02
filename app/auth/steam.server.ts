// app/auth/steam.server.ts

export async function directVerificationWithSteam(
	params: URLSearchParams,
): Promise<boolean> {
	const opEndpoint = params.get('openid.op_endpoint')
	if (!opEndpoint) {
		return false
	}

	params.set('openid.mode', 'check_authentication')
	const verificationResponse = await fetch(opEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: params,
	})

	if (!verificationResponse.ok) {
		console.error('Failed to post verification request to Steam.')
		return false
	}

	const responseText = await verificationResponse.text()
	return responseText.includes('is_valid:true')
}
