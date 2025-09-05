import { FadeLoader } from "react-spinners";
import { characterAdapter } from "../../adapters/CharacterAdapter";
import type { GetCharacterByIdQuery } from "../../generated/graphql";
import DetailCard from "../DetailCard/DetailCard";
import "./CharacterDetails.scss";
import type { ApolloError } from "@apollo/client";

type DetailsProps = {
  characterDetails: GetCharacterByIdQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};
function CharacterDetails({ characterDetails, loading, error }: DetailsProps) {
  if (loading) {
    return (
      <div className="details_status_container">
        <FadeLoader color="#A6A6A6" />
        <p className="details_status_container_label">Loading...</p>
      </div>
    );
  }

  const character = characterAdapter(characterDetails);

  const statusMessage = error
    ? error.message
    : characterDetails === undefined
    ? "Please select a character"
    : null;

  if (statusMessage || character === null) {
    return (
      <div className="details_status_container">
        <p className={`details_status_container_label ${error ? "error" : ""}`}>
          {statusMessage ? statusMessage : "Character not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="details_header">

        <div className="details_header_data">
          <p className="details_header_label">Name</p>
          <p className="details_header_title">{character.name}</p>
        </div>
                <img
          className="details_image"
          src={character.image ?? ""}
          alt={character.name ?? "character image"}
        />
      </div>

      <h1>General Information</h1>
      <DetailCard name="Species" value={character.species} />
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
