import { Activity } from "../interfaces/activity";
import { useEffect } from "react";
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
  const response = await fetch(url, settings);
  const data = await response.json();
  return data;
};

export const checkOutGamer = async (
  studentNumber: string,
  pcNumber: number,
) => {
  if (!studentNumber) {
    alert("This table is not occupied.");
    return;
  }
  const url = `${API_URL}/activity/update/${studentNumber}`;
  const settings = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    await fetch(url, settings);
    const store = useBoundStore.getState();
    store.resetPCState(pcNumber);
    return;
  } catch (error) {
    return error;
  }
};

export const useFetchPCStatus = () => {
  useEffect(() => {
    fetchPCStatus();
  }, []);
};

export const fetchPCStatus = async () => {
  const url = `${API_URL}/activity/all/get-active-pcs`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const store = useBoundStore.getState();
    store.setPCList(data);
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
    },
  };

  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const useFetchActivities = () => {
  useEffect(() => {
    fetchActivities();
  }, []);
};

export const fetchActivities = async () => {
  try {
    const store = useBoundStore.getState();
    const activities = await getRecentActivity();
    store.setLogList(activities);
  } catch (error) {
    console.error(error);
  }
};
