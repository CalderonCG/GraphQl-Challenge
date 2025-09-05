import "./App.scss";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import List from "./components/List/List";

function App() {
  return (
    <div className="app">
      <div className="app_header"> Ravn Rick and Morty Registry</div>
      <div className="app_container">
        <List/>
        <CharacterDetails/>
      </div>
    </div>
  );
}

export default App;
