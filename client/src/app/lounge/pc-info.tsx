import { PC } from "../../interfaces/pc";

interface PCInfoProps {
  pc: PC;
  timeRemaining: string;
  isOccupied: boolean;
}

const PcInfo: React.FC<PCInfoProps> = ({ pc, timeRemaining, isOccupied }) => {
  return (
    <div>
      <h1>{timeRemaining}</h1>
    </div>
  );
};

export default PcInfo;
