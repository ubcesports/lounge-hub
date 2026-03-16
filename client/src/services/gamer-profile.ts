import { GamerProfile } from "../interfaces/gamer-profile";
import toastNotify from "../app/toast/toastNotifications";

export const addGamerProfile = async (gamerProfile: GamerProfile) => {
  const url = `/api/gamer`;
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      student_number: gamerProfile.studentNumber,
      first_name: gamerProfile.firstName,
      last_name: gamerProfile.lastName,
      membership_tier: gamerProfile.membershipTier,
    }),
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
    toastNotify.error(`Gamer not found. ${error}`);
  }
};
