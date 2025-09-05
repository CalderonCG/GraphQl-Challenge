import { FadeLoader } from "react-spinners";
import { characterAdapter } from "../../adapters/CharacterAdapter";
import type { GetCharacterByIdQuery } from "../../generated/graphql";
import DetailCard from "../DetailCard/DetailCard";
import "./CharacterDetails.scss";

type DetailsProps = {
  characterDetails: GetCharacterByIdQuery | undefined;
  loading: boolean;
};
function CharacterDetails({ characterDetails, loading }: DetailsProps) {
  if (loading) {
    return (
      <div className="details_status_container">
        <FadeLoader color="#A6A6A6" />
        <p className="details_status_container_label">Loading...</p>
      </div>
    );
  }
  if (characterDetails === undefined) {
    return (
      <div className="details_status_container">
        <p className="details_status_container_label">
          Please select a character
        </p>
      </div>
    );
  }
  const character = characterAdapter(characterDetails);

  if (character === null) {
    return (
      <div className="details_status_container">
        <p className="details_status_container_label">
          Character not found
        </p>
      </div>
    );
  }

  return (
    <div className="details">
      <img
        className="details_image"
        src={character.image ?? ""}
        alt={character.name ?? "character image"}
      />
      <h1>General Information</h1>
      <DetailCard name="Name" value={character.name ?? ""} />
      <DetailCard name="Species" value={character.species ?? "unknown"} />
      <DetailCard name="Status" value={character.status} />
      <DetailCard name="Gender" value={character.gender} />
      <DetailCard name="Location (name)" value={character.location} />
      <DetailCard name="Origin (name)" value={character.origin} />

      <h1>Episodes</h1>
      {character.episode.slice(0, 5).map((ep, index) => (
        <DetailCard key={index} name={ep} />
      ))}
    </div>
  );
}

export default CharacterDetails;
