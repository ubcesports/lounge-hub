import { Activity } from "../interfaces/activity";

const API_URL = "http://localhost:8000/api";

export const checkInGamer = async (activity: Activity) => {
  console.log("Form submitted:", activity);
  alert(
    `Signed in: ${activity.studentNumber}, ${activity.game}, PC: ${activity.pc}`
  );
};
