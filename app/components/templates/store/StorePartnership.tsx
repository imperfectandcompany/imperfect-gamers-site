import FeaturedPartnership from '../../organism/FeaturedPartnership'

/**
 * Renders the featured partnership section.
 * @returns JSX.Element representing the featured partnership section.
 */
const FeaturedPartnershipSection: React.FC = () => {
	return (
		<FeaturedPartnership
			logoSrc="https://imperfectgamers.org/assets/store/tebex_logo.svg"
			logoAlt="Tebex logo"
			title="We are trusted"
			description={
				<>
					Proud partners of Tebex, we were the first to launch with them in
					CS:GO. Piloting their initial launch in the new CS2 space. You can
					read more about it{' '}
				</>
			}
			link="#"
			linkText="here"
		/>
	)
}

export default FeaturedPartnershipSection
