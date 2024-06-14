import React from 'react';

const StoreNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [redirecting, setRedirecting] = React.useState(false);
    const [countdown, setCountdown] = React.useState(3);
    let redirectTimeout = React.useRef<number | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleRedirect = (url: string) => {
        if (!redirecting) {
            setRedirecting(true);
            setCountdown(3);
            redirectTimeout.current = window.setInterval(() => {
                setCountdown((prevCount) => {
                    if (prevCount <= 1) {
                        if (redirectTimeout.current !== null) {
                            clearInterval(redirectTimeout.current);
                        }
                        window.location.href = url;
                        return 0;
                    }
                    return prevCount - 1;
                });
            }, 1000);
        }
    };

    const cancelRedirect = () => {
        if (redirectTimeout.current !== null) {
            clearInterval(redirectTimeout.current);
        }
        setRedirecting(false);
        setIsOpen(false);
    };
    return (
    <nav>
        <div className="menu-toggle" onClick={redirecting ? cancelRedirect : toggleMenu}>
            {redirecting ? <span className="cancel-text">Cancel</span> : <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>}
        </div>
        {redirecting ? (
            <div className="nav__list active redirecting">
                <div className="redirect-message flex justify-between items-center w-full">
                    <span>Redirecting in {countdown} seconds...</span>
                    <button className="b text-white py-1 px-4 flex rounded invisible md:visible" onClick={cancelRedirect}>
                        Cancel
                    </button>
                </div>
            </div>
        ) : (
            <ul className={`nav__list select-none ${isOpen ? "active" : ""}`}>
                <li className="list__icon" onClick={() => handleRedirect("https://imperfectgamers.org/")}>
                    <i className="fa fa-home"></i>
                </li>
                <li className="list__item stats-item" onClick={() => handleRedirect("https://imperfectgamers.org/stats")}>
                    STATS
                </li>
                <li className="list__item" onClick={() => handleRedirect("https://imperfectgamers.org/infractions")}>
                    INFRACTIONS
                </li>
                <li className="list__item active !cursor-default">
                    STORE
                </li>
                <li className="list__item" onClick={() => handleRedirect("https://imperfectgamers.org/discord")}>
                    SUPPORT
                </li>
            </ul>
        )}
    </nav>
    );
};

export default StoreNavbar;