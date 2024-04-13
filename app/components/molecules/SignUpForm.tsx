// components/molecules/SignUpForm.tsx
import React from 'react';
import { z } from 'zod';
import Button from '~/components/atoms/Button/Button';
import Input from '~/components/atoms/Input/Input';
import { useFetcher } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm } from 'remix-validated-form';

// Schema for form validation using Zod
const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const validate = withZod(signUpSchema);

interface SignUpResponse {
  success: boolean;
}

const SignUpForm: React.FC = () => {
  const fetcher = useFetcher<SignUpResponse>();

  // React to the fetcher's state after submission
  if (fetcher.data?.success) {
    return <p>Registration Successful!</p>;
  }

  return (
    <ValidatedForm
      validator={validate}
      method="post"
      action="/register"
      fetcher={fetcher}
      onSubmit={(data) => {
        // Handle the form submission with the data
        fetcher.submit(data);
      }}
      className="flex flex-col items-center space-y-4"
    >
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Input name="confirmPassword" type="password" placeholder="Confirm Password" required />
      <Button type="submit">Sign Up</Button>
    </ValidatedForm>
  );
};

export default SignUpForm;
