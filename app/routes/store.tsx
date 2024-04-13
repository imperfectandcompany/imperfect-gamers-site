import { getSession } from '~/auth/storage.server'; // Make sure this matches your file structure
import { MetaFunction, LinksFunction, ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useEffect } from 'react';
import { login } from "~/auth/authenticator.server";
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
import { checkSteamIntegration, checkUserSession } from '~/auth/session';



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


export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return json({
    isAuthenticated: session.has('userToken'),
    userToken: session.get('userToken') || null,
    isSteamLinked: session.has('steamId'),
    steamId: session.get('steamId') || null,
    username: session.get('username') || null
  });
};


export default function Store() {



  return (
    <>
      <StoreHeader />
      
      { /* Hidden while we focus on everything else 

        <div className="flex flex-wrap justify-between">
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
        
        */}

    </>
  );
}
