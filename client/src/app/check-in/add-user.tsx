import React, { useState, ChangeEvent } from "react";

import Button from "../components/button";
import TextField from "../components/text-field";
import DropdownField from "../components/dropdown";
import { GamerProfile } from "../../interfaces/gamer-profile";
import { addGamerProfile } from "../../services/gamer-profile";

const AddUser = () => {
  const [addGamerData, setAddGamerData] = useState<GamerProfile>({
    studentNumber: "",
    firstName: "",
    lastName: "",
    membershipTier: 1,
    notes: "",
  });

  const submitData = async (data: GamerProfile) => {
    addGamerProfile(data);
    alert("Gamer added successfully!"); // TODO: Check if someone is already added
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddGamerData({
      ...addGamerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddGamerData({
      ...addGamerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitData(addGamerData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-lg">Add Profile</h1>
      </div>
      <form className="grid grid-cols-5 gap-4 items-end">
        <TextField
          label="Student number"
          name="studentNumber"
          value={addGamerData.studentNumber}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white col-span-1"
        />
        <TextField
          label="First Name"
          name="firstName"
          value={addGamerData.firstName}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white col-span-1"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={addGamerData.lastName}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white col-span-1"
        />
        <DropdownField
          label="Membership Tier"
          name="membershipTier"
          value={addGamerData.membershipTier}
          className="p-2 rounded bg-gray-700 text-white col-span-1"
          onChange={handleDropdownChange}
          options={[
            { value: "1", label: "Tier 1" },
            { value: "2", label: "Tier 2" },
          ]}
        />
          <Button
            onClick={handleSubmit}
            label="Add Gamer"
            className="bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-500"
          />
          <div className="row-start-2 row-span-1 col-start-1 col-span-5">
          <TextField
          label="Notes"
          name="notes"
          value={addGamerData.notes}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white col-span-5"
        />
        </div>
        
      </form>
    </div>
  );
};

export default AddUser;
