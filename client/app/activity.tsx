import { useState } from 'react';

export default function Activity() {
  const initialPCs = Array.from({ length: 5 }, (_, i) => ({
    pcNumber: `PC${i + 1}`,
    studentNumber: '',
    game: 'valorant',
    countdown: null,
    intervalId: null
  }));

  const [pcs, setPcs] = useState(initialPCs);

  const handleInputChange = (index, field, value) => {
    const updatedPCs = pcs.map((pc, i) =>
      i === index ? { ...pc, [field]: value } : pc
    );
    setPcs(updatedPCs);
  };

  const handleStart = async (index) => {
    const selectedPC = pcs[index];
    const membershipTier = await fetchGamerMemberTier(selectedPC.studentNumber);
    if (!membershipTier) {
        return;
    }
    const timerDuration = membershipTier === 2 ? 120*60 : 60*60; //seconds
    
    const intervalId = setInterval(() => {
        setPcs((prevPcs) => {
          return prevPcs.map((pc, i) => {
            if (i === index && pc.countdown > 0) {
              return { ...pc, countdown: pc.countdown - 1 };
            }
            if (pc.countdown === 0) {
              clearInterval(pc.intervalId);
            }
            return pc;
          });
        });
      }, 1000);
    const updatedPCs = pcs.map((pc, i) =>
      i === index ? { ...pc, countdown: timerDuration, intervalId } : pc
    );
    setPcs(updatedPCs);
    let data = {
      student_number: selectedPC.studentNumber,
      pc_number: index + 1,
      game: selectedPC.game,
    };
    await createActivityEntry(data);
  };

  const handleStop = async (index) => {
    const selectedPC = pcs[index];
    clearInterval(selectedPC.intervalId);
    await stopActivityEntry(selectedPC.studentNumber);
    const updatedPCs = pcs.map((pc, i) =>
        i === index
          ? { ...pc, studentNumber: '', game: 'valorant', countdown: null, intervalId: null }
          : pc
      );
    setPcs(updatedPCs);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <div>
        {pcs.map((pc, index) => (
          <div key={pc.pcNumber}>
            <div>{pc.pcNumber}</div>
            <input
              type="text"
              placeholder="Student Number"
              value={pc.studentNumber}
              onChange={(e) => handleInputChange(index, 'studentNumber', e.target.value)}
            />
            <label>
              Game:
              <select
                value={pc.game}
                onChange={(e) => handleInputChange(index, 'game', e.target.value)}
              >
                <option value="valorant">Valorant</option>
                <option value="league">League</option>
              </select>
            </label>
            <button onClick={() => handleStart(index)}>Start</button>
            <button onClick={() => handleStop(index)}>Stop</button>
            {pc.countdown && 
            <div>
                Time left: {formatTime(pc.countdown)}
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

const fetchGamerMemberTier = async (studentNumber: string) => {
    const url = `http://localhost:8000/api/gamer/${studentNumber}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.membership_tier;

    } catch (error) {
      console.log("Error:", error);
    }
};

const createActivityEntry = async (data: any) => {
  const url = "http://localhost:8000/api/activity";
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
}

const stopActivityEntry = async (studentNumber: string) => {
    const url = `http://localhost:8000/api/activity/update/${studentNumber}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log("Activity updated:", data);
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
}
