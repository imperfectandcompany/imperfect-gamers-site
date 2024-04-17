// components/molecules/UsernameForm.tsx
import { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
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
    const [usernameStatus, setUsernameStatus] = useState<string | null>(null);

	const handleUsernameSubmit = async (values: { username: string }) => {
		fetcher.submit(values, { method: 'post', action: '/auth/check/username' })
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
                onSubmit={handleUsernameSubmit}
                className="flex flex-col space-y-4"
            >
                <Input name="username" type="text"  className="text-red-500" placeholder="Username" required={true} />
                {usernameStatus && (
                    <div id="usernameStatus" className={`text-sm ${usernameStatus.includes("taken") ? 'text-red-500' : 'text-green-500'}`}>
                        {usernameStatus}
                    </div>
                )}
                <Button type="submit">{fetcher.state === 'submitting' ? 'Submitting...' : 'Continue'}</Button>
            </ValidatedForm>
        </div>
    );
};

export default UsernameForm;