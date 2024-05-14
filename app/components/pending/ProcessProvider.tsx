import type React from 'react';
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';

// Define the state interface for each dispatch process
interface State {
  progress: number;
  inProgress: boolean;
  message: string;
  id: string;
}

// Define possible actions for the dispatch reducer
type Action =
  | { type: 'SEND'; message: string; id: string }
  | { type: 'UPDATE'; progress: number; id: string }
  | { type: 'FINISH'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'SKIP'; id: string }
  | { type: 'SPEED'; id: string }
  | { type: 'END' }

// Initial state is an empty array of dispatch processes
const initialState: State[] = [];

/**
 * Reducer function to handle dispatch actions.
 * @param state - Current state of dispatch processes.
 * @param action - Action to perform on the state.
 * @returns Updated state after performing the action.
 */
function reducer(state: State[], action: Action): State[] {
  switch (action.type) {
    case 'SEND':
      return [
        ...state,
        {
          progress: 0,
          inProgress: true,
          message: action.message,
          id: action.id,
        },
      ];
    case 'UPDATE':
      return state.map((dispatch) =>
        dispatch.id === action.id
          ? { ...dispatch, progress: action.progress }
          : dispatch
      );
    case 'FINISH':
      return state.map((dispatch) =>
        dispatch.id === action.id
          ? { ...dispatch, inProgress: false, progress: 100, message: '' }
          : dispatch
      );
    case 'REMOVE':
      return state.filter((dispatch) => dispatch.id !== action.id);
    case 'SKIP':
      return state.map((dispatch) =>
        dispatch.id === action.id
          ? { ...dispatch, progress: 100, inProgress: false, message: '' }
          : dispatch
      );
    case 'SPEED':
      return state.map((dispatch) =>
        dispatch.id === action.id
          ? { ...dispatch, progress: 100 }
          : dispatch
      );
    case 'END':
      return [];
    default:
      return state;
  }
}

// Create a context for the dispatch state and instance
const DispatchContext = createContext<
  | {
      dispatchInstance: {
        send: (message: string) => void;
        finish: () => void;
        fetch: () => State[];
        end: (params?: { id?: string }) => void;
        skip: (params?: { id?: string }) => void;
        speed: (params?: { id?: string }) => void;
      };
      dispatchState: State[];
    }
  | undefined
>(undefined);

// Unique ID generator for dispatches
let nextId = 1;

/**
 * Custom hook to use the dispatch instance.
 * @returns dispatch instance with methods to manage dispatches.
 * @throws Error if used outside of DispatchProvider.
 */
export const useDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('useDispatch must be used within a DispatchProvider');
  }
  return context.dispatchInstance;
};

/**
 * Custom hook to use the current state of dispatches.
 * @returns Current state of dispatches.
 * @throws Error if used outside of DispatchProvider.
 */
export const useDispatchState = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('useDispatchState must be used within a DispatchProvider');
  }
  return context.dispatchState;
};

/**
 * Provider component for dispatch context.
 * @param children - React children components.
 * @returns DispatchContext.Provider wrapping the children.
 */
export const DispatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Send a new dispatch with a specified message.
   * @param message - Message to associate with the dispatch.
   */
  const send = useCallback(
    (message: string) => {
      const id = `dispatch-${nextId++}`;
      dispatch({ type: 'SEND', message, id });
      const totalDuration = 5000; // 5 seconds
      const increment = 100; // Total 100%
      const intervalDuration = totalDuration / increment;

      let progress = 0;
      const interval = setInterval(() => {
        progress += 1; // Increment progress by 1%
        if (progress >= 100) {
          dispatch({ type: 'FINISH', id });
          clearInterval(interval);
        } else {
          dispatch({ type: 'UPDATE', progress, id });
        }
      }, intervalDuration);
    },
    [],
  );

  /**
   * Finish all current dispatches by setting their progress to 100%.
   */
  const finish = useCallback(() => {
    state.forEach(({ id }) => dispatch({ type: 'FINISH', id }));
  }, [state]);

  /**
   * Fetch the current state of all dispatches.
   * @returns Current state array of dispatches.
   */
  const fetch = useCallback(() => state, [state]);

  /**
   * End all dispatches or a specific one if an ID is provided.
   * @param params - Optional parameter to specify a dispatch ID to end.
   */
  const end = useCallback((params?: { id?: string }) => {
    if (params?.id) {
      dispatch({ type: 'REMOVE', id: params.id });
    } else {
      dispatch({ type: 'END' });
    }
  }, []);

  /**
   * Skip the current or a specific dispatch if an ID is provided.
   * @param params - Optional parameter to specify a dispatch ID to skip.
   */
  const skip = useCallback((params?: { id?: string }) => {
    if (params?.id) {
      dispatch({ type: 'SKIP', id: params.id });
    } else if (state.length > 0) {
      dispatch({ type: 'SKIP', id: state[0].id });
    }
  }, [state]);

  /**
   * Speed up the current or a specific dispatch if an ID is provided.
   * @param params - Optional parameter to specify a dispatch ID to speed up.
   */
  const speed = useCallback((params?: { id?: string }) => {
    if (params?.id) {
      dispatch({ type: 'SPEED', id: params.id });
    } else if (state.length > 0) {
      dispatch({ type: 'SPEED', id: state[0].id });
    }
  }, [state]);

  const providerValue = useMemo(
    () => ({
      dispatchInstance: { send, finish, fetch, end, skip, speed },
      dispatchState: state,
    }),
    [send, finish, fetch, end, skip, speed, state],
  );

  return (
    <DispatchContext.Provider value={providerValue}>
      {children}
    </DispatchContext.Provider>
  );
};

export default DispatchProvider;
