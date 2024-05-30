import type React from 'react'
import MembershipTier from '../../organism/MembershipTier'

const basicFeatures = [{ name: 'Access to all public servers', included: true }]

/**
 * Represents the premium features available in the store.
 */
const premiumFeatures = [
	{ name: 'Access to all public servers', included: true },
	{ name: 'Access to Premium Servers', included: true },
	{ name: 'Slot Reservation', included: true },
	// ... other features
	{
		name: 'Personal IG Server',
		included: false,
		tooltip:
			'To access a custom IG server, please reach out to us directly. This exclusive service is available to our VIP clients only and cannot be obtained through the standard store. Ensure you are logged in as a VIP for more details.',
	},
]

/**
 * Renders the store tiers component.
 * @component
 */
const StoreTiers: React.FC = () => (
	<div className="relative">
		{/* SVG icon */}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			className="absolute left-4 top-4 z-0 size-36 -translate-x-1/2 -translate-y-1/2 text-white/[0.085]"
		>
			{/* SVG path */}
			<path
				d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"
				fill="currentColor"
			></path>
		</svg>
		<div className="mb-6 flex flex-col gap-2 lg:mb-12">
			{/* Heading */}
			<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
				{' '}
				Available <span className="text-red-400">Membership</span> Tiers{' '}
			</h2>
			{/* Description */}
			<p className="font-display block text-white/60">
				Premium is currently in <span className="text-white/65">BETA</span>
			</p>
		</div>
		<div className="relative flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
			{/* Basic Membership Tier */}
			<MembershipTier
				planType="Basic"
				planName="Basic"
				features={basicFeatures}
				additionalInfo="Imperfect Basic membership offers limited access to community servers. Upgrade to Premium for full benefits."
			/>
			{/* Premium Membership Tier */}
			<MembershipTier
				planType="Premium"
				planName="Premium"
				features={premiumFeatures}
				trialInfo="BETA"
				additionalInfo="Enjoy an elegant experience with Premium membership. Full access to all servers and additional perks."
			/>
		</div>
	</div>
)

export default StoreTiers
