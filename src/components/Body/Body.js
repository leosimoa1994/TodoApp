import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

import "./style.css";

function Body() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("todolist") !== undefined &&
      localStorage.getItem("todolist") !== null
    ) {
      const data = JSON.parse(localStorage.getItem("todolist"));
      setList(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(list));
  }, [list]);

  const addtodo = (e) => {
    e.preventDefault();
    setList([
      {
        id: Math.floor(Math.random() * 100000) + 1,
        todo: item,
        done: false,
      },
      ...list,
    ]);
    setItem("");
  };

  const remove = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const donetodo = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, item, done: !item.done } : item
      )
    );
  };

  return (
    <div className="body">
      <div className="TodoBody">
        <form onSubmit={(e) => addtodo(e)}>
          <input
            type="text"
            name="todo"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
          <button>Adicionar</button>
        </form>
        <div className="bodyList">
          <ul>
            {list.map((todos) => {
              if (list.length > 0) {
                if (todos.done === true) {
                  return (
                    <div key={todos.id} className="listLine">
                      <li
                        style={{
                          color: "#ccc",
                          textDecoration: "line-through",
                        }}
                        onClick={() => donetodo(todos.id)}
                      >
                        {todos.todo}
                      </li>
                      <MdClose size={20} onClick={() => remove(todos.id)} />
                    </div>
                  );
                }
                return (
                  <div key={todos.id} className="listLine">
                    <li onClick={() => donetodo(todos.id)}>{todos.todo}</li>
                    <MdClose size={20} onClick={() => remove(todos.id)} />
                  </div>
                );
              }
              return "";
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Body;
