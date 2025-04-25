import { useEffect, useState } from "react"
import { TodoContext } from "./TodoContext"

export const TodoProvider = ({ children }) => {

    const savedTodos = localStorage.getItem('todos')
    const [showDialog, setShowDialog] = useState(false)

    const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : [])

    const [selectedTodo, setSelectedTodo] = useState(null)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const upsertTodo = (formData) => {
        if (selectedTodo) {
            setTodos(oldState =>
                oldState.map(item =>
                    item.id === selectedTodo.id
                        ? { ...item, description: formData.get('description') }
                        : item
                )
            )
        } else (
            setTodos(oldState => {
                const newTodo = {
                    id: oldState.length + 1,
                    description: formData.get('description'),
                    createdAt: new Date().toISOString(),
                    completed: false
                }
                return [...oldState, newTodo]
            })
        )
        closeTodoFormModal()
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

    const openTodoFormModal = () => {
        setShowDialog(true)
    }

    const closeTodoFormModal = () => {
        setShowDialog(false)
        setSelectedTodo(null)
    }

    const selectTodoForEdit = (todo) => {
        setSelectedTodo(todo)
        openTodoFormModal()
    }

    return <TodoContext value={{
        todos,
        upsertTodo,
        removeTodo,
        toggleItemCompleted,
        openTodoFormModal,
        closeTodoFormModal,
        isModalOpen: showDialog,
        selectTodoForEdit,
        selectedTodo
    }}>
        {children}
    </TodoContext>
}