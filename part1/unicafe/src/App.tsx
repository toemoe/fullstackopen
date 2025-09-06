import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  }

  const handleClickBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  return (
    <div>
      <div>
      <h1>Give feedback</h1>
      <Button onClick={() => handleClickGood()} text="good" />
      <Button onClick={() => handleClickNeutral()} text="neutral" />
      <Button onClick={() => handleClickBad()} text="bad" />
      </div>
      <Statistics feedback={{good, neutral, bad, all}} />
    </div>
  )
}

export default App