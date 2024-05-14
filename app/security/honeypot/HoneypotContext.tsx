import * as React from "react";
import { HoneypotInputProps } from "./Honeypot.server";

type HoneypotContextType = Partial<HoneypotInputProps>;

const HoneypotContext = React.createContext<HoneypotContextType>({});

export function HoneypotProvider({
	children,
	...context
}: HoneypotContextType & { children: React.ReactNode }) {
	return (
		<HoneypotContext.Provider value={context}>
			{children}
		</HoneypotContext.Provider>
	);
}

export function useHoneypotContext() {
	return React.useContext(HoneypotContext);
}
