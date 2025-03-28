import { useState, useEffect, useRef } from 'react'
import styles from './CountdownTimer.module.css'
import { hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds } from 'date-fns'


const CountdownTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [inputHours, setInputHours] = useState(0)
  const [inputMinutes, setInputMinutes] = useState(0)
  const [inputSeconds, setInputSeconds] = useState(0)
  const [targetTime, setTargetTime] = useState(0)

  const intervalId = useRef(null)
  const timePaused = useRef(null)

  const submitTargetTime = () => {
    const hours = inputHours !== null ? hoursToMilliseconds(inputHours) : 0
    const minutes = inputMinutes !== null ? minutesToMilliseconds(inputMinutes) : 0
    const seconds = inputSeconds !== null ? secondsToMilliseconds(inputSeconds) : 0
    setTargetTime(hours + minutes + seconds)
    handleReset()
  }

  useEffect(() => {
    if(isRunning && targetTime > 0) {
      intervalId.current = setInterval(() => {
        const newElapsedTime = Date.now() - timePaused.current
        //This is what the elapsed time will be set to next
        //If the next value is at or past targetTime, we 
        //know we are done counting down so we can stop.
        if(newElapsedTime >= targetTime) {
          setIsRunning(false)
          setElapsedTime(targetTime)
          clearInterval(intervalId.current)
          return
        }
        setElapsedTime(newElapsedTime)
      }, 10)
    }

    return () => {
      clearInterval(intervalId.current)
    }

  }, [isRunning, targetTime])

  const handleStart = () => {
    setIsRunning(true)
    timePaused.current = Date.now() - elapsedTime
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setElapsedTime(0)
    setIsRunning(false)
  }

  const handleChange = (e, setter, lower, upper) => {
    let newVal = parseInt(e.target.value)
    newVal = Math.max(Math.min(newVal, upper), lower)
    setter(newVal)
  }

  const getDisplay = () => {
    const timeRemaining = targetTime - elapsedTime

    // const hours = Math.floor(elapsedTime / (60 * 60 * 1000))
    // const minutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000))
    // const seconds = Math.floor((elapsedTime % (60 * 1000)) / (1000))
    // const milliseconds = Math.floor((elapsedTime % (1000)) / 10)

    const hours = Math.floor(timeRemaining / (60 * 60 * 1000))
    const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / (1000))
    const milliseconds = Math.floor((timeRemaining % (1000)) / 10)

    const formatTime = (n) => {
      return String(n).padStart(2, "0")
    }

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`
  }

  return(
    <div className={styles.stopwatch}>
      <div className={styles.setTimeControls}>
        <input 
          value={inputHours === 0 ? '' : inputHours}  
          onChange={(e) => handleChange(e, setInputHours, 0, 99)}
          className={styles.hours} type="number" />
        <input 
          value={inputMinutes === 0 ? '': inputMinutes}
          onChange={(e) => handleChange(e, setInputMinutes, 0, 59)}
          className={styles.minutes} type="number" />
        <input 
          value={inputSeconds === 0 ? '': inputSeconds}
          onChange={(e) => handleChange(e, setInputSeconds, 0, 59)}
          className={styles.seconds} type="number" />
      </div>
      <button onClick={submitTargetTime} className={styles.set}>Set</button>
      <div className={styles.display}>{getDisplay()}</div>
      <div className={styles.controls}>
        <button onClick={handleStart} className={styles.start}>Start</button>
        <button onClick={handleStop} className={styles.stop}>Stop</button>
        <button onClick={handleReset} className={styles.reset}>Reset</button>
      </div>
    </div>
  )
}

export default CountdownTimer