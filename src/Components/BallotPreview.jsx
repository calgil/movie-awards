import { useMovies } from "../providers/movies.provider";
import Nominee from "./Nominee";

export const BallotPreview = () => {
  const { ballotData, voteError, closeVoteModal, voteSuccess, confirmBallot } =
    useMovies();
  return (
    <div className="ballot-modal-bg">
      <div className="ballot-body">
        <div className="ballot-header">
          {voteSuccess && !voteError ? (
            <>
              <h2>Success</h2>
              <button className="close-btn" onClick={closeVoteModal}>
                X
              </button>
            </>
          ) : (
            <>
              <h2>Ballot Preview</h2>
              <button className="back-btn" onClick={closeVoteModal}>
                Change Vote
              </button>
            </>
          )}
        </div>
        {voteError && <h2 className="vote-error">{voteError}</h2>}
        {!voteError && (
          <>
            <div className="ballot-preview">
              {ballotData.map((vote) => (
                <div className="vote-display" key={vote.category.id}>
                  <h3 className="vote-title"> {vote.category.title}</h3>
                  <Nominee nominee={vote.nominee} />
                </div>
              ))}
              <button className="confirm-btn" onClick={confirmBallot}>
                Confirm Selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
