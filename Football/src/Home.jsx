import { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { MatchContext } from './context/MatchContext'
import SearchBar from './SearchBar'

const FootballResults = () => {
  const [results, setResults] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
 
  


  const { addToFav
    } = useContext(MatchContext)

  useEffect(() => {
    const apiKey = '4498ab951e3c435da2fcdfb23017af87'; // Remplacez par votre clé d'API
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/CL/matches'; // Endpoint des matchs

    axios.get(apiUrl, {
      headers: {
        'X-Auth-Token': apiKey,
      },
    })
    .then((response) => {
      setResults(response.data.matches); // Mettez à jour l'état avec les résultats des matchs
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  
  return (
    <>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1500vh' }}>
        <div>
          <h2>Résultats des matchs de Ligue des Champions</h2>
          <SearchBar />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {results.map((match) => (
              <div key={match.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '300px' }}>
                <p>{(match.utcDate).slice(0,10)} - {(match.utcDate).slice(11,-1)}</p>
                <h3>{match.homeTeam.name} vs {match.awayTeam.name}</h3>
                <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                <button onClick={() => addToFav(match)} className='absolute bottom-0 inset-x-9'>Ajouter a mes matchs</button>
                {/* Ajoutez d'autres détails du match si nécessaire */}
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FootballResults;
