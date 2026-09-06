import { useContext } from 'react'
import CounterContext from './CounterContext'

const Controls = () => {
  const { increment, decrement, zero } = useContext(CounterContext)
  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls