import { useState } from "react";

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
);

const Display = ({value}) => (<div>{value}</div>)

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log('value now', newValue);  // print the new value to console
    setValue(newValue);
  };
  
  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

export default App;