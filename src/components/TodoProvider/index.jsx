import { TodoContext } from "./TodoContext";
import { useEffect, useState } from "react"

export function TodoProvider({ children }) {

    const TODOS = 'toDos'

    const savedToDos = localStorage.getItem(TODOS)

    const [toDos, setToDos] = useState(savedToDos ? JSON.parse(savedToDos) : [])
    const [showDialog, setShowDialog] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState()

    const openFormTodoDialog = (todo) => { 
        if (todo) {
            setSelectedTodo(todo)
        }
        setShowDialog(true) 
    }

    const closeFormTodoDialog = () => {
        setShowDialog(false)
        setSelectedTodo(null)
    }

    useEffect(() => { // Sempre que o estado toDos mudar, o useEffect será executado fazendo com que o novo item seja salvo no localStorage.
        localStorage.setItem(TODOS, JSON.stringify(toDos))
    }, [toDos])

    const addToDo = (formData) => {
        // prevState poderia ter qualquer nome, é só uma convenção.   
        // O que faz com que ele pegue o estado anterior é o fato de ser uma função passada para o setToDos.
        const description = formData.get('description')
        setToDos(prevState => {
            const toDo = {
                id: prevState.length + 1,
                description: description,
                completed: false,
                createdAt: new Date().toISOString()
            }
            return [...prevState, toDo]
        })
    }

    const toggleToDoCompleted = (todo) => {
        setToDos(prevState => {
            return prevState.map(t => {
                if (t.id == todo.id) {
                    return {
                        ...t,
                        completed: !t.completed // altera o valor de completed do todo recebido por parâmetro
                    }
                }
                return t
            })
        })
    }

    const removeToDo = (todo) => {
        setToDos(prevState => {
            return prevState
                .filter(t => t.id != todo.id) // Filtra todos os toDos que não são o toDo recebido por parâmetro removendo ele da lista
        })
    }

    const editToDo = (formData) => {
        setToDos(prevState => {
            return prevState.map(t => {
                if (t.id == selectedTodo.id) {  
                    return {
                        ...t,
                        description: formData.get('description')
                    }
                }
                return t
            })
        })
    }

    return (
        <TodoContext value={{
            toDos,
            addToDo,
            toggleToDoCompleted,
            removeToDo,
            showDialog,
            openFormTodoDialog,
            closeFormTodoDialog,
            selectedTodo,
            editToDo
        }}>
            {children}
        </TodoContext>
    )
}