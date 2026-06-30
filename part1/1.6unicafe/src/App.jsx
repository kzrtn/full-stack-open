import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const Total = (good, neutral, bad) => good + neutral + bad;
const Average = (good, neutral, bad) => (good - bad) / (good + neutral + bad);
const Positive = (good, neutral, bad) => (good / (good + neutral + bad)) * 100;

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
      <h1>give feedback</h1>
      <div>
        <Button onClick={UpGood} text="good" />
        <Button onClick={UpNeutral} text="neutral" />
        <Button onClick={UpBad} text="bad" />
      </div>
      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {Total(good, neutral, bad)}</p>
        <p>average {Average(good, neutral, bad)}</p>
        <p>positive {Positive(good, neutral, bad)}</p>
      </div>
    </>
  );
};



export default App;