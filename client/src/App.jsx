import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";
import Modal from "./components/Modal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  // Use States
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);
  const [isloggedin, setIsLoggedIn] = useState(false)


  // Use Effects
  useEffect (() => {
    setStreakScore(getStreakScore());
    getStarScore();
    setIsLoggedIn();
    handleLogin();
  }, []);

  useEffect  (() => {
    handleModal()
  },[isloggedin])
  
  // Handle functions

  async function handleLogin() {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST"
    });
    const data = await response.text();
    console.log(data);
  }

  function getStreakScore() {
    let score = 30;
    return score;
  }
  
  function getStarScore() {
    let star = 90;
    setStarScore(star);
  }

  function handleModal(){
    if (process.env.NODE_ENV === "production" || import.meta.env.VITE_TEST_AUTHENTICATION === "true")
      return !isloggedin ? <Modal toggle = {() => setIsLoggedIn(true)}/>: <> </>
      else return <></>;
  }
  
  
  // Return
  return (
    <>
      <div>
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      {handleModal()}
      <Timer/>
      </div>
    </>
  )
}

export default App
