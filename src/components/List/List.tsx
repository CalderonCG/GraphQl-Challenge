import type { ApolloError} from "@apollo/client";
import type { CharacterArray } from "../../App";
import CharacterCard from "../CharacterCard/CharacterCard";
import Loader from "../Loader/Loader";
import "./List.scss";
import type { NetworkStatus } from "@apollo/client";

//Types-------------------
type ListProps = {
  characters: CharacterArray;
  loading: boolean;
  error: ApolloError | undefined;
  loadMoreRef: React.RefObject<HTMLDivElement | null>
  networkStatus: NetworkStatus
  handleSelect: React.Dispatch<React.SetStateAction<string | null>>;
  
};
function List({ characters, loading, loadMoreRef, handleSelect, error, networkStatus }: ListProps) {
  return (
    <div className="list">
      {(loading  && networkStatus === 1) ? (
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
      <div ref={loadMoreRef}></div>
      
      {(loading && networkStatus !== 1) && <Loader/>}
    </div>
  );
}

export default List;
