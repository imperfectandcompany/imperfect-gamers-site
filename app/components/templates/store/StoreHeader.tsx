// Templates/StoreHeader.jsx

import Button from "../../atoms/Button/Button";
import { MembershipCard } from "../../organism/MembershipCard/MembershipCard";

const StoreHeader: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">Imperfect Gamers Club</h1>
      <p className="subtitle">Join now through the exclusive access member pass</p>
      <MembershipCard />
      <div className="flex justify-center fade-down">
        <Button>Join Now</Button>
      </div>
    </div>
  );
};

export default StoreHeader;