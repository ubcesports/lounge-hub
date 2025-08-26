import React from "react";
import useBoundStore from "../../store/store";
import { initialGamerState } from "../../store/gamer-store";
import PlaceholderImage from "../lounge/placeholder";

export default function StudentInfo() {
  const gamer = useBoundStore((state) => state.GamerProfile);

  if (gamer === initialGamerState) {
    return (
      <div className="flex items-center justify-center rounded-md bg-[#20222C] p-4">
        <div className="col-span-3 h-full rounded-md bg-[#20222C] p-4">
          <PlaceholderImage />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-[#20222C] p-4">
      <h1 className="mb-4 text-2xl font-bold text-[#DEE7EC]">Student Info</h1>
      {gamer !== initialGamerState && (
        <>
          <div className="mb-4 flex gap-8">
            <div>
              <h3 className="text-[#DEE7EC]">First Name</h3>
              <p className="text-[#62667B]">{gamer.firstName}</p>
            </div>
            <div>
              <h3 className="text-[#DEE7EC]">Surname</h3>
              <p className="text-[#62667B]">{gamer.lastName}</p>
            </div>
            <div>
              <h3 className="text-[#DEE7EC]">Membership Level</h3>
              <p className="text-[#62667B]">{gamer.membershipTier}</p>
            </div>
            <div>
              <h3 className="text-[#DEE7EC]">Student Number</h3>
              <p className="text-[#62667B]">{gamer.studentNumber}</p>
            </div>
            <div>
              <h3 className="text-[#DEE7EC]">Membership Expiry Date</h3>
              <p className="text-[#62667B]">{gamer.membershipExpiryDate ? new Date(gamer.membershipExpiryDate).toLocaleDateString('en-US') : 'N/A'}</p>
            </div>
          </div>
          <div>
            <h3 className="text-[#DEE7EC]">Notes</h3>
            <p className="text-[#62667B]">{gamer.notes}</p>
          </div>
        </>
      )}
    </div>
  );
}
