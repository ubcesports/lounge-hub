"use client";

import React, { useState } from "react";
import Activity from "./activity";

export default function Page() {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [data, setData] = useState(null);

  const fetchData = async (studentNumber: string) => {
    const url = `http://localhost:8000/api/gamer/${studentNumber}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

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

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(studentNumber);
  };

  const handleSubmitAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    let data = {
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      student_number: e.target[2].value,
      membership_tier: e.target[3].value,
    };
    submitData(data);
  };

  return (
    <div>
      <h1>Page</h1>
      <h3>Search student</h3>
      <form onSubmit={handleSubmitSearch}>
        <input
          type="text"
          placeholder="Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {data && <div>{JSON.stringify(data)}</div>}
      <h3>Add student</h3>
      <form onSubmit={handleSubmitAddStudent}>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Student Number" />
        <label>
          Membership Type:
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      <h3>Add activity</h3>
      <Activity />
    </div>
  );
}
