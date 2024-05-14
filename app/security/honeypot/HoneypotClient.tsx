/* eslint-disable jsx-a11y/autocomplete-valid */
import * as React from "react";
import { useHoneypotContext } from "./HoneypotContext";

export function HoneypotInputs({
	label = "Please leave this field blank",
}: {
	label?: string;
}): JSX.Element {
	const context = useHoneypotContext();

	const {
		nameFieldName = "name__confirm",
		validFromFieldName = "from__confirm",
		encryptedValidFrom,
	} = context;

	return (
		<div
			id={`${nameFieldName}_wrap`}
			style={{ display: "none" }}
			aria-hidden="true"
		>
			<label htmlFor={nameFieldName}>{label}</label>
			<input
				id={nameFieldName}
				name={nameFieldName}
				type="text"
				defaultValue=""
				autoComplete="nope"
				tabIndex={-1}
			/>
			{validFromFieldName && encryptedValidFrom ? (
				<>
					<label htmlFor={validFromFieldName}>{label}</label>
					<input
						id={validFromFieldName}
						name={validFromFieldName}
						type="text"
						value={encryptedValidFrom}
						readOnly
						autoComplete="off"
						tabIndex={-1}
					/>
				</>
			) : null}
		</div>
	);
}
