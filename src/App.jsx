import { use, useState } from "react"
import { ChecklistsWrapper } from "./components/ChecklistsWrapper"
import { Container } from "./components/Container"
import Dialog from "./components/Dialog"
import { FabButton } from "./components/FabButton"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Heading } from "./components/Heading"
import { IconPlus, IconSchool } from "./components/icons"
import FormToDo from "./components/FormToDo"
import { TodoContext } from "./components/TodoProvider/TodoContext"
import ToDoGroup from "./components/ToDoGroup"


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
          <ToDoGroup
            title="Para estudar"
            todos={todos.filter(t => !t.completed)}
          />
          <ToDoGroup
            title="Concluído"
            todos={todos.filter(t => t.completed)}
          />
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
