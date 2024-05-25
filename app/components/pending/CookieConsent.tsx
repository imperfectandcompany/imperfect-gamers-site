import React, { useState } from 'react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const acceptCookies = () => {
        alert('Cookies accepted!');
        setIsVisible(false);
    };

    const openSettings = () => {
        alert('Opening settings...');
    };

    return (
        <>
            <style>{`
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: black;
                    color: white;
                    margin: 0;
                    padding: 0;
                }
                .cookie-popup {
                    width: 100%;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background: rgba(10, 10, 10, 0.9);
                    border-top: 2px solid #a83232;
                    z-index: 1000;
                }
                .text-sm {
                    font-size: 14px;
                    line-height: 1.6;
                }
                strong {
                    font-size: 16px;
                    font-weight: bold;
                }
                .footer {
                    padding: 20px;
                    text-align: center;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #222;
                    display: none;
                }
                .footer a, .cookie-popup a {
                    color: #ff6347;
                    text-decoration: none;
                    transition: color 0.3s ease-in-out;
                }
                .cookie-popup a:hover {
                    color: #ffffff;
                }
                button:focus {
                    outline: 2px solid #ff6347; /* High contrast outline for focus */
                }
            `}</style>
            {isVisible && (
                <div className="cookie-popup cookie-consent" role="dialog" aria-labelledby="cookieConsentTitle" aria-describedby="cookieConsentDesc">
                    <div className="text-sm">
                        <strong id="cookieConsentTitle">Imperfect Gamers - Committed to Your Privacy.</strong>
                        <p id="cookieConsentDesc">At Imperfect Gamers, part of Imperfect and Company LLC, we strive to enhance your experience and improve our services. To achieve this, we use cookies and similar technologies provided by our partners Tebex, Google (Analytics GA4), and Microsoft (Clarity). These tools help us understand user behavior and optimize our website accordingly. You can manage your preferences or withdraw your consent at any time. For more detailed information, please visit our "Settings" or view our data protection policies.</p>
                        <a href="/privacy-policy">Privacy Policy</a> | <a href="/cookie-policy">Cookie Policy</a>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                        <button
                            className="text-white py-2 px-5 tracking-wide bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-l opacity-75 cursor-pointer shadow-none justify-center border-transparent text-sm font-medium transition-opacity duration-300 focus:outline-none select-none"
                            onClick={openSettings}
                            aria-label="Open cookie settings"
                            tabIndex={0}
                        >
                            Settings
                        </button>
                        <button
                            className="text-white py-2 px-5 tracking-wide bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-l opacity-100 cursor-pointer shadow-none justify-center border-transparent text-sm font-medium transition-opacity duration-300 focus:outline-none select-none"
                            onClick={acceptCookies}
                            aria-label="Accept all cookies"
                            tabIndex={0}
                        >
                            Accept all
                        </button>
                    </div>
                </div>
            )}
            {!isVisible && (
                <div className="footer" style={{ display: 'block' }}>
                    <a href="/privacy-policy">Privacy Policy</a> | <a href="/cookie-policy">Cookie Policy</a>
                </div>
            )}
        </>
    );
};

export default CookieConsent;
