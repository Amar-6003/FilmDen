import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import { languageMap } from "../utility/language";
import { IoLanguageSharp } from "react-icons/io5";
import { FaRegClock, FaRegPlayCircle } from "react-icons/fa";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    // movie details
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      )
      .then((res) => setMovie(res.data));

    // movie trailer
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      )
      .then((res) => {
        const trailer = res.data.results.find((v) => v.type === "Trailer");
        setTrailerKey(trailer?.key || null);
      });
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatRuntime(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  const bgImage =
    window.innerWidth < 768
      ? movie.poster_path
        ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        : "/fallback.jpg"
      : movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
      : movie.poster_path
      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
      : "/fallback.jpg";

  return (
    <div
      role="img"
      aria-label={movie.title}
      className="text-white min-h-screen flex flex-col md:flex-row justify-center pt-28 gap-12 p-4 items-center"
    >
      <img
        className="h-[30rem] w-[20rem] rounded-xl"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        style={{ boxShadow: "0 20px 40px rgba(0,0,0,1)" }}
      />
      <div className="flex flex-wrap flex-col gap-3 md:w-[70vw] md:pt-10">
        <span className="text-2xl">
          {movie.genres.map((genre) => genre.name).join(", ")}
        </span>
        <span className="text-4xl md:text-7xl font-extrabold">
          {movie.title}
        </span>
        <div className="space-y-3">
          <p className="text-2xl font-light flex items-center gap-2 mt-2">
            <IoLanguageSharp className="text-yellow-300" />
            {languageMap[movie.original_language]}
            <span className="flex items-center gap-2">
              <FaRegClock className="text-yellow-300 ml-8 text-xl" />
              {movie.runtime ? formatRuntime(movie.runtime) : "Coming soon ⏳"}
            </span>
          </p>
          <p className="text-md md:text-xl font-sans">{movie.overview}</p>
          <div className="text-2xl">
            Release date: {formatDate(movie.release_date)}
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${trailerKey}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-[55vw] sm:w-[40vw] md:w-[30vw] lg:w-[13vw] md:py-4 mt-5 font-thin text-2xl text-black bg-yellow-400 rounded-lg flex items-center p-2 gap-2 justify-center hover:scale-110 duration-300">
              <FaRegPlayCircle />
              <span>Watch Trailer</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
