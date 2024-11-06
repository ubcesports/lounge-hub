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
    <div className="flex flex-col gap-4 rounded-lg bg-[#20222C] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold">Add Profile</h1>
      </div>
      <form className="grid grid-cols-5 items-end gap-4">
        <TextField
          label="Student number"
          name="studentNumber"
          value={addGamerData.studentNumber}
          onChange={handleInputChange}
          className="col-span-1 rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
        />
        <TextField
          label="First Name"
          name="firstName"
          value={addGamerData.firstName}
          onChange={handleInputChange}
          className="col-span-1 rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={addGamerData.lastName}
          onChange={handleInputChange}
          className="col-span-1 rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
        />
        <DropdownField
          label="Membership Tier"
          name="membershipTier"
          value={addGamerData.membershipTier}
          className="col-span-1 rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
          onChange={handleDropdownChange}
          options={[
            { value: "1", label: "Tier 1" },
            { value: "2", label: "Tier 2" },
          ]}
        />
        <Button
          onClick={handleSubmit}
          label="Add Gamer"
          className="rounded bg-[#3A6AAC] px-4 py-2 text-[#DEE7EC] hover:bg-blue-500"
        />
        <div className="col-span-5 col-start-1 row-span-1 row-start-2">
          <TextField
            label="Notes"
            name="notes"
            value={addGamerData.notes}
            onChange={handleInputChange}
            className="col-span-5 rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
