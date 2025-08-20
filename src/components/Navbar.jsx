import { useState } from "react";
import { RiMovie2AiLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = ({ setPageNo, search, setSearch }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Page 1 pe reset
    setPageNo(1);

    // Optional: Reset other filters if needed
    // setCurrentWood("Indian"); // ya default filter

    // Navigate to home
    navigate("/");

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (location.pathname.startsWith("/movie")) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-between fixed backdrop-blur-sm text-white w-full p-2 z-50 gap-5">
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-3 cursor-pointer"
      >
        <RiMovie2AiLine className="font-bold text-5xl" />
        <span className="text-4xl  hidden md:block font-bold">FilmDen</span>
      </div>

      {location.pathname !== "/watchlist" && (
        <div className="flex items-center gap-3 md:gap-8 mt-2">
          {expanded && (
            <input
              onChange={handleSearch}
              value={search}
              type="text"
              placeholder="Search..."
              className="text-lg md:text-xl py-1 px-4 md:py-2 w-[30vw] sm:w-[40vw] rounded-full outline-none bg-transparent border border-white"
              autoFocus
            />
          )}
          <IoSearchOutline
            className="text-3xl cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          />
          <Link to="/watchlist" className="text-2xl md:text-3xl mr-1 md:mr-5">
            WatchList
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
