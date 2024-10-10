import React, { useState, ChangeEvent } from "react";

import Button from "../components/button";
import TextField from "../components/text-field";
import DropdownField from "../components/dropdown";

interface AddUserData {
  studentNumber: string;
  firstName: string;
  lastName: string;
  membershipTier: number;
  notes: string;
}

const AddUser = () => {
  const [addUserData, setAddUserData] = useState<AddUserData>({
    studentNumber: "",
    firstName: "",
    lastName: "",
    membershipTier: 1,
    notes: "",
  });

  const submitData = async (data: any) => {
    const url = "http://localhost:8000/api/gamer";
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddUserData({
      ...addUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddUserData({
      ...addUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitData(addUserData);
  };

  return (
    <div>
      <h1>Add New</h1>
      <form>
        <TextField
          label="Student Number"
          name="studentNumber"
          value={addUserData.studentNumber}
          onChange={handleChange}
        />
        <TextField
          label="First Name"
          name="firstName"
          value={addUserData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Surname"
          name="lastName"
          value={addUserData.lastName}
          onChange={handleChange}
        />
        <DropdownField
          label="Membership Tier"
          name="membershipTier"
          value={addUserData.membershipTier}
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ]}
          onChange={handleDropdownChange}
        />
        <TextField
          label="Notes"
          name="notes"
          value={addUserData.notes}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} label="Create" />
      </form>
    </div>
  );
};

export default AddUser;
