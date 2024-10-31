import { Activity } from "../interfaces/activity";

const API_URL = "http://localhost:8000/api";

export const checkInGamer = async (activity: Activity) => {
  const url = `${API_URL}/activity`;
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  };

  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};


export const getRecentActivity = async () => {
  const url = `${API_URL}/activity/all/recent`;
  const settings = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  };

  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};