import React, { useState } from "react";

function TodosComponent() {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [currentSubTodo, setCurrentSubTodo] = useState("");
    const [changingTodo, setChangingTodo] = useState("");

    function createNewTodo(currentTodo) {
        let todosArray = [...todos];
        todosArray.push({
            todo: currentTodo,
            isCompleted: false,
            isHalfDone: false,
            showChildren: false,
            children: [],
            editing: false
        });
        setTodos(todosArray);
    }

    function addSubTodo(index) {
        let todosArray = [...todos];
        todosArray[index].children.push({
            todo: currentSubTodo,
            isCompleted: false,
            isHalfDone: false,
            editing: false
        })
        setTodos(todosArray);
    }

    function deleteTodo(index) {
        let todosArray = [...todos];
        todosArray.splice(index, 1);
        setTodos(todosArray);
    }

    function updateTodo(index) {
        const todosArray = [...todos];
        if(todosArray[index].isCompleted) {
            todosArray[index].isCompleted = false;
            todosArray[index].isHalfDone = false;
        } else if(todosArray[index].isHalfDone) {
            todosArray[index].isCompleted = true;
            todosArray[index].isHalfDone = false;
        } else {
            todosArray[index].isHalfDone = true;
        }
        setTodos(todosArray);
    }

    function deleteSubTodo(index, subindex) {
        const todosArray = [...todos];
        todosArray[index].children.splice(subindex, 1);
        setTodos(todosArray);
    }

    function updateSubTodo(index, subindex) {
        const todosArray = [...todos];
        if(todosArray[index].children[subindex].isCompleted) {
            todosArray[index].children[subindex].isCompleted = false;
            todosArray[index].children[subindex].isHalfDone = false;
        } else if(todosArray[index].children[subindex].isHalfDone) {
            todosArray[index].children[subindex].isCompleted = true;
            todosArray[index].children[subindex].isHalfDone = false;
        } else {
            todosArray[index].children[subindex].isHalfDone = true;
        }
        setTodos(todosArray);
    }

    function toggleShowChldren(index) {
        let todosArray = [...todos];
        todosArray[index].showChildren = !todosArray[index].showChildren;
        setTodos(todosArray);
    }

    function edit(index) {
        let todosArray = [...todos];
        for(var i=0; i < todosArray.length; i++) {
            if(i !== index) {
                todosArray[i].editing = false;
            }
            for(var j=0; j < todosArray[i].children.length; j++) {
                todosArray[i].children[j].editing = false;
            }
        }
        setChangingTodo(todosArray[index].todo);
        todosArray[index].editing = !todosArray[index].editing;
        setTodos(todosArray);
    }

    function subEdit(index, subindex) {
        let todosArray = [...todos];
        for(var i=0; i < todosArray.length; i++) {
            todosArray[i].editing = false;
            for(var j=0; j < todosArray[i].children.length; j++) {
                if(i !== index || j !== subindex) {
                    todosArray[i].children[j].editing = false;
                }
            }
        }
        setChangingTodo(todosArray[index].children[subindex].todo);
        todosArray[index].children[subindex].editing = !todosArray[index].children[subindex].editing;
        setTodos(todosArray);
    }

    function changeTodo(index) {
        let todosArray = [...todos];
        todosArray[index].todo = changingTodo;
        todosArray[index].editing = false;
        setTodos(todosArray);
    }

    function changeSubTodo(index, subindex) {
        let todosArray = [...todos];
        todosArray[index].children[subindex].todo = changingTodo;
        todosArray[index].children[subindex].editing = false;
        setTodos(todosArray);
    }

    function clearTodos() {
        setTodos([]);
    }

    return (
        <div>
            <div class="flex">
                <input
                    className="todo-input"
                    value={currentTodo}
                    onChange={e => {
                        setCurrentTodo(e.target.value);
                    }}
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            createNewTodo(currentTodo);
                            setCurrentTodo("");
                        }
                    }}
                    placeholder="Enter a task"
                />
                <button className="clear" onClick={() => clearTodos()}>Clear</button>
            </div>
            {
                todos.map((todo, index) => (
                    <div className="todoGroup">
                        <div key={todo} className="todo">
                            <div className="expandSubtodos" onClick={() => toggleShowChldren(index)}>
                                {todo.showChildren && "^"}
                                {!todo.showChildren && ">"}
                            </div>
                            <div className={todo.isCompleted ? "boxfilled" : todo.isHalfDone ? "boxhalf" : "boxempty"}
                                onClick={() => updateTodo(index)}>
                            </div>
                            <div className={todo.isCompleted ? "done" : ""}>
                                {todo.editing && <input
                                    className="todo-input"
                                    value={changingTodo}
                                    onChange={e => {
                                        setChangingTodo(e.target.value);
                                    }}
                                    onKeyPress={e => {
                                        if (e.key === "Enter") {
                                            changeTodo(index);
                                        }
                                    }}
                                    placeholder="Enter a task"
                                />}
                                {!todo.editing && <div>
                                    {todo.todo}
                                </div>}
                            </div>
                            <div className="edit" onClick={() => edit(index)}>
                                &#9998;
                            </div>
                            <div className="delete" onClick={() => deleteTodo(index)}>
                                &#128465;
                            </div>
                        </div>
                        {todo.showChildren && <div>
                            <input
                                className="subtodo-input"
                                value={currentSubTodo}
                                onChange={e => {
                                    setCurrentSubTodo(e.target.value);
                                }}
                                onKeyPress={e => {
                                    if (e.key === "Enter") {
                                        addSubTodo(index);
                                        setCurrentSubTodo("");
                                    }
                                }}
                                placeholder="Enter a subtask"
                            />
                            {
                            todo.children.map((subtodo, subindex) => (
                                <div className="children">
                                    <div className={subtodo.isCompleted ? "boxfilled" : subtodo.isHalfDone ? "boxhalf" : "boxempty"}
                                    onClick={() => updateSubTodo(index, subindex)}>
                                    </div>
                                    <div className={subtodo.isCompleted ? "done" : ""}>
                                        {subtodo.editing && <input
                                            className="subtodo-input"
                                            value={changingTodo}
                                            onChange={e => {
                                                setChangingTodo(e.target.value);
                                            }}
                                            onKeyPress={e => {
                                                if (e.key === "Enter") {
                                                    changeSubTodo(index, subindex);
                                                }
                                            }}
                                            placeholder="Enter a subtask"
                                        />}
                                        {!subtodo.editing && <div>
                                            {subtodo.todo}
                                        </div>}
                                    </div>
                                    <div className="edit" onClick={() => subEdit(index, subindex)}>
                                        &#9998;
                                    </div>
                                    <div className="delete" onClick={() => deleteSubTodo(index, subindex)}>
                                        &#128465;
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                ))
            }
            {todos.length > 0 && <p>
            {`
            Remaining: ${todos.reduce((acc, cur) => (!cur.isCompleted && !cur.isHalfDone) ? ++acc: acc, 0)} 
            In Progress: ${todos.reduce((acc, cur) => cur.isHalfDone ? ++acc: acc, 0)}
            Completed: ${todos.reduce((acc, cur) => cur.isCompleted ? ++acc: acc, 0)}
            `}
            </p>}
        </div>
    )
}

export default TodosComponent;