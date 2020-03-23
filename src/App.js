import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from './components/todolist';
import ToDoForm from './components/todoform';

function App() {
  const apiURL = 'https://assets.breatheco.de/apis/fake/todos/user/castorga';

  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [done, setDone] = useState("");

  const [todos, setTodo] = useState([
    { label: 'Cras justo odio', done: false },
    { label: 'Dapibus ac facilisis in', done: false },
    { label: 'Morbi leo risus', done: true },
    { label: 'Porta ac consectetur ac', done: false },
    { label: 'Vestibulum at eros', done: true },
  ])

  const handleKeyDown = e => {
    if (e.keyCode === 13 && e.target.value !== "") {
      setTodo([...todos, { label: e.target.value, done: done !== "" ? done : false }]);
      e.target.value = "";
      setDone("");
    }
  }

  const handleChange = e => {
    if (e.target.value === "") {
      setDone(false)
    }
    if (e.target.value === "false") {
      setDone(false)
    }
    if (e.target.value === "true") {
      setDone(true)
    }
  }

  const handleClickTrash = pos => {
    //console.log("Eliminado la posicion: " + pos);
    todos.splice(pos, 1);
    setTodo([...todos]);
  }

  const getTodos = url => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data.msg) {
          setError(data);
        }
        setTodo([...data])
      })
      .catch(error => {
        console.log(error);
      })
  }

  const createTodos = url => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.msg) {
          setError(data);
        }
        if (data.result) {
          setResult(data);
          setError(null);
          getTodos(apiURL);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const updateTodos = url => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(todos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.msg) {
          setError(data);
        }
        if (data.result) {
          setResult(data);
          setError(null);
          getTodos(apiURL);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteTodos = url => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.result) {
          setResult(data);
          setTodo([]);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getTodos(apiURL);
  }, [])

  const completeToDo = pos => {
    todos[pos].done = !todos[pos].done;
    setTodo([...todos]);
  }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <h1>ToDo List</h1>
          </div>
        </div>
        {
          !!error &&
          (
            <div class="alert alert-danger" role="alert">
              {error.msg}
            </div>
          )
        }
        {
          !!result &&
          (
            <div class="alert alert-success" role="alert">
              {result.result}
            </div>
          )
        }
        <div className="row pb-2">
          <div className="col">
            <button
              className="btn btn-primary btn-block btn-sm"
              onClick={() => createTodos(apiURL)}
            >
              Crear Lista
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-warning btn-block btn-sm"
              onClick={() => updateTodos(apiURL)}
            >
              Salvar Lista
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-danger btn-block btn-sm"
              onClick={() => deleteTodos(apiURL)}
            >
              Borrar Lista
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ToDoForm handleChange={handleChange} handleKeyDown={handleKeyDown} done={done} />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ToDoList todos={todos} handleClickTrash={handleClickTrash} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;