// StoreLogin.tsx
import UnauthenticatedView from '~/components/organism/UnauthenticatedView';

const StoreLogin = () => {
  // Check if the user is logged in
  const isLoggedIn = false; // Replace with your logic to check if the user is logged in

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Unauthorized Action</h2>
      {!isLoggedIn && <UnauthenticatedView />}
    </div>
  );
};

export default StoreLogin;