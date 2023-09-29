import { useEffect, useState} from 'react';
import axios from 'axios';



const FootballResults = () => {
  const [results, setResults] = useState([]);
  const [teamSearchTerm, setTeamSearchTerm] = useState('');
  //const [selectedMatch, setSelectedMatch] = useState(null);
 
  


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

  
  return (
    <>
      
      <div style={{ display: 'bloc', justifyContent: 'center', alignItems: 'center', height: '1500vh' }}>
        <div>
          <h2>Résultats des matchs de Ligue des Champions</h2>
          <input
            type="text"
            placeholder="Rechercher un match par équipe"
            value={teamSearchTerm}
            onChange={(e) => setTeamSearchTerm(e.target.value)}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '300px' }}
          />
          <button onClick={handleSearchByTeam}  style={{ border: '1px solid #ccc', padding: '5px', margin: '8px', borderRadius: '5px', width: '100px' }}>Rechercher</button>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {results.map((match) => (
              <div key={match.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '300px' }}>
                <p>{(match.utcDate).slice(0,10)} - {(match.utcDate).slice(11,-1)}</p>
                <h3>{match.homeTeam.name} vs {match.awayTeam.name}</h3>
                <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                
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
