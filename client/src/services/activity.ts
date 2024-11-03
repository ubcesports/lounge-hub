import { Activity } from "../interfaces/activity";
import { useEffect } from 'react';
import useBoundStore from "../store/store";

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

export const useFetchPCStatus = () => {
  useEffect(() => {
    const fetchPCStatus = async () => {
      const url = `${API_URL}/activity/all/get-active-pcs`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const store = useBoundStore.getState();
        store.setPCList(data);
      } catch (error) {
        console.error("Error fetching PC status:", error);
      }
    };

    fetchPCStatus();
  }, []);
};