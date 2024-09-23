"use client";

import React, { useState }from "react";

export default function Page() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/gamer/12345678");
      console.log("response: ", response);
      const data = await response.json();
      console.log("data: ", data);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <div>
    <h1>Page</h1>
    <p>Page content</p>
    <button onClick={fetchData}>Create Gamer</button>
    {data && <div>{JSON.stringify(data)}</div>}
  </div>
}
