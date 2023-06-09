import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]); //initially an empty array [] because we want to get all todos

  

  //get all todos
  const getTodos = async () => {
    try {
      const response = await fetch(`https://to-do-app-pern-stack-api.onrender.com/todos`); 
      const jsonData = await response.json();

      console.log(response)
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

    //delete todo function
    const deleteTodo = async (id) => {
      try {
        const deleteTodo = await fetch(`https://to-do-app-pern-stack-api.onrender.com/todos/${id}`, {
          method: "DELETE",
        });
  
        setTodos(todos.filter((todo) => todo.todo_id !== id));
      } catch (err) {
        console.error(err.message);
      }
    };

  return (
    <>
      {""}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
