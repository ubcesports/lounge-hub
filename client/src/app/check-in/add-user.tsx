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
    <div>
      <h1>Add New</h1>
      <form>
        <TextField
          label="Student Number"
          name="studentNumber"
          value={addGamerData.studentNumber}
          onChange={handleInputChange}
        />
        <TextField
          label="First Name"
          name="firstName"
          value={addGamerData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          label="Surname"
          name="lastName"
          value={addGamerData.lastName}
          onChange={handleInputChange}
        />
        <DropdownField
          label="Membership Tier"
          name="membershipTier"
          value={addGamerData.membershipTier}
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ]}
          onChange={handleDropdownChange}
        />
        <TextField
          label="Notes"
          name="notes"
          value={addGamerData.notes}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} label="Create" />
      </form>
    </div>
  );
};

export default AddUser;
