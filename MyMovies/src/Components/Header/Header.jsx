/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Logo from "../Image/ImdbLogo.png";
import "./Header.css";
import { useRef } from "react";
function Header({ handleSearch }) {
  const inpRef = useRef("");

  function handleOnChange() {
    // console.log(inpRef.current.value);
    handleSearch(inpRef.current.value);
  }
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to={"/"}>
          <img className="header_icon" src={`${Logo}`} />
        </Link>
        <Link to={"/movies/type/popular"} className="Link">
          <span> Popular</span>
        </Link>
        <Link to={"/movies/type/top_rated"} className="Link">
          <span>Top Rated</span>
        </Link>
        <Link to={"/movies/type/upcoming"} className="Link">
          <span> Upcoming</span>
        </Link>
      </div>
      <div className="right">
        <input
          type="text"
          placeholder="Serach here"
          id="input"
          ref={inpRef}
          onChange={() => {
            handleOnChange();
          }}
        />
        <button>Search</button>
      </div>
    </div>
  );
}

export default Header;
