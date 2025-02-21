import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${searchQuery}`);
        setMovies(res.data.description || []); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">
        Search Results for <span className="underline">{searchQuery}</span>
      </h2>
      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <li
              key={index}
              className="bg-gray-600 bg-opacity-10 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-102 hover:shadow-2xl"
            >
              <img
                src={movie["#IMG_POSTER"]}
                alt={movie["#TITLE"]}
                className="w-full h-52 object-cover object-top cursor-pointer"
              />
              <div className="p-4 text-white">
                <h3 className="text-xl font-bold">{movie["#TITLE"]}</h3>
                <p className="text-gray-200">{movie["#YEAR"]}</p>
                <p className="text-sm text-gray-300">{movie["#ACTORS"]}</p>
                <a
                  href={movie["#IMDB_URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-300 hover:text-blue-500 hover:underline"
                >
                  View on IMDb
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-center text-lg">No results found</p>
      )}
    </div>
  );
};

export default Home;
