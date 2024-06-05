import { createContext, useContext } from 'react'

// Create the context
const ModalPositionContext = createContext({
	adjustModalPosition: () => {}, // Default no-op function
})

// Export the provider and the hook
export const useModalPosition = () => useContext(ModalPositionContext)
export default ModalPositionContext
