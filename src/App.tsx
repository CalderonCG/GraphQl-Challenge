import { useQuery } from "@apollo/client/react";
import "./App.scss";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import List from "./components/List/List";
import { GET_BY_ID, GET_CHARACTERS } from "./queries/character";
import type {
  GetCharacterByIdQuery,
  GetCharacterByIdQueryVariables,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "./generated/graphql";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoReorderThreeOutline } from "react-icons/io5";

//Types----------------
export type CharacterArray = NonNullable<
  GetCharactersQuery["characters"]
>["results"];

function App() {
  //States------------------------------------------------
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null); //Reference to the element to be observed
  const [showSideBar, setShowSideBar] = useState(false);

  //Queries---------------------------------------------------
  //All characters
  const { data, loading, error, fetchMore, networkStatus } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: {
      page: 1,
    },
  });
  const characters: CharacterArray = data?.characters?.results ?? [];

  //Character by ID
  const {
    data: characterDetails,
    loading: characterLoading,
    error: detailsError,
  } = useQuery<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>(
    GET_BY_ID,
    {
      variables: {
        id: selectedCharacter || "",
      },
      skip: !selectedCharacter,
    }
  );

  //Functions----------------------------------------------
  //Pagination observer, checks if the div at the end of the list is visible, if it is then calls loadMore
  useEffect(() => {
    const loadMore = () => {
      if (!data?.characters?.info?.next) {
        return;
      }
      fetchMore({
        variables: {
          page: data.characters.info.next,
        },
      });
    };

    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        loadMore();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [data?.characters?.info?.next, fetchMore]);

  //Closes the sidebar when a character is selected
  useEffect(()=>{
    setShowSideBar(false)
  },[selectedCharacter])

  //Component-------------------------------------
  return (
    <div className="app">
      <div className="app_header">
        {/* Sidebar controls---------------------------------------------- */}
        {showSideBar ? (
          <IoClose className="app_header_icon" onClick={()=>setShowSideBar(false)} />
        ) : (
          <IoReorderThreeOutline className="app_header_icon" onClick={()=>setShowSideBar(true)} />
        )}
        <p>Ravn Rick and Morty Registry</p>
      </div>
      <div className="app_container">
        {/* List of characters ------------------------------------------------- */}
        <List
          characters={characters}
          loading={loading}
          handleSelect={setSelectedCharacter}
          error={error}
          loadMoreRef={loadMoreRef}
          networkStatus={networkStatus}
          showSideBar={showSideBar}
        />

        {/* Character details----------------------------------------------------- */}
        <CharacterDetails
          characterDetails={characterDetails}
          loading={characterLoading}
          error={detailsError}
        />
      </div>
    </div>
  );
}

export default App;
