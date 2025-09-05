import { useQuery } from "@apollo/client/react";
import "./App.scss";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import List from "./components/List/List";
import { GET_BY_ID, GET_CHARACTERS } from "./queries/character";
import type { GetCharacterByIdQuery, GetCharacterByIdQueryVariables, GetCharactersQuery, GetCharactersQueryVariables } from "./generated/graphql";
import { useState } from "react";

//Types----------------
export type CharacterArray =
  NonNullable<GetCharactersQuery["characters"]>["results"];

function App() {
  //States------------------------------------------------
  const [selectedCharacter, setSelectedCharacter] = useState<string|null>(null);


  //Queries---------------------------------------------------
  //All characters
  const {data, loading} = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GET_CHARACTERS, {
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

  console.log(characterDetails)


  //Component-------------------------------------
  return (
    <div className="app">
      <div className="app_header"> Ravn Rick and Morty Registry</div>
      <div className="app_container">
        <List characters={characters} loading={loading} handleSelect={setSelectedCharacter}/>
        <CharacterDetails characterDetails={characterDetails}/>
      </div>
    </div>
  );
}

export default App;
