import { useCallback } from 'react'
import { useFetcherWithPromise } from '~/utils/general'

export const useCreateBasket = () => {
	const { submit } = useFetcherWithPromise()

	const createBasket = useCallback(async () => {
		console.log('[BasketManager.tsx] Creating basket...')
		try {
			const response = await submit(null, {
				method: 'post',
				action: '/store/create',
			})
			return response.basketId
		} catch (error) {
			console.error('Failed to create basket:', error)
			throw error
		}
	}, [submit])

	return createBasket
}

export const useAddPackageToBasket = () => {
	const { submit } = useFetcherWithPromise()

	const addPackageToBasket = useCallback(
		async (basketId: string) => {
			console.log('Adding package to basket...')
			try {
				const response = await submit(
					{ basketId },
					{ method: 'post', action: '/store/add' },
				)
				return response.packages
			} catch (error) {
				console.error('Failed to add package:', error)
				throw error
			}
		},
		[submit],
	)

	return addPackageToBasket
}
