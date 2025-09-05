import type { ApolloError } from "@apollo/client";
import type { CharacterArray } from "../../App";
import CharacterCard from "../CharacterCard/CharacterCard";
import Loader from "../Loader/Loader";
import "./List.scss";
import type { NetworkStatus } from "@apollo/client";
import clsx from "clsx";

//Types-------------------
type ListProps = {
  characters: CharacterArray;
  loading: boolean;
  error: ApolloError | undefined;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  networkStatus: NetworkStatus;
  handleSelect: React.Dispatch<React.SetStateAction<string | null>>;
  showSideBar: boolean;
};

//Component----------------------------------------
function List({
  characters,
  loading,
  loadMoreRef,
  error,
  networkStatus,
  showSideBar,
  handleSelect,
}: ListProps) {
  return (
    //Only displays on mobile if showSideBar is true
    <div className={clsx("list",{
      display: showSideBar
    })}>
      {/* First loader only displays at the top on first render (network status === 1) */}
      {loading && networkStatus === 1 ? (
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

      {/* On different refetchs the loader appears at the end of the list */}
      {loading && networkStatus !== 1 && <Loader />}
    </div>
  );
}

export default List;
