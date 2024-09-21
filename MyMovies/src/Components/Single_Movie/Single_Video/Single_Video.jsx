import axios from "axios";
import "./Single_Video.css";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
function Single_Video({ id }) {
  const [trailer, setTrailer] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrailer();
  }, [id]);
  async function getTrailer() {
    const Data = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=4e44d9029b1270a757cddc766a1bcb63`
    );
    setTrailer(Data.data);
    setLoading(false);
  }
  return (
    <div className="video">
      <h2>Trailer:</h2>
      {loading ? (
        <h1>Loading Trailer..</h1>
      ) : (
        trailer.results.map((video) => {
          if (video.type == "Trailer") {
            return (
              <div className="trailer" key={video.key}>
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${video.key}?`}
                ></iframe>
              </div>
            );
          }
        })
      )}
      {/* <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/AhAqfLrYwDA?`}
      ></iframe> */}
    </div>
  );
}

export default Single_Video;

//api to get trailer of the movie:
//https://api.themoviedb.org/3/movie/1024721/videos?language=en-US&api_key=4e44d9029b1270a757cddc766a1bcb63
