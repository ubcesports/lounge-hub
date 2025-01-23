import { Activity } from "../interfaces/activity";
import { useEffect } from "react";
import useBoundStore from "../store/store";

export const checkInGamer = async (activity: Activity) => {
  const url = `/api/activity`;
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
  if (response.status === 400) {
    alert(
      "Tier 1 members should only be able to check in once a day. If you wish to proceed, do nothing. Otherwise, please just sign the user out normally.",
    );
  } else if (response.status === 404) {
    throw new Error("Student not found.");
  }
  return data;
};

export const checkOutGamer = async (
  studentNumber: string,
  pcNumber: number,
  execName: string,
): Promise<boolean> => {
  if (!studentNumber) {
    alert("This table is not occupied.");
    return false;
  }
  if (!execName) {
    alert("Please enter your name.");
    return false;
  }
  const url = `/api/activity/update/${studentNumber}`;
  const settings = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ execName }),
  };

  try {
    await fetch(url, settings);
    const store = useBoundStore.getState();
    store.resetPCState(pcNumber);
    return true;
  } catch (error) {
    console.error("Error checking out gamer:", error);
    return false;
  }
};

export const useFetchPCStatus = () => {
  useEffect(() => {
    fetchPCStatus();
  }, []);
};

export const fetchPCStatus = async () => {
  const url = `/api/activity/all/get-active-pcs`;
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
  const url = `/api/activity/all/recent`;
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
