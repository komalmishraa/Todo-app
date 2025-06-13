import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './output.css'
import Navbar from './component/Navbar'
import {v4 as uuidv4} from 'uuid'
uuidv4();

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
   
  }, [])
  
  const handleEdit = (e,id)=>{
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id!=id
    })
    setTodos(newTodos)
    saveToLS()


  }

  const saveToLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const handleDel =(e,id)=>{
    let idxx = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

  }
  const handleChange =(e)=>{
    setTodo(e.target.value)

  }
  const handleAdd = ()=>{
    setTodos([...todos, {id:uuidv4(),todo, isCompleted :false}]) //jitn h wo rahnge then add
    setTodo("") //again blank affter add
    saveToLS()

  }
  const handleCheckbox = (e) =>{
    let id = e.target.name
    let idxx = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos =[...todos] //for renering n new arr or obj
    newTodos[idxx].isCompleted = !newTodos[idxx].isCompleted;
    setTodos(newTodos)
    saveToLS()

  }
  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }


  return (
    <>
      <Navbar />
        <div className="container mx-auto my-5 rounded-xl p-5 bg-pink-200 min-h-[80vh] w-1/2">
        <h1 className='font-bold  text-2xl text-pink-900'>Doit - Get it done now!</h1>
          <div className="add my-5">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input onChange={handleChange} value={todo} type='text' className='bg-white w-1/2 ' />
            <button onClick={handleAdd} disabled = {todo.length<3}className='bg-pink-700 disabled:bg-violet text-white rounded-md py-1 px-2 mx-6 font-bold hover:bg-pink-950'>Save</button>
          </div>
          <input className='chng' onChange={toggleFinished} type='checkbox' checked ={showFinished} />Show Finished
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='my-5'>No Todos to display</div>}
            {todos.map(item=>{

            
             return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
              <div className='cont'>
                <input  name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className = ' bg-pink-700 text-white rounded-md py-1 px-2 mx-1 font-bold hover:bg-pink-950'>Edit</button>
                <button onClick={(e)=>{handleDel(e,item.id)}} className = ' bg-pink-700 text-white rounded-md py-1 px-2 mx-1 font-bold hover:bg-pink-950'>Delete</button>
              </div>
            </div>
            })}
          </div>
        </div>
      


    </>
  )
}

export default App
