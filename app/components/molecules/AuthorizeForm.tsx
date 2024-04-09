// components/molecules/LoginForm.tsx
import React from 'react';
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import Button from '~/components/atoms/Button/Button';
import Input from '~/components/atoms/Input/Input';
import { useFetcher } from '@remix-run/react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

// Client-side validation
const validator = withZod(loginSchema);

const LoginForm: React.FC = () => {
  // Implement the form state and submission logic here
  const fetcher = useFetcher();
  const actionData: { success?: boolean } = fetcher.data as { success?: boolean };

  if (fetcher.state === 'submitting') {
    return <div>Logging in...</div>;
  }
  
  return (
    <ValidatedForm validator={validator} method="post" action="/login"
    fetcher={fetcher}
      className="flex flex-col items-center space-y-4"
    >
      {/* The input fields */}
      <Input name="email" type="email" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />
      {/* The login button */}
      <Button type="submit">Login</Button>
    </ValidatedForm>
  );
};

export default LoginForm;
