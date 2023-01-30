import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api/Api";

const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [ballotData, setBallotData] = useState([]);
  const [voteCast, setVoteCast] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [voteSuccess, setVoteSuccess] = useState(false);

  const closeVoteModal = () => {
    setVoteCast(false);
  };

  const selectNominee = (category, nominee) => {
    const updateVote = ballotData.find(
      (vote) => vote.category.id === category.id
    );
    if (!updateVote) {
      return setBallotData([...ballotData, { category, nominee }]);
    }
    setBallotData(
      ballotData.map((vote) => {
        if (vote.category.id === category.id) {
          return { ...vote, category, nominee };
        }
        return vote;
      })
    );
  };

  const submitBallot = () => {
    setVoteCast(true);
    if (ballotData.length < 1) {
      return setVoteError("Must make at least one selection");
    }
    setVoteError("");
  };

  const confirmBallot = () => {
    console.log("confirm", voteError);
    if (voteError) {
      return;
    }
    setVoteSuccess(true);
  };

  useEffect(() => {
    api.getBallotData().then((res) => setCategories(res.items));
  }, []);
  return (
    <MoviesContext.Provider
      value={{
        categories,
        ballotData,
        selectNominee,
        submitBallot,
        voteCast,
        voteError,
        closeVoteModal,
        voteSuccess,
        confirmBallot,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  return {
    categories: context.categories,
    ballotData: context.ballotData,
    selectNominee: context.selectNominee,
    submitBallot: context.submitBallot,
    voteCast: context.voteCast,
    voteError: context.voteError,
    closeVoteModal: context.closeVoteModal,
    voteSuccess: context.voteSuccess,
    confirmBallot: context.confirmBallot,
  };
};
