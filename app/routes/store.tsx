// Import necessary hooks and components from React and Remix
import { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from 'react';
import {
  StoreContact,
  StoreFAQ,
  FeaturedSection,
  StoreStatistics,
  StoreTiers,
  StoreTestimonials,
  StoreEvents,
  StoreFooter,
  StorePartnership,
  StoreHeader,
} from '~/components/templates/store';
import "~/styles/store.css";


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
  ];
};

// Main component
export default function Store() {
  // Place your JavaScript code inside useEffect if necessary
  useEffect(() => {
    // Example: Adding an event listener
    // document.getElementById('someElement').addEventListener('click', () => {});
    // http://localhost:5173/store/
  }, []);

  return (
    <>
      <div className="container mx-auto">
    <StoreHeader />
        { /* Hidden while we focus on everything else */}
        <div className="flex flex-wrap justify-between hidden">
          <StoreStatistics />
          <StoreTiers />
          <FeaturedSection />
          <StoreTestimonials />
          <StoreFAQ />
          <StorePartnership />
          <StoreEvents />
          <StoreContact />
          <StoreFooter />
        </div>
      </div >
    </>
  );
}
