import { createRoot } from 'react-dom/client'
import { type JSX } from 'react/jsx-runtime';
//import './index.css'
//import App from './App.tsx'

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
}

createRoot(document.getElementById('root')!).render(
  <Welcome name="Sara" />
)
