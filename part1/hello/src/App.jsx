import { useState } from "react";

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log('value now', newValue);  // print the new value to console
    setValue(newValue);
  };

  const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
  );
  
  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

export default App;