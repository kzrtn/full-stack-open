import { createRoot } from 'react-dom/client'
import { CounterContextProvider } from './components/CounterContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
)
