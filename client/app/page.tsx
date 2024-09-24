"use client";

import React, { useState } from "react";

export default function Page() {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [data, setData] = useState(null);

  const fetchData = async (studentNumber:string) => {
    const url = `http://localhost:5000/gamer/${studentNumber}`;
    try {
      const response = await fetch(url);
      console.log("response: ", response);
      const data = await response.json();
      console.log("data: ", data);
      setData(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(studentNumber);
  };

  return <div>
    <h1>Page</h1>
    <p>Page content</p>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    {data && <div>{JSON.stringify(data)}</div>}
    <form>
      <input type="text" placeholder="First Name" />
      <button type="submit">Submit</button>
    </form>
  </div>
}
