import { useEffect, useState } from "react";
import genreIds from "../utility/genre";
import { FaStar } from "react-icons/fa6";

function WatchList({ watchList, setWatchList, handleRemoveWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState(["All Genres"]);

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchList.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchList.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchList.map((movieObj) => {
      return genreIds[movieObj.genre_ids[0]];
    });
    temp = new Set(temp); // Set() repeated chijon ko ek baar deta hai, jaise multiple movie ke same genre hote hain so more genre ke boxex ban jayenge hence ek baar bane so used Set()
    setGenreList(["All Genres", ...temp]);
  }, [watchList]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 gap-5 pt-24 text-white">
        {genreList.map((genre) => {
          return (
            <div
              key={genre}
              onClick={() => handleFilter(genre)}
              className={
                currentGenre == genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem] font-bold text-white bg-blue-400 rounded-xl hover:cursor-pointer hover:scale-110 duration-300 border border-white"
                  : "flex justify-center items-center h-[3rem] w-[9rem] font-bold text-white bg-gray-400/50 rounded-xl hover:cursor-pointer hover:scale-110 duration-300 border border-white"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4 pt-7">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for Movies"
          className="h-[3rem] w-[20rem] md:w-[25rem] bg-gray-200 outline-none text-xl px-4 rounded-md"
        />
      </div>

      {/* Desktop view */}
      <div className="overflow-hidden hidden md:block rounded-lg border border-gray-200 m-8 mt-14 text-xl">
        <table className="w-full text-white text-center">
          <thead className="border-b-2 text-xl">
            <tr>
              <th>Name</th>
              <th className="flex justify-center ">
                <div onClick={sortIncreasing} className="p-2">
                  <i className="fa-solid fa-arrow-up cursor-pointer"></i>
                </div>
                <div className="p-2">
                  <div>Ratings</div>
                </div>
                <div onClick={sortDecreasing} className="p-2">
                  <i className="fa-solid fa-arrow-down cursor-pointer"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchList
              .filter((movieObj) => {
                if (currentGenre == "All Genres") {
                  return true;
                } else {
                  return genreIds[movieObj.genre_ids[0]] == currentGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2" key={movieObj.id}>
                    <td className="flex items-center px-6 py-4 gap-8">
                      <img
                        className="h-[6rem] w-[6rem] rounded-md bg-contain"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt={movieObj.title}
                      />
                      {movieObj.title}
                    </td>
                    <td>{movieObj.vote_average?.toFixed(1)}</td>
                    {/* (?) ye lagaya .toFixed(* ke pehle so that agar kisi movie ko koi rating na mili hotoh error nahi dega sirf warning dega*/}
                    <td>{movieObj.popularity?.toFixed(2)}</td>
                    <td>{genreIds[movieObj.genre_ids[0]]}</td>
                    <td
                      onClick={() => {
                        handleRemoveWatchList(movieObj);
                      }}
                    >
                      <button className="text-white bg-red-500 rounded-md px-3  cursor-pointer hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col gap-5 pt-8 md:hidden px-4 text-white">
        {watchList
          .filter((movieObj) => {
            if (currentGenre == "All Genres") {
              return true;
            } else {
              return genreIds[movieObj.genre_ids[0]] == currentGenre;
            }
          })
          .filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((movieObj) => (
            <div
              key={movieObj.id}
              className="flex items-center bg-gray-800 rounded-lg p-3 gap-4 space-y-2"
            >
              <img
                className="h-[7rem] w-[6rem] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                alt={movieObj.title}
              />
              <div className="flex-1">
                <div className="font-bold text-lg">{movieObj.title}</div>
                <div className="text-md text-gray-400 flex gap-5 items-center">
                  <span>{movieObj.popularity?.toFixed(2)}</span>
                  <span className="flex gap-1 items-center">
                    <FaStar className="text-yellow-300 text-sm" />
                    {movieObj.vote_average?.toFixed(1)}
                  </span>
                </div>
                <div className="text-sm text-blue-400">
                  {genreIds[movieObj.genre_ids[0]]}
                </div>
              </div>
              <button
                onClick={() => handleRemoveWatchList(movieObj)}
                className="text-white bg-red-500 rounded-md px-3 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default WatchList;
