import useBoundStore from "../../store/store";
import { initialGamerState } from "../../store/gamer-store";

export default function StudentInfo() {
  const gamer = useBoundStore((state) => state.GamerProfile);

  return (
    <div>
      <h1>Student info</h1>
      {gamer !== initialGamerState && (
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <h3>First Name</h3>
              <p>{gamer.firstName}</p>
            </div>
            <div>
              <h3>Surname</h3>
              <p>{gamer.lastName}</p>
            </div>
            <div>
              <h3>Membership Level</h3>
              <p>{gamer.membershipTier}</p>
            </div>
            <div>
              <h3>Student Number</h3>
              <p>{gamer.studentNumber}</p>
            </div>
          </div>
          <div>
            <h3>Notes</h3>
            <p>{gamer.notes}</p>
          </div>
        </>
      )}
    </div>
  );
}
