import React, { useState } from 'react'

const Heading = (props) => (
  <h2>
    {props.text}
  </h2>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  </tbody>
)

const Statistics = ({ states, math }) => {
  if (math.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <StatisticLine text="good" value={states.good} />
      <StatisticLine text="neutral" value={states.neutral} />
      <StatisticLine text="bad" value={states.bad} />
      <StatisticLine text="all" value={math.total} />
      <StatisticLine text="average" value={math.average} />
      <StatisticLine text="positive" value={math.positive + ' %'} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good + (bad * -1)) / total
  const positive = (good / total) * 100

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Heading text="statistics" />
      <Statistics states={{ good, neutral, bad }} math={{ total, average, positive }} />
    </div>
  )
}

export default App