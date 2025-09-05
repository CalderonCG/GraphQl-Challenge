import type { CharacterArray } from "../../App";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./List.scss";

//Types-------------------
type ListProps = {
  characters: CharacterArray;
  loading: boolean;
  handleSelect: React.Dispatch<React.SetStateAction<string | null>>
};
function List({ characters, loading, handleSelect }: ListProps) {
  if (loading) {
    return <p>Loading....</p>;
  }
  if (characters?.length === 0) {
    return <p>No hay personajes</p>;
  }
  return (
    <div className="list">
      {characters?.map((character) => 
        character?.id && character.name && character.species ? (
        <CharacterCard key={character.id} id={character.id} name={character.name}
        species={character.species} handleSelect={handleSelect}/>  ) : null
      )}
    </div>
  );
}

export default List;
