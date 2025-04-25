import { use, useState } from "react"
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
import { TodoContext } from "./components/TodoProvider/TodoContext"


function App() {
  const [showDialog, setShowDialog] = useState(false)
  const { todos, addToDo } = use(TodoContext)

  const handleFormSubmit = (formData) => {
    addToDo(formData)
    setShowDialog(false)
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
          {/* <ToDoGroup
            title="Para estudar"
            todos={todos.filter(t => !t.completed)}
            onToggleComplete={toggleItemCompleted}
            onDelete={removeTodo}
          /> */}
          <SubHeading>Para estudar</SubHeading>
          <ToDoList>
            {todos.filter(t => !t.completed).map(function (t) {
              return <ToDoItem
                key={t.id}
                item={t}
              />
            })}
          </ToDoList>
          <SubHeading>Concluído</SubHeading>
          <ToDoList>
            {todos.filter(t => t.completed).map(function (t) {
              return <ToDoItem
                key={t.id}
                item={t}
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
        <FormToDo onSubmit={handleFormSubmit} />
      </Dialog>
    </main>
  )
}

export default App
