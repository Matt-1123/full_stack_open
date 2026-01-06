import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <p>{text}: {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const percentPositive = good / all;
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={avg} />
      <StatisticLine text="positive" value={percentPositive} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <div>
        <h2>Give Feedback</h2>
        <Button onClick={() => setGood(good + 1)} text='good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button onClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App