import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Text />
      <Text />
    </>
  )
}

function Text(display) {
  return (
    <div>
        <p>display</p>
    </div>
  );
}


export default App
