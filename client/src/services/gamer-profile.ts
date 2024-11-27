import { GamerProfile } from "../interfaces/gamer-profile";

export const addGamerProfile = async (gamerProfile: GamerProfile) => {
  const url = `/api/gamer`;
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
  const url = `/api/gamer/${studentNumber}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Gamer not found. ${error}`);
  }
};
