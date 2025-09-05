
import { FadeLoader } from "react-spinners";
import "./Loader.scss";

function Loader() {
  return (
<div className="loader">
  <div className="loader_icon_wrapper">
    <FadeLoader color="#A6A6A6"  />
  </div>
  <p className="loader_label">Loading...</p>
</div>

  );
}

export default Loader;
