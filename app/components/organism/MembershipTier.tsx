import React from 'react'

type Feature = {
	tooltip?: string
	name: string
	included: boolean
}

type MembershipTierProps = {
	planType: string
	planName: string
	features: Feature[]
	trialInfo?: string
	trialPrimary?: boolean
	additionalInfo?: string
}

/**
 * Renders a tooltip component that displays additional content when hovered over.
 *
 * @param children - The content to be rendered inside the tooltip.
 * @param content - The text content to be displayed in the tooltip.
 * @returns The tooltip component.
 */
function Tooltip({
	children,
	content,
}: {
	children: React.ReactNode
	content: string
}) {
	const [show, setShow] = React.useState(false)

	return (
		<div
			className="relative flex items-center gap-1.5"
			onMouseEnter={() => {
				setShow(true)
			}}
			onMouseLeave={() => {
				setShow(false)
			}}
		>
			{children}
			{show ? (
				<div className="absolute bottom-full z-10 mb-2 rounded bg-black px-3 py-1 text-xs text-white shadow-lg">
					{content}
				</div>
			) : null}
		</div>
	)
}

/**
 * Renders a membership tier component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.planType - The type of membership plan.
 * @param {string} props.planName - The name of the membership plan.
 * @param {Array<object>} props.features - The list of features for the membership plan.
 * @param {string} props.trialInfo - The trial information for the membership plan.
 * @param {string} props.additionalInfo - Additional information for the membership plan.
 * @returns {JSX.Element} The rendered membership tier component.
 */
const MembershipTier: React.FC<MembershipTierProps> = ({
	planType,
	planName,
	features,
	trialInfo,
	trialPrimary = false,
	additionalInfo,
}) => (
	<>
		{trialPrimary ? null : (
			<div className="relative flex h-px w-full flex-row bg-gradient-to-r from-transparent via-rose-300 to-transparent sm:hidden"></div>
		)}
		<div className="flex w-full max-w-md flex-col rounded-md border border-gray-700/50 bg-black bg-opacity-50 px-8 py-10">
			{trialInfo ? (
				<div className="mb-3">
					<span
						className={
							trialPrimary
								? 'white rounded bg-gray-400 bg-opacity-35 p-1.5 text-xs'
								: 'rounded bg-red-200 bg-opacity-20 p-1.5 text-xs text-red-400'
						}
					>
						{trialInfo}
					</span>
				</div>
			) : null}
			<h3
				className={`bg-gradient-to-br bg-clip-text text-2xl font-bold text-transparent ${planType === 'Basic' ? 'from-gray-200 via-gray-200 to-gray-300' : 'from-gray-200 via-red-200 to-red-300'}`}
			>
				{planName}
			</h3>
			<div className="mt-6 flex flex-1 flex-col justify-between">
				<div className="space-y-4">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group flex cursor-pointer items-center gap-2 transition duration-150 ease-in-out"
						>
							<i
								className={`fas ${feature.included ? 'fa-check' : 'fa-times'} ${planType === 'Basic' ? 'text-gray-400' : 'text-red-400'} transition group-hover:brightness-150 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]`}
							></i>
							{feature.tooltip ? (
								<Tooltip content={feature.tooltip}>
									<span
										className={`text-white/50 ${!feature.included && 'line-through'} group-hover:text-${planType === 'Basic' ? 'gray-400' : 'red-400'}`}
									>
										{feature.name}
									</span>
								</Tooltip>
							) : (
								<span
									className={`text-white ${!feature.included && 'line-through'} group-hover:text-${planType === 'Basic' ? 'gray-400' : 'red-400'}`}
								>
									{feature.name}
								</span>
							)}
						</div>
					))}
				</div>
				<div className="mt-10 text-xs text-gray-500">{additionalInfo}</div>
			</div>
		</div>
	</>
)

export default MembershipTier
