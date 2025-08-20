import { useEffect, useState } from "react";
import Movies from "./components/Movies";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [pageNo, setPageNo] = useState(() => {
    return Number(localStorage.getItem("pageNo")) || 1;
  });
  const [search, setSearch] = useState("");
  let [watchList, setWatchList] = useState([]);
  const [currentwood, setCurrentWood] = useState(
    localStorage.getItem("currentwood") || "Indian"
  );

  let handleAddWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  let handleRemoveWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filteredWatchList);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  useEffect(() => {
    localStorage.setItem("currentwood", currentwood);
  }, [currentwood]);

  return (
    <>
      <BrowserRouter>
        <Navbar
          watchList={watchList}
          search={search}
          setSearch={setSearch}
          setPageNo={setPageNo}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner currentwood={currentwood} />
                <Movies
                  pageNo={pageNo}
                  setPageNo={setPageNo}
                  watchList={watchList}
                  handleAddWatchList={handleAddWatchList}
                  handleRemoveWatchList={handleRemoveWatchList}
                  currentwood={currentwood}
                  setCurrentWood={setCurrentWood}
                  search={search}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchList={watchList}
                setWatchList={setWatchList}
                handleRemoveWatchList={handleRemoveWatchList}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
