import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <div>
        <button onClick={() => store.dispatch({ type: 'INCREMENT'})}>plus</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT'})}>minus</button>
        <button onClick={() => store.dispatch({ type: 'ZERO'})}>zero</button>
      </div>
    </div>
  )
}

export default App
