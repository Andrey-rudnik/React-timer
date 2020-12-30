import React, { useState, useEffect } from 'react';
import classes from './Timer.module.css';




const Timer = () => {

    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [hour, setHour] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);
                const hourCounter = Math.floor(counter / 3600);

                let computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                let computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : minuteCounter;
                let computedHour =
                    String(hourCounter).length === 1
                        ? `0${hourCounter}`
                        : hourCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);
                setHour(computedHour);

                setCounter((counter) => counter + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    function resetTimer() {
        setIsActive(true);
        setCounter(0);
        setSecond("00");
        setMinute("00");
    }
    function stopTimer() {
        setIsActive(false);
        setCounter(0);
        setSecond("00");
        setMinute("00");
    }

    let clicks = [];
    let timeout;

    function waitTimer(event) {
        event.preventDefault();
        clicks.push(new Date().getTime());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300) {
                setIsActive(false);
            }
        }, 300);
    }


    return(
        <div className={classes.timer_wraper}>
            <div className={classes.time}>
                <span className={classes.hour}>{hour}</span>
                <span>:</span>
                <span className={classes.minute}>{minute}</span>
                <span>:</span>
                <span className={classes.second}>{second}</span>
            </div>
            <div className={classes.buttons}>
                <button onClick={() => setIsActive(!isActive)} className={classes.start}>Start</button>
                <button onClick={stopTimer} className={classes.stop}>Stop</button>
                <button onClick={resetTimer} className={classes.reset}>Reset</button>
                <button onClick={waitTimer} className={classes.wait}>Wait</button>
            </div>
        </div>
    )
}

export default Timer;