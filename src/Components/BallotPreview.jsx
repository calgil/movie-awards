import { useMovies } from "../providers/movies.provider";
import Nominee from "./Nominee";

export const BallotPreview = () => {
  const { ballotData, voteError, closeVoteModal, voteSuccess, confirmBallot } =
    useMovies();
  return (
    <div className="ballot-modal-bg">
      <div className="ballot-body">
        {!voteSuccess && (
          <button className="back-btn" onClick={closeVoteModal}>
            Vote Again
          </button>
        )}
        {voteError && <h2 className="vote-error">{voteError}</h2>}
        {!voteError && (
          <>
            <h2>{voteSuccess ? "Success" : "Ballot Preview"}</h2>
            <div className="ballot-preview">
              {ballotData.map((vote) => (
                <div className="vote-display" key={vote.category.id}>
                  <h3 className="vote-title"> {vote.category.title}</h3>
                  <Nominee nominee={vote.nominee} />
                </div>
              ))}
              <button className="submit-btn" onClick={confirmBallot}>
                Confirm Selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
