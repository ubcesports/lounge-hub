import { PC } from "../../interfaces/pc";

interface PCInfoProps {
  pc: PC;
  timeRemaining: string;
  isOccupied: boolean;
}

const PcInfo: React.FC<PCInfoProps> = ({ pc, timeRemaining, isOccupied }) => {
  return (
    <div>
      <h1>PC Info</h1>
      <p>PC Number: {pc.pcNumber}</p>
      <p>Student Number: {pc.studentNumber}</p>
      <p>Game: {pc.game}</p>
      <p>Started At: {pc.startedAt}</p>
      <p>First Name: {pc.firstName}</p>
      <p>Last Name: {pc.lastName}</p>
      <p>Membership Tier: {pc.membershipTier}</p>
      <p>Notes: {pc.notes}</p>
      <p>Time Remaining: {timeRemaining}</p>
      <p>Status: {isOccupied ? "Occupied" : "Available"}</p>
    </div>
  );
};

export default PcInfo;
