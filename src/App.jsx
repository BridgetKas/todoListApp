import { useState } from 'react';
import './App.css'
import Modal from './component/modal/modal';

function App() {
  const [todoTask , settodoTask] = useState('')
  const [todos,setTodos] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTodoTask, setEditTodoTask] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)

  const openModal = (index) => {
    const task = todos.find((task,taskIndex) => taskIndex === index)
    setModalOpen(true);
    setActiveIndex(index)
    setEditTodoTask(task.title)
   
  }
    
  function addTodo() {
    setTodos([
      ...todos,
      {
        title:todoTask,
        completedTask:false
      }
    ])
    settodoTask('')
  }

  function deleteTodo(index) {
    const todoTasks = todos.filter((item,i) => index !== i)
    setTodos(todoTasks)
  }

  function checkedTask(index) {
    const todoTaskChecked = todos.map((item,indexTask) =>{
      if(index === indexTask) {
        return {
          ...item,
          completedTask:!item.completedTask
        }
      }else {
        return item
      }
    })
    setTodos(todoTaskChecked)
  
  }
  
  function saveTodo() {
    const saveChanges = todos.map((task,index) =>{
      if(index === activeIndex) {
        return {
          ...task,
          title:editTodoTask
        }
      }else {
        return task;
      }
    })
    setTodos(saveChanges)
    setEditTodoTask('')
    setModalOpen(false)
  }
  return (
    <div className='todoContainer'>
      <h1 className='todo'> Todo List</h1>
      <hr/>
      <div className='mainInput'>
        <input type='text' placeholder='add item...' value={todoTask} className='input' onChange={(e) => settodoTask(e.target.value)}/>
      </div>
      <div className='addContainer'>
        <button className='add' type='button' onClick={addTodo}>ADD</button>
      </div>
      <ul className='container'>
        {
          todos.map((item ,index) =>(
            <div key={index} className='completedContainer inputContainer'>
              <input type='checkbox' onChange={()=> checkedTask(index)} checked={item.completedTask}/>
              <li className='completed'> {item.title}</li>
              <div className='btnContainer'>
                <button className='edit' onClick={() =>openModal(index)}>Edit</button>
                <button className='delete' onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            </div>
            
          ))
        }
      </ul>
      <div>
      <Modal show={isModalOpen}>
        <div className='modalContent'>
          <input type='text' placeholder='add item...' value={editTodoTask} className='input' onChange={(e) => setEditTodoTask(e.target.value)}/>
            <div className='modalContainer'>
              <button className='edit' onClick={saveTodo}>Save</button>
            </div>
        </div>
      </Modal>
    </div>
    </div>
  )
}

export default App

