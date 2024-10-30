import axios from "axios";
import useStore from "../store/store";
import { PCList } from "../interfaces/pc";

export const fetchPcStatus = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/activity/all/get-active-pcs");
    const pcList: PCList = { pcs: response.data };
    useStore.getState().setPCList(pcList);
  } catch (error) {
    console.error("Error fetching PC status:", error);
  }
};
