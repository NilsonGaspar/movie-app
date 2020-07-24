import React, { useState } from 'react';
import Trailer from './components/MovieTrailer';
import Modal from 'react-modal';
import MovieList from './components/MovieList';
import './App.css';

const API_KEY = "API_KEY_HERE";


Modal.setAppElement('#root');

function App() {

  const [trailerList, setTrailerList] = useState([]); // TRAILER LIST
  const [showOverlay, setShowOverlay] = useState("overlay");
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '40%',
      transform: 'translate(-50%, -10%)',
      textAlign: 'center',
    },
    overlay: {
      backgroundColor: 'rgb(0, 0, 0, .5)',
    },
  };

  // GET VIDEO TRAILER
  document.onclick = function (event) { // check for any event that happens in the page
    const target = event.target; // store the content from the "event" into the variable target
    if (target.tagName.toLowerCase() === "img") { // change the image name to lower case and check if it is equal to "img"
      console.log(target);
      const movie_id = target.attributes.id.value; // get movie ID
      console.log("Movie ID: ", movie_id);

      const fetchTrailer = async () => {
        const TRAILER_PATH = `/movie/${movie_id}/videos`; // create url to search for movie id
        const response = await fetch(`https://api.themoviedb.org/3${TRAILER_PATH}?api_key=${API_KEY}&language=en-GB`);
        const data = await response.json();
        console.log("Trailer List: ", data.results);
        setTrailerList(data.results);

        // check if there is a trailer available
        if (data.results.length === 0) {
          console.log("No trailer found");
          setmodalIsOpen(true);
        }

      }
      fetchTrailer();
      setShowOverlay("overlay active");
    }
  }

  return (
    <div className="App">
      <div className={showOverlay} onClick={() => { setShowOverlay("overlay"); setTrailerList([]); }}></div>

      <div className="NavigationBar">
        <h1 className="logo"> 
            <a className="logo-link" href="index.html">Movie App</a>
        </h1>

      </div>

      <h3>Now Playing</h3>
      <MovieList URL="/movie/now_playing" thumbnail="big"/>

      <h3>Popular Movies</h3>
      <MovieList URL="/movie/popular" thumbnail="small"/>

      <h3>Up Coming</h3>
      <MovieList URL="/movie/upcoming" thumbnail="medium"/>

      <h3>Top Rated Movies</h3>
      <MovieList URL="/movie/top_rated" thumbnail="small"/>


      <div className="trailer-container">
        {trailerList.slice(0, 1).map(trailer => (
          <Trailer
            key={trailer.key}
            trailer_key={trailer.key}
          />
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => { setmodalIsOpen(false); setShowOverlay("overlay"); }} style={customStyles}>
        <p>SORRY, NO TRAILER AVAILABLE FOR THIS MOVIE</p>
      </Modal>

    </div>
  );
}


export default App;
