// components/molecules/UsernameForm.tsx
import { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { ValidatedForm, SubactionData } from 'remix-validated-form';
import { z } from 'zod';
import Button from '~/components/atoms/Button/Button';
import Input from '~/components/atoms/Input/Input';
import { withZod } from '@remix-validated-form/with-zod';


// Validation schema using Zod
const usernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username cannot exceed 20 characters"),
});

const validator = withZod(usernameSchema);


const UsernameForm: React.FC = () => {
    const fetcher = useFetcher();
	const [username, setUsername] = useState("");
    const [usernameStatus, setUsernameStatus] = useState<string | null>(null);

	useDebouncedEffect(() => {
        if (username.length >= 3) {
            fetcher.submit({ username }, { method: 'post', action: '/auth/check/username' });
        }
    }, [username], 300);


	function useDebouncedEffect(effect: () => void, dependencies: any[], delay: number) {
		useEffect(() => {
			const handler = setTimeout(() => {
				effect();
			}, delay);
	
			return () => clearTimeout(handler);
		}, [...dependencies, delay]); // Include delay in dependencies array
	}

	// const handleUsernameSubmit = async (values: { username: string }) => {
	// 	fetcher.submit(values, { method: 'post', action: '/auth/check/username' })
	// };

	useEffect(() => {
		if (fetcher.data as { usernameAvailable?: boolean }) {
			setUsernameStatus("Username is already taken.");
		} else if ((fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable === true) {
			setUsernameStatus("Username is available.");
		} else {
			setUsernameStatus(null);
		}
	}, [fetcher.data]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };


    const handleFormSubmit = (data: { username: string }, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        console.log('Form data:', data); // Here you would handle the form submission data
        // Possibly call a function to finalize setting the username
    };


	// Using useEffect to react to changes in fetcher.data
	useEffect(() => {
		console.log('awerwe');
		if ((fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable === false) {
			setUsernameStatus("Username is already taken.");
		} else if ((fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable === true) {
			setUsernameStatus("Username is available.");
		} else {
			setUsernameStatus(null);
		}
	}, [fetcher.data]);

    return (
        <div className="p-4 rounded-lg shadow">
            <p className="text-gray-400 text-sm mb-2">Choose a username to continue with your setup.</p>

            <ValidatedForm
                validator={validator}
                method="post"
                action="/auth/check/username"
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
                    <div id="usernameStatus" className={`text-sm ${usernameStatus.includes("taken") ? 'text-red-500' : 'text-green-500'}`}>
                        {usernameStatus}
                    </div>
                )}
                <Button type="submit">{fetcher.state === 'submitting' ? 'Submitting...' : 'Set Username'}</Button>
            </ValidatedForm>
        </div>
    );
};

export default UsernameForm;

function useDebouncedEffect(arg0: () => void, arg1: any[], arg2: number) {
	throw new Error('Function not implemented.');
}
