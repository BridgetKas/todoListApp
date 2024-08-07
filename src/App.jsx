import './App.css'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [todo, setTodo] = useState([])
  
  function handleAdd () {
    setTodo([
      { input: input},
      ...todo,
    ])
  }

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
        <button className='add' type='button' onClick={handleAdd}>ADD</button>
      </div>
      <ul className='container'>
        {
          todo.map((item ,index) =>(
            <div key={index} className='completedContainer'>
              <input type='checkbox' checked/>
              <li className='completed'> {item.input}</li>
            </div>
            
          ))
        }
      </ul>
    </div>
  )
}

export default App

