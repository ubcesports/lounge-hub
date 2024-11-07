import { GamerProfile } from "../interfaces/gamer-profile";

const API_URL = "http://localhost:8000/api";

export const addGamerProfile = async (gamerProfile: GamerProfile) => {
  const url = `${API_URL}/gamer`;
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gamerProfile),
  };

  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getGamerProfile = async (studentNumber: string) => {
  const url = `${API_URL}/gamer/${studentNumber}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Gamer not found.");
  }
};
