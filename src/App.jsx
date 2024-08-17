import { useState } from 'react';
import './App.css'
import Modal from './component/modal/modal';

function App() {
  const[todoTask,setTodoTask] = useState('')
  const[addTodos, setaddTodo] = useState(localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : [])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [editTodo,setEditTodo] = useState('')
  const [activeIndex,setActiveIndex] = useState(-1)
  const [completedTodos, setCompletedTodos] = useState([])

  function addTodoTask(){
    const newTodoTask = [...addTodos,{title:todoTask,completed:false}]
    setaddTodo(newTodoTask) 
    
    setTodoTask('')
    
    localStorage.setItem('todoStorage', JSON.stringify(newTodoTask))
  }


  function deleteTodo(index,name) {
    if(name === 'notCompleted'){
      const newTodo = addTodos.filter((item,todoIndex) => index !== todoIndex)
      setaddTodo(newTodo)
    }else {
      const newTodo = completedTodos.filter((item,todoIndex) => index !== todoIndex)
      setCompletedTodos(newTodo)
    }
   
  }

  function markAsCompleted(index,arrayName) {
    if(arrayName === 'uncompleteTask') {
      const completedTasks = addTodos.map((item,todoIndex) => {
        if(index === todoIndex){
          return {
            ...item,
            completed:!item.completed
          }
        }else{
          return item
        }
      })
      const uncompletedTasks = completedTasks.filter((item) => !item.completed)
      setaddTodo(uncompletedTasks)
      const completedTask = completedTasks.find((item) => item.completed === true)
      setCompletedTodos(
        [
          ...completedTodos,
          completedTask
        ]
      )
    }else{
      const completedTasks = completedTodos.map((item,todoIndex) => {
        if(index === todoIndex){
          return {
            ...item,
            completed:!item.completed
          }
        }else{
          return item
        }
      })
      const unCompletedTask = completedTasks.find((item) => item.completed === false)
      setaddTodo([...addTodos,unCompletedTask])
      const checkedTask = completedTasks.filter(item => item.completed === true)
      console.log(checkedTask)
      setCompletedTodos(checkedTask)
    }
  }

  function openModal(index) {
    setIsModalOpen(true)
    setActiveIndex(index)
    const todoItem = addTodos.find((item,todoIndex) => index === todoIndex)
    setEditTodo(todoItem.title)
  }
  
  function saveTodo(){
    const savedTodo = addTodos.map((item,todoIndex) => {
      if(todoIndex === activeIndex){
        return{
          ...item,
          title:editTodo
        }
      }else{
        return item
      }
    })
    setaddTodo(savedTodo)
    setIsModalOpen(false)
  }


  return (
    <div className='todoContainer'>
      <h1 className='Task'> Todo List</h1>
      <hr/>
      <div className='mainInput'>
        <input type='text' placeholder='add item...' value={todoTask} className='input' onChange={(e) => setTodoTask(e.target.value)}/>
      </div>
      <div className='addContainer'>
        <button className='add' type='button' onClick={addTodoTask}>ADD</button>
      </div>
      <ul className='container'>
        {
          addTodos.map((item ,index) =>(
            <div key={index} className='completedContainer inputContainer'>
              <input type='checkbox' onChange={()=> markAsCompleted(index,'uncompleteTask')} checked={item.completed}/>
              <li className='completed' > {item.title}</li>
              <div className='btnContainer'>
                <button className='edit' onClick={() =>openModal(index)}>Edit</button>
                <button className='delete' onClick={() => deleteTodo(index,'notCompleted')}>Delete</button>
              </div>
            </div>
            
          ))
        }
      </ul>
      <ul className='container'>
        {
          completedTodos.map((item,index) =>(
            <div key={index} className='completedContainer inputContainer' 
              style={{ 
              backgroundColor:item.completed ? 'green':'',
              color:item.completed ? 'white':'',
              textDecoration:item.completed ?'line-through' :'none'
            }}>
              <input type='checkbox' onChange={()=> markAsCompleted(index,'completeTask')} checked={item.completed}/>
              <li className='completed' > {item.title}</li>
              <div className='btnContainer'>
                <button className='edit' onClick={() =>openModal(index)}>Edit</button>
                <button className='delete' onClick={() => deleteTodo(index,'completed')}>Delete</button>
              </div>
            </div>
            
          ))
        }

      </ul>
      <div>
      <Modal show={isModalOpen}>
        <div className='modalContent'>
          <input type='text' placeholder='add item...' value={editTodo} className='input' onChange={(e) => setEditTodo(e.target.value)}/>
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

