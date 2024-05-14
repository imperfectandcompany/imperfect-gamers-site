import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Button from '~/components/atoms/Button/Button'; // Ensure this is the correct import

const SubmitButton: React.FC<{ formIsValid: boolean }> = ({ formIsValid }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting' || fetcher.state === 'loading';
    const [shake, setShake] = useState(false);

    const handleClick = useCallback(() => {
        if (isSubmitting || !formIsValid) {
            setShake(true);
            setTimeout(() => setShake(false), 820); // This needs cleanup
        }
    }, [isSubmitting, formIsValid]);

    // Cleanup timeout to avoid state updates on unmounted component
    useEffect(() => {
        if (shake) {
            const timer = setTimeout(() => setShake(false), 820);
            return () => clearTimeout(timer);
        }
    }, [shake]);

    return (
        <Button
            type="submit"
            disabled={isSubmitting || !formIsValid}
            onClick={handleClick}
            className={`justify-center border-transparent text-sm font-medium text-white transition-opacity duration-300 focus:outline-none ${shake ? 'shake' : ''}`}
        >
            {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
    );
};

export default SubmitButton;
