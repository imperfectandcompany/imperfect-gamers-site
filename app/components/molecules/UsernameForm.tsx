import { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import Button from '~/components/atoms/Button/Button';
import Input from '~/components/atoms/Input/Input';
import { withZod } from '@remix-validated-form/with-zod';

const usernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username cannot exceed 20 characters"),
});

const validator = withZod(usernameSchema);

const UsernameForm: React.FC = () => {
    const fetcher = useFetcher();
    const [username, setUsername] = useState("");
    const [usernameStatus, setUsernameStatus] = useState<string | null>(null);
    const [finalizing, setFinalizing] = useState(false);

    function useDebouncedEffect(effect: () => void, dependencies: any[], delay: number) {
        useEffect(() => {
            const handler = setTimeout(effect, delay);
            return () => clearTimeout(handler);
        }, [...dependencies, delay]);
    }

    useDebouncedEffect(() => {
        if (username.length >= 3) {
            fetcher.submit({ username }, { method: 'post', action: '/auth/check/username' });
        } else {
            setUsernameStatus(null); // Clear status when below 3 characters
        }
    }, [username], 300);

    useEffect(() => {
        if (username.length > 0 && username.length < 3) {
            setUsernameStatus("Username too short."); // Warning for short username
        } else if (fetcher.data) {
            if ((fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable === false) {
                setUsernameStatus("Username is already taken.");
                setFinalizing(false);
            } else if ((fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable === true) {
                setUsernameStatus("Username is available.");
                setFinalizing(true);
            } else {
                setUsernameStatus(null);
                setFinalizing(false);
            }
        }
    }, [fetcher.data, username]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleFormSubmit = (data: { username: string }, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (finalizing) {
            fetcher.submit(data, { method: 'post', action: '/auth/finalize/username' });
        } else {
            fetcher.submit(data, { method: 'post', action: '/auth/check/username' });
        }
    };

    return (
        <div className="p-4 rounded-lg shadow">
            <p className="text-gray-400 text-sm mb-2">Choose a username to continue with your setup.</p>
            <ValidatedForm
                validator={validator}
                method="post"
                action={finalizing ? "/auth/finalize/username" : "/auth/check/username"}
                fetcher={fetcher}
                onSubmit={handleFormSubmit}
                className="flex flex-col space-y-4"
            >
                <Input
                    name="username"
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    autoComplete="off"
                    required={true}
                />
                {usernameStatus && (
                    <div id="usernameStatus" className={`text-sm ${usernameStatus.includes("taken") ? 'text-red-500' : usernameStatus.includes("short") ? 'text-yellow-500' : 'text-green-500'}`}>
                        {usernameStatus}
                    </div>
                )}
                <Button type="submit">{fetcher.state === 'submitting' ? 'Checking...' : 'Continue'}</Button>
            </ValidatedForm>
        </div>
    );
};

export default UsernameForm;