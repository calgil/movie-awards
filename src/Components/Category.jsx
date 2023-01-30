import { useMovies } from "../providers/movies.provider";
import Nominee from "./Nominee";

export const Category = ({ category: { id, items, title } }) => {
  const { ballotData } = useMovies();
  const currentCategory = ballotData.find((vote) => vote.category.id === id);
  return (
    <div className="category">
      <h3>{title}</h3>
      <div className="nominee-container">
        {items &&
          items.map((nominee) => {
            const isSelected =
              !!currentCategory && currentCategory.nominee.id === nominee.id;
            return (
              <Nominee
                key={nominee.id}
                nominee={nominee}
                category={{ id, title }}
                isSelected={isSelected}
              />
            );
          })}
      </div>
    </div>
  );
};
