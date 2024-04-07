// LoginForm.jsx
import React from 'react';
import Button from '~/components/atoms/Button/Button';
import Paragraph from '~/components/atoms/Paragraph';


const LoginForm = () => {
    return (
      <div className="border-t border-red-700 py-4 text-center">
        <Paragraph>
          Please login using your Imperfect Gamers account with your steam integrated so we can identify you in game.
        </Paragraph>
        <div className="responsive-mx mt-6">
          <Button
            type="submit"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </Button>
        </div>
      </div>
    );
  };
  
  export default LoginForm;