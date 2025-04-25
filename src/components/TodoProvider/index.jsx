import { useState } from "react"
import { TodoContext } from "./TodoContext"

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([])

    const addToDo = (formData) => {
        console.log('precisamos fazer algo!')
        setTodos(oldState => {
            const newTodo = {
                id: oldState.length + 1,
                description: formData.get('description'),
                createdAt: new Date().toISOString(),
                completed: false
            }
            return [...oldState, newTodo]
        })
    }

    const removeTodo = (todo) => {
        setTodos(oldState => oldState.filter(t => t.id != todo.id))
    }

    const toggleItemCompleted = (todo) => {
        setTodos(oldState =>
            oldState.map(item =>
                item.id === todo.id
                    ? { ...item, completed: !item.completed }
                    : item
            )
        )
    }


    return <TodoContext value={{ todos, addToDo, removeTodo, toggleItemCompleted }}>
        {children}
    </TodoContext>
}