import React, {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useMemo,
} from 'react'

interface State {
	progress: number
	inProgress: boolean
	message: string
}

type Action =
	| { type: 'START'; message: string }
	| { type: 'UPDATE'; progress: number }
	| { type: 'FINISH' }

const initialState: State = {
	progress: 0,
	inProgress: false,
	message: '',
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'START':
			return {
				...state,
				inProgress: true,
				progress: 0,
				message: action.message,
			}
		case 'UPDATE':
			return { ...state, progress: action.progress }
		case 'FINISH':
			return { ...state, inProgress: false, progress: 100, message: '' }
		default:
			return state
	}
}

const DispatchContext = createContext<
	| {
			startProcess: (message: string) => void
			processState: State
	  }
	| undefined
>(undefined)

export const useProcessDispatch = () => {
	const context = useContext(DispatchContext)
	if (!context) {
		throw new Error('useProcessDispatch must be used within a ProcessProvider')
	}
	return context.startProcess
}

export const useProcessState = () => {
	const context = useContext(DispatchContext)
	if (!context) {
		throw new Error('useProcessState must be used within a ProcessProvider')
	}
	return context.processState
}

export const ProcessProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const startProcess = useCallback(
		(message: string) => {
			if (!state.inProgress) {
				dispatch({ type: 'START', message })
				const totalDuration = 5000 // 5 seconds
				const increment = 100 // Total 100%
				const intervalDuration = totalDuration / increment

				let progress = 0
				const interval = setInterval(() => {
					progress += 1 // Increment progress by 1%
					if (progress >= 100) {
						dispatch({ type: 'FINISH' })
						clearInterval(interval)
					} else {
						dispatch({ type: 'UPDATE', progress })
					}
				}, intervalDuration)
			}
		},
		[state.inProgress],
	)

	const providerValue = useMemo(
		() => ({ startProcess, processState: state }),
		[startProcess, state],
	)

	return (
		<DispatchContext.Provider value={providerValue}>
			{children}
		</DispatchContext.Provider>
	)
}

export default ProcessProvider
