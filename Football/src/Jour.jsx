function Jour() {

    const matchesToday = JSON.parse(localStorage.getItem('matchesToday'));
    console.log(matchesToday)


    return ( 
        <div style={{ display: 'bloc', justifyContent: 'center', alignItems: 'center', height: '1500vh' }}>
        <div>
          <h2>Résultats des matchs de Ligue des Champions</h2>
          
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {matchesToday.map((match) => (
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
    );
}

export default Jour;