import './App.css'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')

  return (
    <div className='todoContainer'>
      <h1 className='todo'> Todo List</h1>
      <hr/>
      <div className='inputContainer'>
        <input type='text' placeholder='add item...' value={input} className='input' onChange={(e) => setInput(e.target.value)}/>
        <div className='btnContainer'>
          <button className='edit'>Edit</button>
          <button className='delete' onClick={() =>setInput('')}>Delete</button>
        </div>
      </div>
      <div className='addContainer'>
        <button className='add'>ADD</button>
      </div>
    </div>
  )
}

export default App
