import { RiArrowRightSLine } from "react-icons/ri";
import "./CharacterCard.scss";

// Types---------------------------------------------------------
type CharacterProps = {
  id: string;
  name: string;
  species: string;
  handleSelect: React.Dispatch<React.SetStateAction<string | null>>;
};

// Component--------------------------------------------------------------
function CharacterCard({ id, name, species, handleSelect}: CharacterProps) {
  return (
    <div className="card" onClick={()=> handleSelect(id)}>
      <div className="card_data">
        <h1 className="card_data_name">{name}</h1>
        <p className="card_data_specie">{species}</p>
      </div>
      <RiArrowRightSLine className="card_icon" />
    </div>
  );
}

export default CharacterCard;
