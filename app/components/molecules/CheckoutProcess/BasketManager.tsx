// components/molecules/CheckoutProcess/BasketManager.tsx

//In this implementation, the BasketManager component handles the creation of a basket if it doesn't exist. It uses the useFetcherWithPromise hook to submit a POST request to the /store/create route and updates the basketId state with the response.
import React, { useCallback } from 'react'
import { useFetcherWithPromise } from '~/utils/general'

interface BasketManagerProps {
  basketId: string | null
  setBasketId: (basketId: string | null) => void
}

const BasketManager: React.FC<BasketManagerProps> = ({ basketId, setBasketId }) => {
  const { submit } = useFetcherWithPromise()

  const createBasket = useCallback(async () => {
    console.log('Creating basket...')
    try {
      const response = await submit(null, {
        method: 'post',
        action: '/store/create',
      })
      setBasketId(response.basketId)
    } catch (error) {
      console.error('Failed to create basket:', error)
    }
  }, [submit, setBasketId])

  React.useEffect(() => {
    if (!basketId) {
      createBasket()
    }
  }, [basketId, createBasket])

  return null
}

export default BasketManager