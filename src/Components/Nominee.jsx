import React from "react";
import { useMovies } from "../providers/movies.provider";

const Nominee = ({ nominee, category, isSelected }) => {
  const { selectNominee } = useMovies();
  const handleNomineeSelection = () => {
    selectNominee(category, nominee);
  };
  return (
    <div className={isSelected ? "nominee selected" : "nominee"}>
      <h4>{nominee.title}</h4>
      <div className="nominee-photo">
        <img crossOrigin src={nominee.photoUrL} alt={nominee.title} />
      </div>
      <button className="select-btn" onClick={handleNomineeSelection}>
        Select Nominee
      </button>
    </div>
  );
};
export default Nominee;
