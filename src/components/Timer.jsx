import { useState, useEffect, useMemo } from "react"
import { format, formatDuration, intervalToDuration, 
         compareAsc, interval, differenceInSeconds } from "date-fns"


function Timer({targetDate}) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [done, setDone] = useState(false)
  
  const formattedTargetDate = useMemo(() => format(targetDate, 'hh:mm:ss'))

  useEffect(() => {
    setTimeLeft(null)
    setDone(false)
    
    const initialDiffInSeconds = differenceInSeconds(targetDate, new Date())
    if (initialDiffInSeconds > 0) {
      const hours = String(Math.floor(initialDiffInSeconds / (60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((initialDiffInSeconds % 3600) / (60))).padStart(2, "0");
      const seconds = String(Math.floor(initialDiffInSeconds % 60)).padStart(2, "0");
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    } else {
      setTimeLeft('00:00:00')
      setDone(true);
      clearInterval(checkTime)
      return;
    } 

    const checkTime = setInterval(() => {
      const diffInSeconds = differenceInSeconds(targetDate, new Date())
      if(diffInSeconds <= 0) {
        setTimeLeft('00:00:00')
        setDone(true);
        clearInterval(checkTime)
        return;
      }
      const hours = String(Math.floor(diffInSeconds / (60 * 60))).padStart(2, "0"); 
      const minutes = String(Math.floor((diffInSeconds % 3600) / (60))).padStart(2, "0");
      const seconds = String(Math.floor(diffInSeconds % 60)).padStart(2, "0");
      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => {
      clearInterval(checkTime);
    }
  }, [targetDate]);

  return(
    <>  
      <h1>Time Remaining until <b>{formattedTargetDate}</b></h1>
      <p>{timeLeft}</p>
    </>
  )
}

export default Timer