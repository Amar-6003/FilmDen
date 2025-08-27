import { useNavigate } from "react-router-dom";

function MovieCard({
  movieObj,
  poster_path,
  handleAddWatchList,
  handleRemoveWatchList,
  watchList,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${movieObj.id}`);
  };

  return (
    <div>
      <div
        role="img"
        aria-label={movieObj.title}
        className="h-[60vh] xl:h-[65vh] w-[280px] lg:w-[20vw] mt-8 bg-center bg-cover bg-no-repeat rounded-xl hover:cursor-pointer hover:scale-105 duration-300 flex flex-col justify-between items-end border border-white"
        alt={movieObj.original_title}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
        }}
        onClick={handleClick}
      >
        {doesContain(movieObj) ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveWatchList(movieObj);
            }}
            className="m-4 flex justify-center items-center text-lg rounded-full h-8 w-8 bg-gray-900/60"
          >
            &#10060;
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation()
              handleAddWatchList(movieObj);
            }}
            className="m-4 flex justify-center items-center text-2xl rounded-full h-9 w-9 bg-gray-900/60"
          >
            &#128525;
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
