import React, { useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import Button from '~/components/atoms/Button/Button';
import Input from '~/components/atoms/Input/Input';
import { getSteamLoginURL } from '~/utils/steamAuth';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

const validator = withZod(loginSchema);

const AuthorizeForm: React.FC = () => {
  const fetcher = useFetcher();
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState('');

  const initiateSteamLinking = async () => {
    // Instead of opening the popup immediately, fetch the URL first
    try {
      const response = await fetch('/authorize/steam'); // Adjusted endpoint
      const data = await response.json();

      if (data.url) {
        const steamPopup = window.open(data.url, 'steamPopup', 'width=600,height=700');
        if (!steamPopup) {
          setShowFallback(true);
          setFallbackUrl(data.url); // Set the fallback URL
        }
      } else {
        alert("Failed to initiate Steam linking. Please try again.");
      }
    } catch (error) {
      console.error("Failed to fetch Steam linking URL", error);
      setShowFallback(true);
      const returnURL = ""; // Declare the variable returnURL
      setFallbackUrl(await getSteamLoginURL(returnURL)); // Implement this function to get the Steam login URL on the client side if needed
    }
  };

  return (
    <div>
      {showFallback && (
        <div id="fallback">
          <p>Click <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition hover:underline text-red-700">here</a> if you're having trouble linking your Steam account.</p>
        </div>
      )}
      <Button onClick={initiateSteamLinking}>Link Steam Account</Button>
    </div>
  );
};

export default AuthorizeForm;
