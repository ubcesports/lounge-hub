import { useEffect, useState } from "react";
import { getRecentActivity } from "../../services/activity";
import { getGamerProfile } from "../../services/gamer-profile";

export default function Activity() {
  const [recentLogs, setRecentLogs] = useState([]);

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
        setRecentLogs(activitiesWithProfiles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();

    const intervalId = setInterval(fetchActivities, 5000);
    return () => clearInterval(intervalId);
  }, []);

  function formatLogData(log) {
    const startedDate = new Date(log.started_at);
    const endedDate = log.ended_at ? new Date(log.ended_at) : null;

    const dateFormatted = `${String(startedDate.getMonth() + 1).padStart(2, "0")}-
                            ${String(startedDate.getDate()).padStart(2, "0")}-
                            ${startedDate.getFullYear()}`;
    const startTimeFormatted = startedDate.toTimeString().slice(0, 5);
    const endTimeFormatted = endedDate?.toTimeString().slice(0, 5);

    return `${log.student_number} ・ 
            ${dateFormatted} ・ 
            Started ${startTimeFormatted} ・ 
            Ended ${endTimeFormatted || "N/A"} ・ 
            ${log.pc_number} ・ 
            ${log.game}`;
  }

  return (
    <div>
      <h1 className="text-xl">Activity Log</h1>
      <div className="bg-gray-900 p-4">
        {recentLogs.map((log) => (
          <div className="mb-4 border-b border-gray-700 pb-4">
            <h1 className="text-xl text-white">
              {log.first_name} {log.last_name}
            </h1>
            <p className="text-sm text-gray-400">{formatLogData(log)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
