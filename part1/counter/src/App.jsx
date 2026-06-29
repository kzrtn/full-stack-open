import { useState } from "react";

const Display = ({counter}) => <div>{counter}</div>;
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [ counter, setCounter ] = useState(0);

  const CountUp = () => setCounter(counter + 1);
  const ResetCount = () => setCounter(0);
  const CountDown = () => setCounter(counter-1);

  return (
    <>
      <Display counter={counter} />
      <Button
        onClick={CountUp}
        text="+"
      />
      <Button
        onClick={ResetCount}
        text="Reset"
      />
      <Button
        onClick={CountDown}
        text="-"
      />
    </>
  );
};

export default App;