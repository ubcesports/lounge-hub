import { Activity } from "../interfaces/activity";
import { useEffect } from "react";
import useBoundStore from "../store/store";
import { getGamerProfile } from "./gamer-profile";
import useStore from "../store/store";

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

export const checkOutGamer = async (
  studentNumber: string,
  pcNumber: number,
) => {
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
  const setLogList = useStore((state) => state.setLogList);
  const logList = useStore((state) => state.logList);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getRecentActivity();

        const activitiesWithProfiles = await Promise.all(
          activities.map(async (activity) => {
            const profile = await getGamerProfile(activity.student_number);

            return {
              first_name: profile.first_name,
              last_name: profile.last_name,
              ...activity,
            };
          }),
        );

        setLogList(activitiesWithProfiles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, [logList, setLogList]);
};
