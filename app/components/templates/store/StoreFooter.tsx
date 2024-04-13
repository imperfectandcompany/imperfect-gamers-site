import FooterLink from "~/components/molecules/FooterLink";

/**
 * Renders the footer component for the store page.
 * 
 * @returns The rendered StoreFooter component.
 */
const StoreFooter: React.FC = () => {
    
    return (
      <>
        <footer className="text-sm mt-24">
          <div className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left text-gray-400">
                <p>2024 © Imperfect Gamers - All rights Reserved</p>
                <p className="mt-2 md:mt-0">We are not affiliated with Valve</p>
              </div>
              <div className="flex justify-center mt-4 md:mt-0">
                <FooterLink href="https://imperfectgamers.org/discord/" external>
                  <i className="fab fa-discord"></i>
                </FooterLink>
              </div>
              <div className="text-center md:text-right md:flex md:items-center mt-4 md:mt-0">
                <p className="text-gray-400">Imperfect and Company</p>
                <FooterLink href="https://imperfectandcompany.com" external>
                  <img src="https://imperfectdesignsystem.com/assets/img/imperfectandcompany/umbrella.png" alt="parent company logo" className="h-5 inline md:block" />
                </FooterLink>
              </div>
            </div>
          </div>
        </footer>
        <div className="px-4 py-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <FooterLink href="#" external>
              <img src="https://example.tebex.io/assets/img/tebex.png" alt="Tebex logo" className="h-5 hidden md:block" />
            </FooterLink>
            <p className="text-gray-400 text-xs text-center md:text-left">This website and its checkout process is owned &amp; operated by Tebex Limited, who handle product fulfilment, billing support and refunds.</p>
            <div className="flex flex-col text-sm md:flex-row items-center mt-4 md:mt-0">
              <FooterLink href="https://imperfectgamers.org/imprint" external className="mb-2 md:mb-0 md:mr-4">Impressum</FooterLink>
              <FooterLink href="https://imperfectgamers.org/terms-of-service" external className="mb-2 md:mb-0 md:mr-4">Terms &amp; Conditions</FooterLink>
              <FooterLink href="https://imperfectgamers.org/privacy-policy" external>Privacy Policy</FooterLink>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default StoreFooter;