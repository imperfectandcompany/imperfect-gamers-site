// Import necessary hooks and components from React and Remix
import { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from 'react';
import stylesUrl from "~/styles/store.css";
import MembershipCard from './MembershipCard'; // adjust the path as necessary



export const meta: MetaFunction = () => {
  return [
    { name: "title", content: "Membership Club - Imperfect Gamers" },
    { name: "description", content: "Join the Pro VIP Store and gain access to exclusive membership tiers with special benefits." },
  ];
};


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" },
  { rel: "stylesheet", href: stylesUrl }
  ];
};

// Main component
export default function Store() {
  // Place your JavaScript code inside useEffect if necessary
  useEffect(() => {
    // Example: Adding an event listener
    // document.getElementById('someElement').addEventListener('click', () => {});
  }, []);

  return (
    <div className="bg-black text-white relative flex flex-col background-svg px-4 sm:px-8 md:px-12">
      {/* Your converted JSX goes here */}
      {/* Remember to replace `class` with `className` */}
      {/* Example element: <header className="text-center mt-8">...</header> */}
      {/* More of your component's JSX content... */}
    </div>
  );
}
