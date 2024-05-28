import React, { useState, useRef, useEffect, ReactNode } from 'react';

const focusableModalElements: string = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const trapFocus = (modalRef: React.RefObject<HTMLDivElement>): (() => void) => {
    const focusableElements = modalRef.current?.querySelectorAll(focusableModalElements);
    const firstFocusableElement = focusableElements?.[0] as HTMLElement;
    const lastFocusableElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    function handleFocus(event: KeyboardEvent) {
        if (event.shiftKey && document.activeElement === firstFocusableElement) {
            lastFocusableElement?.focus();
            event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
            firstFocusableElement?.focus();
            event.preventDefault();
        }
    }

    firstFocusableElement?.focus();
    document.addEventListener('keydown', handleFocus);

    return () => {
        document.removeEventListener('keydown', handleFocus);
    };
};

interface ModalProps {
    title: string;
    content: string;
    onClose: () => void;
    children?: ReactNode;
}

const CookieConsentModal: React.FC<ModalProps> = ({ title, content, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isExiting, setIsExiting] = useState(false); // State to control the exit animation

    useEffect(() => {
        const modalNode = modalRef.current;  // Capture the modal ref at the time of effect execution.

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCloseWithAnimation();
            }
        };

        window.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        if (modalNode) {
            modalNode.style.transform = 'scale(1)';
            modalNode.style.opacity = '1';
            const focusCleanup = trapFocus(modalRef);  // Ensure focus trapping setup can be cleanly removed.
            
            return () => {  // Return a cleanup function to run when component unmounts or dependencies change.
                window.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = '';
                modalNode.style.transform = 'scale(0.8)';
                modalNode.style.opacity = '0';
                focusCleanup();  // Clean up focus trapping.
            };
        }
    }, [onClose]);  // Dependencies array includes only the necessary props/state.

    useEffect(() => {
        // Ensure modal enters normally
        if (modalRef.current) {
            modalRef.current.style.opacity = '1';
            modalRef.current.style.transform = 'scale(1)';
        }
        return () => {
            // Prepare for exit animation when component unmounts or state changes
            if (isExiting && modalRef.current) {
                modalRef.current.style.opacity = '0';
                modalRef.current.style.transform = 'scale(0.8)';
            }
        };
    }, [isExiting]); // Depend on isExiting to re-run effect when it changes


    const onCloseWithAnimation = () => {
        setIsExiting(true); // Trigger exit animation
        setTimeout(() => {
            onClose(); // Close modal after animation duration
        }, 300); // Match duration to CSS transition
    };

    return (
        <div className="modal-backdrop" onClick={(e) => {
            if (e.currentTarget === e.target) onCloseWithAnimation();
        }}>
            <div ref={modalRef} className={`modal-content ${isExiting ? 'modal-exiting' : ''}`}>
                <div className="modal-header">
                <h2 id="modalTitle" className="modal-title">{title}</h2>
                    <button onClick={onCloseWithAnimation} className="close-button">
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button>
                    {/*
                    <button onClick={onCloseWithAnimation}>Close</button>
                    **/ }
                </div>
                <div className="modal-body">
                    {children || <p>{content}</p>}
                </div>
            </div>
        </div>
    );
};

export default CookieConsentModal;
