import { useEffect, useState } from 'react'

function Clock({ onTest }: { onTest: () => void }) {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick')
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (date.getSeconds() === 0) {
      onTest()
    }
  }, [date])

  return (
    <>
      <h1>{date.toLocaleTimeString()}</h1>
      <button onClick={() => setDate(new Date())}>Refresh</button>
    </>
  )
}

export default Clock
