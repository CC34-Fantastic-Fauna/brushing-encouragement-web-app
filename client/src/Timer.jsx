import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
    const totalSeconds = 120;
    const [isRunning, setIsRunning] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
    
    useEffect(() => {
        handleCountdown()
    }, [isRunning]);
    
    const handleStart = () => {
        setIsRunning(true);
    };

    const handleReset = () => {
        setRemainingSeconds(totalSeconds)
        handleStart()
    }
    
    const handleCountdown = () => {
        let countdown;
    
        if (isRunning) {
            countdown = setInterval(() => {
                setRemainingSeconds((currentSeconds) => {
                    if (currentSeconds > 0) {
                        return currentSeconds - 1;
                    }
                    setIsRunning(false);
                    clearInterval(countdown);
                    return 0;
                });
            }, 1000);
        }
    
        return () => clearInterval(countdown);
    };
    
    
    const displayTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    return (
        <div className='timer-container'>
            <div id='countdown'>
                {displayTime(remainingSeconds)}
            </div>
            <button onClick={remainingSeconds === 0 ? handleReset:handleStart}>Start</button>
        </div>
    );
}

export default Timer;
