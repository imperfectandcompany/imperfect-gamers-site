import { SerializeFrom } from '@remix-run/node';
import type { FetcherWithComponents, SubmitFunction, SubmitOptions } from '@remix-run/react'
import { useActionData, useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import { AppData } from '@remix-run/react/dist/data';
import { useRef, useEffect, useCallback, useState, useTransition } from 'react'

// Credits: https://gist.github.com/arunmmanoharan/38d313f28dc17637a0e3cfa8c6205bd5
// Contributing users: arunmmanoharan
// May 10 2024

/**
 * A higher-order function that creates a new FetcherWithComponentsReset instance, which extends the FetcherWithComponents interface.
 * The new instance includes an additional method `reset` that can be used to reset the state of the fetcher.
 *
 * @template T - The type of data returned by the fetcher.
 * @param fetcherWithComponents - The FetcherWithComponents instance to be extended.
 * @returns A new FetcherWithComponentsReset instance.
 * 
 * 
 * 
 */
export type FetcherWithComponentsReset<T> = FetcherWithComponents<T> & {
	reset: () => void;
  };

// Credits: https://gist.github.com/arunmmanoharan/38d313f28dc17637a0e3cfa8c6205bd5
// Contributing users: arunmmanoharan
// May 10 2024

/**
 * Custom hook that wraps the useFetcher hook with the ability to reset data.
 *
 * @param {Object} opts - Optional options to pass to the useFetcher hook.
 * @returns {Object} - An object containing fetcher properties with added reset functionality.
 */
export function useFetcherWithReset<T = AppData>(
	opts?: Parameters<typeof useFetcher>[0],
  ): FetcherWithComponentsReset<SerializeFrom<T>> {
	const fetcher = useFetcher<T>(opts);
	const [data, setData] = useState(fetcher.data);
	useEffect(() => {
	  if (fetcher.state === "idle") {
		setData(fetcher.data);
	  }
	}, [fetcher.state, fetcher.data]);
	return {
	  ...fetcher,
	  data: data as SerializeFrom<T>,
	  reset: () => setData(undefined),
	};
  }


// Properly handle environment variables with a helper function

export const getEnvVar = (key: string, defaultValue?: string): string => {
	const value = process.env[key]
	if (value !== undefined) return value
	if (defaultValue !== undefined) return defaultValue
	throw new Error(`Environment variable ${key} is not set`)
}

// Inspiration taken from https://gist.github.com/samselikoff/510c020e4c9ec17f1cf76189ce683fa8
// Contributing users: Samselikoff & jjhiggzw
// April 27 2024


/**
 * This type extends FetcherWithComponents to include additional methods for reset and promise-based submissions.
 * It encapsulates both state management and asynchronous operations into a single fetcher interface.
 * This is ideal for handling complex data fetching and updating scenarios in a React application, particularly within Remix.
 *
 * @template T - The data type the fetcher is expected to handle.
 * @property reset - A method to manually reset the internal state and promise of the fetcher.
 */
export type ExtendedCustomFetcherTemp<T> = FetcherWithComponents<T> & {
};

/**
 * Custom hook that enhances the useFetcher hook with a promise-based API.
 * The useFetcherWithPromise hook wraps the useFetcher hook and provides a promise that resolves when the fetcher's state becomes idle and it has data.
 * This allows you to easily handle asynchronous operations and retrieve the data using promises.
 *
 * @returns An object containing the fetcher state, data, and a submit function.
 */
export function useFetcherWithPromiseAutoReset<T = AppData>(
    opts?: Parameters<typeof useFetcher>[0],
): ExtendedCustomFetcherTemp<SerializeFrom<T>> {
    let resolveRef = useRef<any>();
    let promiseRef = useRef<Promise<any>>();
    const fetcher = useFetcher<T>(opts);
    const [data, setData] = useState(fetcher.data);

    useEffect(() => {
        if (fetcher.state === "idle") {
            setData(fetcher.data);
        }
    }, [fetcher.state, fetcher.data]);

    if (!promiseRef.current) {
        promiseRef.current = new Promise(resolve => {
            resolveRef.current = resolve;
        });
    }

    // Initialize or reset the promise and its resolver.
    const initializePromise = useCallback(() => {
        promiseRef.current = new Promise(resolve => {
            resolveRef.current = resolve;
        });
    }, []);

    // Custom submit function that uses the promise mechanism.
    const submit = useCallback(async (...args: Parameters<SubmitFunction>) => {
        await fetcher.submit(...args);
        return promiseRef.current; // Return the current promise which resolves when the fetcher is idle and has data.
    }, [fetcher]);

    useEffect(() => {
        if (fetcher.state === 'idle' && fetcher.data) {
            resolveRef.current(fetcher.data);
            initializePromise(); // Reset the promise after handling to prepare for next operation
        }
    }, [fetcher.data, fetcher.state, initializePromise]);

    return {
        ...fetcher,
        data: data as SerializeFrom<T>,
        submit,
    };
}



/**
 * This type extends FetcherWithComponents to include additional methods for reset and promise-based submissions.
 * It encapsulates both state management and asynchronous operations into a single fetcher interface.
 * This is ideal for handling complex data fetching and updating scenarios in a React application, particularly within Remix.
 *
 * @template T - The data type the fetcher is expected to handle.
 * @property reset - A method to manually reset the internal state and promise of the fetcher.
 */
export type ExtendedCustomFetcher<T> = FetcherWithComponents<T> & {
    reset: () => void;
};

/**
 * A custom hook that combines the functionality of the standard Remix useFetcher hook with the ability to manually reset its state
 * and manage submissions through promises. This allows components to initiate fetch operations and rely on promises to handle
 * subsequent updates or effects based on the fetch state and data.
 *
 * Imperfect and Company
 * May 10, 2024
 * Inspiration from arunmmanoharan, Samselikoff, jjhiggzw
 * 
 * @param {Object} opts - Optional configurations for useFetcher, such as `key` to maintain identity in React's reconciliation.
 * @returns {ExtendedCustomFetcher} - An enhanced fetcher that supports manual resetting state and promise-based submissions.
 */
export function useFetcherWithPromiseAndReset<T = AppData>(
    opts?: Parameters<typeof useFetcher>[0]
): ExtendedCustomFetcher<SerializeFrom<T>> {

    const fetcher = useFetcher<T>(opts);
    const promiseResolverRef = useRef<(value: SerializeFrom<T>) => void>();
    const fetcherPromiseRef = useRef<Promise<SerializeFrom<T>>>();

    // Initialize or reset the promise and its resolver.
    const initializePromise = useCallback(() => {
        fetcherPromiseRef.current = new Promise(resolve => {
            promiseResolverRef.current = resolve;
        });
    }, []);

    // Manual reset function to reinitialize the promise, allowing the fetcher to be reused after completion.
    const reset = useCallback(() => {
        initializePromise();
    }, [initializePromise]);

    // Custom submit function that uses the promise mechanism.
    const submit = useCallback(async (...args: Parameters<SubmitFunction>) => {
        fetcher.submit(...args);
        return fetcherPromiseRef.current; // Return the current promise which resolves when the fetcher is idle and has data.
    }, [fetcher]);

	// Return back to updating with this later -- not priority.
	// useEffect(() => {
	// 	if (fetcher.state === 'idle' && fetcher.data && promiseResolverRef.current) {
	// 		promiseResolverRef.current(fetcher.data);
	// 		initializePromise(); // Reset the promise after handling to prepare for next operation
	// 	}
	// }, [fetcher.data, fetcher.state, initializePromise]);

    useEffect(() => {
        initializePromise();
    }, [initializePromise]);

    return {
        ...fetcher,
        submit,
        reset,
    };
}



// Inspiration taken from https://gist.github.com/samselikoff/510c020e4c9ec17f1cf76189ce683fa8
// Contributing users: Samselikoff & jjhiggzw
// April 27 2024

/**
 * 
 * @returns An object containing the fetcher state, data, manual reset, and a submit function.
 */
export function useFetcherWithPromiseAndManualReset<T = AppData>(
	opts?: Parameters<typeof useFetcher>[0],
  ): FetcherWithComponentsReset<SerializeFrom<T>> {
	let resolveRef = useRef<any>()
	let promiseRef = useRef<Promise<any>>()
	const fetcher = useFetcher<T>(opts);

	if (!promiseRef.current) {
		promiseRef.current = new Promise(resolve => {
			resolveRef.current = resolve
		})
	}

	    // Initialize or reset the promise and its resolver.
		const resetResolver = useCallback(() => {
			promiseRef.current = new Promise(resolve => {
				resolveRef.current = resolve;
			});
		}, [promiseRef, resolveRef])

		    // Manual reset function to reinitialize the promise, allowing the fetcher to be reused after completion.
			const reset = useCallback(() => {
				if (fetcher.state === 'idle' && fetcher.data) {
				resetResolver();
			}
		}, [fetcher.data, fetcher.state, resetResolver])

		const submit = useCallback(
			async (...args: Parameters<SubmitFunction>) => {
				fetcher.submit(...args)
				return promiseRef.current
			},
			[fetcher, promiseRef],
		)

	return {
        ...fetcher,
        submit,
        reset,
    };
}


export function useFetcherWithPromise(){
	let resolveRef = useRef<any>()
	let promiseRef = useRef<Promise<any>>()
	const fetcher = useFetcher();

	if (!promiseRef.current) {
		promiseRef.current = new Promise(resolve => {
			resolveRef.current = resolve
		})
	}

	const submit = useCallback(
		async (...args: Parameters<SubmitFunction>) => {
			fetcher.submit(...args)
			return promiseRef.current
		},
		[fetcher, promiseRef],
	)

	return {
        ...fetcher,
        submit,
    };
}