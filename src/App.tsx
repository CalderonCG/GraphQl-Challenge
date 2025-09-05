import { useQuery } from "@apollo/client/react";
import "./App.scss";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import List from "./components/List/List";
import { GET_BY_ID, GET_CHARACTERS } from "./queries/character";
import type { GetCharacterByIdQuery, GetCharacterByIdQueryVariables, GetCharactersQuery, GetCharactersQueryVariables } from "./generated/graphql";
import { useEffect, useRef, useState } from "react";

//Types----------------
export type CharacterArray =
  NonNullable<GetCharactersQuery["characters"]>["results"];

function App() {
  //States------------------------------------------------
  const [selectedCharacter, setSelectedCharacter] = useState<string|null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); //Reference to the element to be observed
  


  //Queries---------------------------------------------------
  //All characters
  const {data, loading, error, fetchMore , networkStatus} = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GET_CHARACTERS, {
    variables:{
      page: 1
    }
  })
  const characters: CharacterArray = data?.characters?.results ?? []

  //Character by ID
  const {data: characterDetails, loading: characterLoading} = useQuery<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>(
    GET_BY_ID,{
      variables: {
        id: selectedCharacter || ""
      },
      skip: !selectedCharacter
    }
  )

  //Pagination functions----------------------------------------------
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
        console.log("Llamar a fetchMore aquí");
        loadMore();
        
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [data?.characters?.info?.next, fetchMore]);



  //Component-------------------------------------
  return (
    <div className="app">
      <div className="app_header"> Ravn Rick and Morty Registry</div>
      <div className="app_container">
        <List characters={characters} loading={loading} handleSelect={setSelectedCharacter} error={error}
        loadMoreRef={loadMoreRef} networkStatus={networkStatus}
        />
        <CharacterDetails characterDetails={characterDetails} loading={characterLoading}/>
      </div>
    </div>
  );
}

export default App;
