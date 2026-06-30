import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const header = <h1>statistics</h1>;

  if (total > 0) {
    const average = (good - bad) / (good + neutral + bad);
    const positive = (good / (good + neutral + bad)) * 100;

    return (
      <div>
        {header}
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </table>
      </div>
    );
  }

  return (
    <div>
      {header}
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const UpGood = () => setGood(good + 1);
  const UpBad = () => setBad(bad + 1);
  const UpNeutral = () => setNeutral(neutral + 1);

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={UpGood} text="good" />
        <Button onClick={UpNeutral} text="neutral" />
        <Button onClick={UpBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  );
};

export default App;