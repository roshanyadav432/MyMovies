/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Card from "../Card/Card";
import Header from "../Header/Header";

function Home() {
  const [Data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    getData();
    console.log(searchData, "on home page");
  }, []);

  function handleSearch(text) {
    setSearchData(text);
  }

  async function getData() {
    try {
      const Data1 = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      setData(Data1.data.results);
    } catch (error) {
      alert(error.data);
    }
  }
  return (
    <>
      <Header handleSearch={handleSearch} />
      <div className="poster">
        <Carousel
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showStatus={false}
          transitionTime={20}
          showThumbs={false}
        >
          {Data.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <Card searchData={searchData} />
        {/* <MovieList /> */}
      </div>
    </>
  );
}

export default Home;
