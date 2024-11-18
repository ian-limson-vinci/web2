import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [colorCount, setColorCount] = useState(0)

  const handleClick = () => {
    colorCount === 4 ? setColorCount(0) : setColorCount(colorCount+1);
  }

  const colors = ['red','green','blue','yellow','purple']

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className='boite-couleur' style={{backgroundColor: `${colors[colorCount]}`}}>
        <button className='color-button' onClick={handleClick}>
          {colorCount === 4 ? <p>{colors[0]}</p> : <p>{colors[colorCount+1]}</p> }
        </button>
        </div> 
        <strong>{colors[colorCount]}</strong>
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
