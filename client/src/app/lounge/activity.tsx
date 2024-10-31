import { useEffect, useState } from "react";
import { getRecentActivity } from "../../services/activity";

export default function Activity() {
  const [recentActivities , setRecentActivities]  = useState([])

  useEffect(()=>{

    const fetchActivities = async () => {
      try {
        const activities = await getRecentActivity();
        setRecentActivities(activities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
    const intervalId = setInterval(fetchActivities, 5000);
    return () => clearInterval(intervalId);
      
  },[])

  return (
    <div>
      <h1>Activity</h1> 
      <ul>
         {recentActivities.map((activity) => (
          <li><ul>
          {Object.entries(activity).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul></li>
         ))}
      </ul>
    </div>
  );
}
