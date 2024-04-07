// Import necessary hooks and components from React and Remix
import { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from 'react';
import MembershipCard from "~/components/MembershipCard";
import Button from "~/components/atoms/Button/Button";
import StoreContact from "~/components/templates/StoreContact";
import StoreFAQ from "~/components/templates/StoreFAQ";
import FeaturedSection from "~/components/templates/StoreFeatured";
import StoreStatistics from "~/components/templates/StoreStatistics";
import "~/styles/store.css";
import StoreTiers from "~/components/templates/StoreTiers";
import StoreTestimonials from "~/components/templates/StoreTestimonials";



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
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="title">Imperfect Gamers Club</h1>
        <p className="subtitle">Join now through the exclusive access member pass</p>
        <MembershipCard />
        <div className="flex justify-center fade-down">
          <Button onClick={() => { }}>
            Join Now
          </Button>
        </div>

        <div className="flex flex-wrap justify-between hidden">
          <StoreStatistics />
        </div>
        <StoreTiers />
        <FeaturedSection />
        <StoreTestimonials />
        <StoreFAQ />
        <StoreContact />
      </div >
    </>
  );
}
