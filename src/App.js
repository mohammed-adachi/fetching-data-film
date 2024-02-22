import React, { useState, useEffect } from 'react';
import './App.css';
import Film from './movie.jsx';

const API_Key = 'http://www.omdbapi.com?apikey=6a4408af'; // URL complète pour l'API Key

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_Key}&s=${title}`); // Utilisation du titre directement dans l'URL
      const data = await response.json();
      setMovies(data.Search || []); // Utilisation de data.Search ou un tableau vide si data.Search est undefined
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm); // Appeler searchMovies avec le terme de recherche actuel
  }, [searchTerm]); // Exécuter useEffect lorsque searchTerm change

  return (
    <div className="app">
      <h1>Les films</h1>
      <div className='search'>
        <input placeholder="Recherche sur le film" onChange={e => setSearchTerm(e.target.value)}></input>
        <img
        src='srcIcon'
        alt='cherche'
        onClick={() => {}}>
      </img>
      </div>
      
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <Film key={index} movie={movie} /> // Ajouter une clé unique pour chaque composant Film
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>Aucun film trouvé</h2>
        </div>
      )}
    </div>
  );
};

export default App;
