import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = "API_KEY_HERE";
const IMG_URL_LQ = "https://image.tmdb.org/t/p/w500";

function MovieList({URL, thumbnail}) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
        const fetchData = async() => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(`https://api.themoviedb.org/3${URL}?api_key=${API_KEY}&language=en-GB`);
                setMovies(result.data.results);
                console.log("List Data: ", result.data.results)
            }
            catch (isError) {
                setIsError(true);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [URL]);

    return (
        <div className="movie-categories">
        {isError && <div>Something went wrong...</div>}

        {isLoading ? (
        <div>Loading...</div>
        ) : (<div className={`movie-container ${thumbnail}`}> {movies.map(movie => (
                <div className="movie-list" key={movie.id}>
                <img src={IMG_URL_LQ + movie.poster_path} id={movie.id} alt={movie.title} />
                <button className="btn-play"></button>
                </div>
            ))}</div>
            )}

        </div>
    )
 
}

export default MovieList