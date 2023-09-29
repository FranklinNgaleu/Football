import { useEffect, useState } from 'react';
import axios from 'axios';
//import { MatchContext } from './context/MatchContext'


const Jouer = () => {
  const [results, setResults] = useState([]);
  const [teamSearchTerm, setTeamSearchTerm] = useState('');
  const [favoriteMatches, setFavoriteMatches] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);



  useEffect(() => {
    const apiKey = '4498ab951e3c435da2fcdfb23017af87'; // Remplacez par votre clé d'API
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/CL/matches'; // Endpoint des matchs

    axios.get(apiUrl, {
      headers: {
        'X-Auth-Token': apiKey,
      },
    })
    .then((response) => {
      // Filtrer les matchs dont la date est déjà passée
      const currentDate = new Date();
      const filteredResults = response.data.matches.filter((match) => {
        const matchDate = new Date(match.utcDate);
        return matchDate < currentDate;
      });
      setResults(filteredResults);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleSearchByTeam = () => {
    // Filtrer les résultats en fonction du nom de l'équipe saisi
    const filteredResults = results.filter((match) => {
      return (
        match.homeTeam.name.toLowerCase().includes(teamSearchTerm.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
      );
    });
    setResults(filteredResults);
  };

  const addToFavorites = (matchToAdd) => {
    // Vérifiez si le match n'est pas déjà dans la liste des favoris
    if (!favoriteMatches.some((match) => match.id === matchToAdd.id)) {
      // Ajoutez le match à la liste des favoris
      setFavoriteMatches([...favoriteMatches, matchToAdd]);
    }
  };

  const removeFromFavorites = (matchToRemove) => {
    const updatedFavorites = favoriteMatches.filter((match) => match.id !== matchToRemove.id);
    setFavoriteMatches(updatedFavorites);
  };
  
  
  
  return (
    <>
      <div style={{ display: 'bloc', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
        <div>
          <h2>Les matchs de Ligue des Champions</h2>
          <input
            type="text"
            placeholder="Rechercher un match par équipe"
            value={teamSearchTerm}
            onChange={(e) => setTeamSearchTerm(e.target.value)}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '300px' }}
          />
          <button onClick={handleSearchByTeam}  style={{ border: '1px solid #ccc', padding: '5px', margin: '8px', borderRadius: '5px', width: '100px' }}>Rechercher</button>
          <button onClick={() => setShowOnlyFavorites(!showOnlyFavorites)} style={{ border: '1px solid #ccc', padding: '5px', margin: '8px', borderRadius: '5px', width: '100px' }}>
            {showOnlyFavorites ? 'Tous les matchs' : 'Favoris'}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {showOnlyFavorites
          ? favoriteMatches.map((match) => (
              <div key={match.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '300px' }}>
                <p>{(match.utcDate).slice(0, 10)} - {(match.utcDate).slice(11, -1)}</p>
                <h3>{match.homeTeam.name} vs {match.awayTeam.name}</h3>
                <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                <button onClick={() => removeFromFavorites(match)} className='absolute bottom-0 inset-x-9'>Supprimer</button>
                {/* Affichez les détails du match favori ici */}
              </div>
            ))
          : results.map((match) => (
              <div key={match.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '300px' }}>
                <p>{(match.utcDate).slice(0,10)} - {(match.utcDate).slice(11,-1)}</p>
                <h3>{match.homeTeam.name} vs {match.awayTeam.name}</h3>
                <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                <button onClick={() => addToFavorites(match)} className='absolute bottom-0 inset-x-9'>Ajouter a mes matchs</button>
                {/* Affichez les détails du match ici */}
              </div>
            ))}
      </div>

    </>
  );
};

export default Jouer;
