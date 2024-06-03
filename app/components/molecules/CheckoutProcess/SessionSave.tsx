import { useCallback } from 'react'
import { useFetcherWithPromise } from '~/utils/general'

export const useSaveStoreSession = () => {
	const { submit } = useFetcherWithPromise()

	const saveStoreSession = useCallback(
		async (data: {
			basket_id: string
			package_id: number
			checkout_url: string
		}) => {
			console.log('[SessionSave] Saving store session data...')
			try {
				const response = await submit(
					{ data },
					{ method: 'post', action: '/store/session/save' },
				)
				return response.packages
			} catch (error) {
				console.error('Failed to save session:', error)
				throw error
			}
		},
		[submit],
	)

	return saveStoreSession
}
