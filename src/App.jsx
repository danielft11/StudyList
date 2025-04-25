import { useState } from "react"
import { ChecklistsWrapper } from "./components/ChecklistsWrapper"
import { Container } from "./components/Container"
import Dialog from "./components/Dialog"
import { FabButton } from "./components/FabButton"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Heading } from "./components/Heading"
import { IconPlus, IconSchool } from "./components/icons"
import { SubHeading } from "./components/SubHeading"
import { ToDoItem } from "./components/ToDoItem"
import { ToDoList } from "./components/ToDoList"
import FormToDo from "./components/FormToDo"


function App() {
  const [showDialog, setShowDialog] = useState(false)
  const [todos, setTodos] = useState([])

  const addToDo = (formData) => {
    console.log('precisamos fazer algo!')
    setShowDialog(false)
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

  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>
        <ChecklistsWrapper>
          <SubHeading>Para estudar</SubHeading>
          <ToDoList>
            {todos.filter(t => !t.completed).map(function (t) {
              return <ToDoItem
                key={t.id}
                item={t}
                onToggleComplete={() => toggleItemCompleted(t)}
                onDelete={() => removeTodo(t)}
              />
            })}
          </ToDoList>
          <SubHeading>Concluído</SubHeading>
          <ToDoList>
            {todos.filter(t => t.completed).map(function (t) {
              return <ToDoItem
                key={t.id}
                item={t}
                onToggleComplete={() => toggleItemCompleted(t)}
                onDelete={() => removeTodo(t)}
              />
            })}
          </ToDoList>
          <Footer>
            <FabButton onClick={() => setShowDialog(!showDialog)}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <FormToDo onSubmit={addToDo} />
      </Dialog>
    </main>
  )
}

export default App
