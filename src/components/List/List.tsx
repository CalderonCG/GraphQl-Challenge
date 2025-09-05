import type { ErrorLike } from "@apollo/client";
import type { CharacterArray } from "../../App";
import CharacterCard from "../CharacterCard/CharacterCard";
import Loader from "../Loader/Loader";
import "./List.scss";

//Types-------------------
type ListProps = {
  characters: CharacterArray;
  loading: boolean;
  error: ErrorLike | undefined;
  handleSelect: React.Dispatch<React.SetStateAction<string | null>>;
};
function List({ characters, loading, handleSelect, error }: ListProps) {
  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="error">Failed to Load Data</p>
      ) : (
        <>
          {characters?.map((character) =>
            character?.id && character.name && character.species ? (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                species={character.species}
                handleSelect={handleSelect}
              />
            ) : null
          )}
        </>
      )}
    </div>
  );
}

export default List;
