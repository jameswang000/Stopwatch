import { useState, useEffect, useRef } from 'react'
import styles from './Stopwatch.module.css'

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalId = useRef(null)
  const startTime = useRef(null)

  useEffect(() => {
    if(isRunning) {
      intervalId.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime.current)
      }, 10)
    }

    return () => {
      clearInterval(intervalId.current)
    }

  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
    startTime.current = Date.now() - elapsedTime
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setElapsedTime(0)
    setIsRunning(false)
  }

  const getDisplay = () => {
    const hours = Math.floor(elapsedTime / (60 * 60 * 1000))
    const minutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / (1000))
    const milliseconds = Math.floor((elapsedTime % (1000)) / 10)

    const formatTime = (n) => {
      return String(n).padStart(2, "0")
    }

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`
  }

  return(
    <div className={styles.stopwatch}>
      <div className={styles.display}>{getDisplay()}</div>
      <div className={styles.controls}>
        <button onClick={handleStart} className={styles.start}>Start</button>
        <button onClick={handleStop} className={styles.stop}>Stop</button>
        <button onClick={handleReset} className={styles.reset}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch