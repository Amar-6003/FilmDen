import { useEffect, useRef, useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import RingLoader from "react-spinners/RingLoader";

function Movies({
  pageNo,
  setPageNo,
  watchList,
  handleAddWatchList,
  handleRemoveWatchList,
  currentwood,
  setCurrentWood,
  search,
}) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const prevWoodRef = useRef(currentwood);

  useEffect(() => {
    if (prevWoodRef.current !== currentwood) {
      setPageNo(1);
      prevWoodRef.current = currentwood;
    }
  }, [currentwood]);

  useEffect(() => {
    localStorage.setItem("pageNo", pageNo);
  }, [pageNo]);

  const handlePrevPage = () => {
    if (pageNo == 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    if (search.trim() !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&language=en-US&page=${pageNo}`
        )
        .then((res) => {
          setMovies(res.data.results);
        })
        .finally(() => setLoading(false));
    } else {
      let lang = currentwood === "Indian" ? "hi" : "en";
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang}&page=${pageNo}`
        )
        .then(function (res) {
          setMovies(res.data.results);
          setTotalPage(res.data.total_pages);
        })
        .finally(() => setLoading(false));
    }
  }, [search, pageNo, currentwood]);

  return (
    <div className="pt-14 min-h-screen">
      <div className="text-4xl md:text-5xl font-bold text-center pb-8 text-gray-100">
        Trending Movies
      </div>
      <div className="text-white flex gap-8 text-2xl justify-center pb-10">
        <button
          className={`border border-white rounded-xl px-4 py-2 ${
            currentwood === "Indian"
              ? " bg-blue-500 text-white border-blue-500"
              : "bg-transparent text-white border-white"
          }`}
          onClick={() => setCurrentWood("Indian")}
        >
          Indian
        </button>
        <button
          className={`border border-white rounded-xl px-4 py-2 ${
            currentwood === "Hollywood"
              ? " bg-blue-500 text-white border-blue-500"
              : "bg-transparent text-white border-white"
          }`}
          onClick={() => setCurrentWood("Hollywood")}
        >
          Hollywood
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center min-h-screen items-center">
          <RingLoader color="white" size={80} />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-evenly gap-4 pb-14">
          {movies.map((movieObj) => {
            return (
              <MovieCard
                key={movieObj.id}
                movieObj={movieObj}
                poster_path={movieObj.poster_path}
                name={movieObj.original_title}
                handleAddWatchList={handleAddWatchList}
                handleRemoveWatchList={handleRemoveWatchList}
                watchList={watchList}
              />
            );
          })}
        </div>
      )}

      <Pagination
        pageNo={pageNo}
        total_pages={totalPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default Movies;
