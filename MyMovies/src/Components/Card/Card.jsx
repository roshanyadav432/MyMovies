/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Card.css";
// import SkeletonClass from "../Skeleton/Skeleton";
function Card({ searchData }) {
  const [loading, SetLoading] = useState(true);
  const { type } = useParams();
  const [serached, setSearched] = useState();
  const [movieType, setMovieType] = useState([]);

  useEffect(() => {
    // console.log("type", type);
    serached ? getSearchedItem() : Fetch(), { passive: true };
    // Fetch();
    SetLoading(false);
  }, [type]);

  async function Fetch() {
    try {
      const Data = await axios.get(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      // console.log(Data);
      setMovieType(Data.data.results);

      // setMovieType(Data);
    } catch (error) {
      alert(error.data);
    }
  }

  async function getSearchedItem() {
    const Data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchData}&api_key=4e44d9029b1270a757cddc766a1bcb63`
    );
    setSearched(serached);
    setMovieType(Data.data.results);
  }
  searchData && getSearchedItem();
  return (
    <div className="main">
      {loading ? (
        <h1 style={{ color: "white" }}>Loading</h1>
      ) : (
        <>
          {type ? <h2>{type.toUpperCase()}</h2> : <h1>Popular</h1>}
          {/* <SkeletonClass /> */}
          <div className="contents">
            {movieType.map((movie) => {
              return (
                <div className="cardContent" key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      id="contentImg"
                      src={`https://image.tmdb.org/t/p/original${
                        movie && movie.backdrop_path
                      }`}
                      alt="Image"
                    />
                    <div className="content-overlay">
                      Tittle: {movie ? movie.original_title : ""}
                      <br />
                      Release Date: {movie ? movie.release_date : ""}
                      <br />
                      Star: {movie ? movie.vote_average : ""}
                      <br />
                      {movie ? movie.overview : ""}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
