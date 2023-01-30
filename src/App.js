import { useEffect } from "react";
import { BallotPreview } from "./Components/BallotPreview";
import { Category } from "./Components/Category";
import { useMovies } from "./providers/movies.provider";

function App() {
  const { categories, submitBallot, voteCast } = useMovies();

  useEffect(() => {
    if (voteCast) {
      return (document.body.style.overflow = "hidden");
    }
    document.body.style.overflow = "unset";
  }, [voteCast]);

  return (
    <div className="app">
      {voteCast && <BallotPreview />}
      <>
        <header>
          <h1>Awards 2021</h1>
        </header>
        {categories &&
          categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        <button className="submit-btn" type="submit" onClick={submitBallot}>
          Submit Ballot Button
        </button>
      </>
    </div>
  );
}

export default App;
