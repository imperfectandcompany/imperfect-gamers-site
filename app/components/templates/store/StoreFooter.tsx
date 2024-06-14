import FooterLink from '~/components/molecules/FooterLink'

/**
 * Renders the footer component for the store page.
 *
 * @returns The rendered StoreFooter component.
 */
const StoreFooter: React.FC = () => {
	return (
		<>
			<footer className="mt-24 text-sm">
				<div className="mx-auto max-w-screen-xl px-4 py-8">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<div className="text-center text-gray-400 md:text-left">
							<p>2024 © Imperfect Gamers - All rights Reserved</p>
							<p className="mt-2 md:mt-0">We are not affiliated with Valve</p>
						</div>
						<div className="mt-4 flex justify-center md:mt-0">
							<FooterLink href="https://imperfectgamers.org/discord/" external>
								<i className="fab fa-discord"></i>
							</FooterLink>
						</div>
						<div className="mt-4 text-center md:mt-0 md:flex md:items-center md:text-right">
							<p className="text-gray-400">Imperfect and Company</p>
							<FooterLink href="https://imperfectandcompany.com" external>
								<img
									src="https://imperfectdesignsystem.com/assets/img/imperfectandcompany/umbrella.png"
									alt="parent company logo"
									className="inline h-5 md:block"
								/>
							</FooterLink>
						</div>
					</div>
				</div>
			</footer>
			<div className="border-t border-gray-700 p-4">
				<div className="flex flex-col items-center justify-between md:flex-row">
					<FooterLink href="#" external>
						<img
							src="https://example.tebex.io/assets/img/tebex.png"
							alt="Tebex logo"
							className=""
						/>
					</FooterLink>
					<p className="text-center text-xs text-gray-400 md:text-left">
						This website and its checkout process is owned &amp; operated by
						Tebex Limited, who handle product fulfilment, billing support and
						refunds.
					</p>
					<div className="mt-4 flex flex-col items-center text-sm md:mt-0 md:flex-row">
						<FooterLink
							href="https://imperfectgamers.org/imprint"
							external
							className="mb-2 md:mb-0 md:mr-4"
						>
							Impressum
						</FooterLink>
						<FooterLink
							href="https://imperfectgamers.org/terms-of-service"
							external
							className="mb-2 md:mb-0 md:mr-4"
						>
							Terms &amp; Conditions
						</FooterLink>
						<FooterLink
							href="https://imperfectgamers.org/privacy-policy"
							external
						>
							Privacy Policy
						</FooterLink>
					</div>
				</div>
			</div>
		</>
	)
}

export default StoreFooter
