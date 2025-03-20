import { Activity } from "../interfaces/activity";
import { useEffect } from "react";
import useBoundStore from "../store/store";
import toastNotify from "../app/toast/toastNotifications";

export const checkInGamer = async (activity: Activity) => {
  const continueCheckIn = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      toastNotify.buttonWarning(
        "This tier 1 member has already checked in today. Tier 1 members are only allowed to check in once a day. How would you like to proceed?",
        "Complete check in",
        "Cancel check in",
        () => {
          resolve(true);
        },
        () => {
          resolve(false);
        },
      );
    });
  };
  const tierOneCheckurl = `/api/activity/today/${activity.studentNumber}`;
  const tierOneCheckSettings = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const tierOneCheckResponse = await fetch(
      tierOneCheckurl,
      tierOneCheckSettings,
    );
    if (tierOneCheckResponse.status === 404) {
      await Promise.reject("Student not found.");
    }
    const tierOneCheckData = await tierOneCheckResponse.json();
    if (tierOneCheckData.length > 0) {
      const continueCheckInProcess = await continueCheckIn();
      if (!continueCheckInProcess) {
        await Promise.reject("Check in cancelled.");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
  const url = `/api/activity`;
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
    if (response.status === 404) {
      await Promise.reject("Student not found.");
    }
    const data = await response.json();
    toastNotify.success("User Checked In!");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkOutGamer = async (
  studentNumber: string,
  pcNumber: number,
  execName: string,
): Promise<boolean> => {
  if (!studentNumber) {
    toastNotify.error("This table is not occupied.");
    return false;
  }
  if (!execName) {
    toastNotify.error("Please enter your name.");
    return false;
  }
  const url = `/api/activity/update/${studentNumber}`;
  const settings = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pc_number: pcNumber, exec_name: execName }),
  };

  try {
    await fetch(url, settings);
    const store = useBoundStore.getState();
    store.resetPCState(pcNumber);
    toastNotify.success("User Checked Out!");
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

export const getRecentActivity = async (page: number, search: string) => {
  const url = `/api/activity/all/recent?page=${page}&limit=10&search=${search}`;
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

export const fetchActivities = async (page: number, search: string) => {
  try {
    const store = useBoundStore.getState();
    const activities = await getRecentActivity(page, search);
    store.setLogList(activities);
  } catch (error) {
    console.error(error);
  }
};
