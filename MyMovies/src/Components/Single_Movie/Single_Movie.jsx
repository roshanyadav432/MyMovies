import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Single_Movie.css";
import Single_Video from "./Single_Video/Single_Video";

function Single_Movie() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    getMovieById();
    getSimilarMovies();
  }, [id]);

  async function getMovieById() {
    try {
      const Data = await axios.get(
        ` https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      console.log(Data.data);

      setMovieData(Data.data);
      SetLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSimilarMovies() {
    try {
      const Data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setSimilarMovies(Data.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="single_Main">
      {loading ? (
        <h1> Loading</h1>
      ) : (
        <div className="Upper">
          <div className="Poster">
            <img
              id="singleImg"
              src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
              alt="Image"
            />
          </div>
          <div className="overview">
            <h2 className="bgNone">{movieData.original_title}</h2>
            <p className="bgNone">{movieData.tagline}</p>
            <p className="bgNone">Rating: {movieData.vote_average}</p>
            <p className="bgNone">Release Date: {movieData.release_date}</p>
            <p className="bgNone">Budget: {movieData.budget}</p>
            <p className="bgNone">Revenue: {movieData.revenue}</p>
            <div className="contentType bgNone">
              {movieData.genres.map((tags) => {
                return (
                  <div className="tag bgNone" key={tags.id}>
                    <p className="bgNone" id="tagPara">
                      {tags.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {movieData && (
        <div className="about">
          <div className="overviewMobile">
            <h2 className="bgNone">{movieData.original_title}</h2>
            <p className="bgNone">{movieData.tagline}</p>
            <p className="bgNone">Rating: {movieData.vote_average}</p>
            <p className="bgNone">Release Date: {movieData.release_date}</p>
            <p className="bgNone">Budget: {movieData.budget}</p>
            <p className="bgNone">Revenue: {movieData.revenue}</p>
            <div className="contentType bgNone">
              {movieData.genres.map((tags) => {
                return (
                  <div className="tag bgNone" key={tags.id}>
                    <p className="bgNone" id="tagPara">
                      {tags.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sideBox">
            <div className="description">
              <h1>Synopsis:</h1>
              {movieData.overview}
            </div>

            <div className="video">
              <Single_Video id={movieData.id} />
            </div>
            <div className="similarMovies">
              <h1>Similar Movies:</h1>
              {similarMovies && (
                <div className="contents">
                  {similarMovies.map((movie) => {
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Single_Movie;
