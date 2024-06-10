import React, { useState } from 'react';

const Scoreboard = () => {
  const [matches, setMatches] = useState([
    { id: 1, homeTeam: 'Uruguay', awayTeam: 'Italy', homeScore: 6, awayScore: 6 },
    { id: 2, homeTeam: 'Spain', awayTeam: 'Brazil', homeScore: 10, awayScore: 2 },
    { id: 3, homeTeam: 'Mexico', awayTeam: 'Canada', homeScore: 0, awayScore: 5 },
    { id: 4, homeTeam: 'Argentina', awayTeam: 'Australia', homeScore: 3, awayScore: 1 },
    { id: 5, homeTeam: 'Germany', awayTeam: 'France', homeScore: 2, awayScore: 2 }
  ]);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [summaryData, setSummaryData] = useState('');
  const [showSummary, setShowSummary] = useState(false); 

  const startGame = () => {
    const newMatch = {
      id: matches.length + 1,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      homeScore: 0,
      awayScore: 0
    };
    setMatches([...matches, newMatch]);
    setHomeTeam('');
    setAwayTeam('');
  };

  const updateScore = () => {
    if (!selectedMatchId) {
      console.log('Please select a match to update score');
      return;
    }

    const updatedMatches = matches.map(match => {
      if (match.id === selectedMatchId) {
        return {
          ...match,
          homeScore: homeScore,
          awayScore: awayScore
        };
      }
      return match;
    });
    setMatches(updatedMatches);
    setHomeScore(0);
    setAwayScore(0);
    setSelectedMatchId('');
  };

  const finishMatch = () => {
    if (!selectedMatchId) {
      console.log('Please select a match to finish');
      return;
    }

    const filteredMatches = matches.filter(match => match.id !== selectedMatchId);
    setMatches(filteredMatches);
    setSelectedMatchId('');
  };

  const getSummary = () => {
    const summary = matches.map(match => `${match.homeTeam} ${match.homeScore} - ${match.awayTeam} ${match.awayScore}`).join("\n");
    setSummaryData(summary);
    setShowSummary(true); 
  };

  return (
    <div>
      <h1>Football World Cup Scoreboard</h1>
      <div>
        <input type="text" value={homeTeam} placeholder="Home Team" onChange={e => setHomeTeam(e.target.value)} />
        <input type="text" value={awayTeam} placeholder="Away Team" onChange={e => setAwayTeam(e.target.value)} />
        <button onClick={startGame}>Start Game</button>
      </div>
      <div>
        <select value={selectedMatchId} onChange={e => setSelectedMatchId(e.target.value)}>
          <option value="">Select Match</option>
          {matches.map(match => (
            <option key={match.id} value={match.id}>{`${match.homeTeam} vs ${match.awayTeam}`}</option>
          ))}
        </select>
        <input type="number" value={homeScore} placeholder="Home Score" onChange={e => setHomeScore(Number(e.target.value))} />
        <input type="number" value={awayScore} placeholder="Away Score" onChange={e => setAwayScore(Number(e.target.value))} />
        <button onClick={updateScore}>Update Score</button>
        <button onClick={finishMatch}>Finish Match</button>
        <button onClick={getSummary}>Get Summary</button>
      </div>
      {showSummary && ( 
        <div>
          <h2>Summary</h2>
          <h3>{summaryData}</h3>
        </div>
      )}
      
    </div>
  );
};

export default Scoreboard;