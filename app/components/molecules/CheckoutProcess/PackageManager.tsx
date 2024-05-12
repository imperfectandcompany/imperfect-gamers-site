// components/molecules/CheckoutProcess/PackageManager.tsx

//The PackageManager component handles adding a specific package (with the ID 6154841) to the basket if it's not already present. It uses the useFetcherWithPromise hook to submit a POST request to the /store/add route and updates the packages state with the response.
import React, { useCallback } from 'react'
import { useFetcherWithPromise } from '~/utils/general'

interface PackageManagerProps {
  basketId: string | null
  packages: any[]
  setPackages: (packages: any[]) => void
}

const PackageManager: React.FC<PackageManagerProps> = ({ basketId, packages, setPackages }) => {
  const { submit } = useFetcherWithPromise()

  const addPackageToBasket = useCallback(
    async (basketId: string) => {
      console.log('Adding package to basket...')
      try {
        const response = await submit(
          { basketId },
          { method: 'post', action: '/store/add' },
        )
        setPackages(response.packages)
      } catch (error) {
        console.error('Failed to add package:', error)
      }
    },
    [submit, setPackages],
  )

  React.useEffect(() => {
    if (basketId && !packages.some(pkg => pkg.id === 6154841)) {
      addPackageToBasket(basketId)
    }
  }, [basketId, packages, addPackageToBasket])

  return null
}

export default PackageManager