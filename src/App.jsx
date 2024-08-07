import './App.css'

function App() {

  return (
    <div className='todoContainer'>
      <h1 className='todo'> Todo List</h1>
      <hr/>
      <div className='inputContainer'>
        <input type='text' placeholder='add item...' className='input'/>
        <div className='btnContainer'>
          <button className='edit'>Edit</button>
          <button className='delete'>Delete</button>
        </div>
      </div>
      <div className='addContainer'>
        <button className='add'>ADD</button>
      </div>
    </div>
  )
}

export default App
