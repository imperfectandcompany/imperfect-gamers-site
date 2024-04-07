// components/molecule/LoginForm.tsx
import Button from '~/components/atoms/Button/Button';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';


const LoginForm = () => {
    return (
      <div className="border-t border-red-700 py-4 text-center">
        <Paragraph>
          Please login using your Imperfect Gamers account with your steam integrated so we can identify you in game.
        </Paragraph>
      </div>
    );
  };
  
  export default LoginForm;