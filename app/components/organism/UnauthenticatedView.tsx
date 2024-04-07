// components/organism/UnauthenticatedView.tsx
import Heading from '~/components/atoms/Heading/Heading';
import LoginForm from '~/components/molecules/LoginForm';
import Button from '~/components/atoms/Button/Button';

const UnauthenticatedView = () => {
    return (
        <div className="flex flex-col items-center justify-center text-white">

            <div className="responsive-mx my-6 text-center">
                    <Heading>You must be logged in</Heading>
                <Button
                    type="submit"
                    onClick={() => window.location.href = '/login'}
                >
                    Login
                </Button>
            </div>
            <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default UnauthenticatedView;