import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import genreIds from "../utility/genre";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoLanguageSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { languageMap } from "../utility/language";

function Banner({ currentwood }) {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIndex(0);
  }, [movies]);

  useEffect(() => {
    let region = currentwood === "Indian" ? "IN" : "US";
    const fetchPages = async () => {
      const res1 = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=${region}`
      );
      const res2 = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2&region=${region}`
      );
      const combined = [...res1.data.results, ...res2.data.results];
      setMovies(combined);
    };
    fetchPages();
  }, [currentwood]);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % movies.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  if (movies.length === 0) return null;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const bgImage =
    window.innerWidth < 768
      ? movies[index].poster_path
        ? `https://image.tmdb.org/t/p/original/${movies[index].poster_path}`
        : "/fallback.jpg"
      : movies[index].backdrop_path
      ? `https://image.tmdb.org/t/p/original/${movies[index].backdrop_path}`
      : movies[index].poster_path
      ? `https://image.tmdb.org/t/p/original/${movies[index].poster_path}`
      : "/fallback.jpg";

  const bgSize =
    window.innerWidth < 768
      ? "cover"
      : movies[index].backdrop_path
      ? "cover"
      : "contain";

  const handleClick = () => {
    navigate(`/movie/${movies[index].id}`);
  };

  return (
    <div
      role="img"
      aria-label={movies[index].title}
      className="min-h-screen flex transition-all duration-700"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: bgSize,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <span className="text-white text-3xl md:text-5xl w-full pt-56 pl-4 md:pl-16 font-extrabold bg-transparent flex flex-col">
        <span className="font-light text-2xl">
          {movies[index].genre_ids.length > 0
            ? genreIds[movies[index].genre_ids[0]]
            : "Unknown"}
        </span>
        {movies[index].title}
        <span className="font-light text-2xl flex gap-2 items-center pt-2">
          <IoLanguageSharp className="text-yellow-300" />
          {languageMap[movies[index].original_language] ||
            movies[index].original_language}
        </span>
        <span className="text-xl md:text-3xl pt-3 font-light">
          In cinemas on{" "}
          <span className="font-bold">
            {formatDate(movies[index].release_date)}
          </span>
        </span>
        <button
          onClick={handleClick}
          className="w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[13vw] md:py-3 mt-10 font-thin text-2xl border-2 border-yellow-400 text-yellow-400 rounded-lg flex items-center p-2 gap-2 justify-center hover:scale-110 duration-300"
        >
          <IoIosInformationCircleOutline />{" "}
          <span className="font-bold">Learn more</span>
        </button>
      </span>
    </div>
  );
}

export default Banner;
