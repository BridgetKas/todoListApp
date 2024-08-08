import './App.css'
import { useState } from 'react'
import Modal from './component/modal/modal';

function App() {
  const [todoTask, setTodoTask] = useState('')
  const [todo, setTodo] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTodoTask,setEditTodoTask] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)

  const openModal = (index) => {
    setModalOpen(true)
    setActiveIndex(index)
    const editedTodoTask =  todo.find((item,id) => (id === index))
    setEditTodoTask(editedTodoTask.title)
  };
  const closeModal = () => setModalOpen(false);
  
  function addtodoTask () {
    setTodo([
      ...todo,
      { title: todoTask , completed:false},
    ])
  }

  function handleDelete (index) {
    const finaltodo = todo.filter((item,id) => (id !== index))
    setTodo(finaltodo)

  }

  function markasCompleted (index) {
    const completedTasks = todo.map((task,taskIndex) => {
      if(index === taskIndex) {
        return {
          ...task,
          completed:!task.completed,
        }
      }else {
        return task
      }
    })

    setTodo(completedTasks)
  }

  function saveTodoTask () {
    const completedTasks = todo.map((task,taskIndex) => {
      if(activeIndex === taskIndex) {
        return {
          ...task,
          title:editTodoTask,
        }
      }else {
        return task
      }
    })

    setTodo(completedTasks)
  }


  return (
    <div className='todoContainer'>
      <h1 className='todo'> Todo List</h1>
      <hr/>
      <div className='mainInput'>
        <input type='text' placeholder='add item...' value={todoTask} className='input' onChange={(e) => setTodoTask(e.target.value)}/>
      </div>
      <div className='addContainer'>
        <button className='add' type='button' onClick={addtodoTask}>ADD</button>
      </div>
      <ul className='container'>
        {
          todo.map((item ,index) =>(
            <div key={index} className='completedContainer inputContainer'>
              <input type='checkbox' onChange={() => markasCompleted(index)} checked={item.completed}/>
              <li className='completed'> {item.title}</li>
              <div className='btnContainer'>
                <button className='edit' onClick={() => openModal(index)}>Edit</button>
                <button className='delete' onClick={() =>handleDelete(index)}>Delete</button>
              </div>
            </div>
            
          ))
        }
      </ul>
      <div>
      <Modal show={isModalOpen} onClose={closeModal}>
        <div className='modalContent'>
          <input type='text' placeholder='add item...' value={editTodoTask} className='input' onChange={(e) =>setEditTodoTask(e.target.value)}/>
            <div className='modalContainer'>
              <button className='edit' onClick={saveTodoTask}>Save</button>
            </div>
        </div>
      </Modal>
    </div>
    </div>
  )
}

export default App

