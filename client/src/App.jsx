import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";
import Modal from "./components/Modal";
import { BRENDA } from "./dummy-data/fixture-data";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const {user_email, password, id} = BRENDA;

function App() {
  // Use States
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // Use Effects
  useEffect (() => {
    // handleSetScores();
  }, []);

  useEffect  (() => {
    handleModal()
    if (isLoggedIn) handleSetScores();
  },[isLoggedIn])
  
  // Handle functions
    //user authentication
  async function handleLogin() {
    console.error("Not yet implemented");
  }

  function handleModal(){
    return !isLoggedIn ? <Modal toggle = {() => setIsLoggedIn(true)}/>: <> </>
  }

  async function handleSetScores() {
    const scores = await getScores();

    setStreakScore(scores.streakScore);
    setStarScore(scores.starScore);
  }

  async function getScores() {
    const response = await fetch (`${BASE_URL}/score/${id}`, {method: "GET"});
    const scores = await response.json();
    return scores;

  }

    //update scores
    function addToStreak(newStreak) {
      setStreakScore(newStreak);
    }

    function addToStar(newStar) {
      setStarScore(newStar);
    }

  // async function updateStreakScore() {
  //   await fetch(`${BASE_URL}/streakScore/:id`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //        num: newStreakScore,
  //     }),
  //   });
  // }
  
  // Return
  return (
    <>
      <header>Brush Buddy</header>
      <div className="scores-section">
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      </div>
      <Timer addToStreak={addToStreak} addToStar={addToStar} oldStreakScore={streakScore} oldStarScore={starScore}/>
      {handleModal()}
    </>
  )
}

export default App
