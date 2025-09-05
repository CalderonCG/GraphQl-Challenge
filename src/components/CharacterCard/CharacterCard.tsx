import { RiArrowRightSLine } from "react-icons/ri";
import "./CharacterCard.scss";
function CharacterCard() {
  return (
    <div className="card">
      <div className="card_data">
        <h1 className="card_data_name">Luke Skywalker</h1>
        <p className="card_data_specie">Human from Tatooine</p>
      </div>
      <RiArrowRightSLine className="card_icon"/>

    </div>
  );
}

export default CharacterCard;
