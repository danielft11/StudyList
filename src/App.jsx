import { use } from "react"
import { ChecklistsWrapper } from "./components/ChecklistsWrapper"
import { Container } from "./components/Container"
import { FabButton } from "./components/FabButton"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Heading } from "./components/Heading"
import { IconPlus, IconSchool } from "./components/icons"
import { CustomDialog } from "./components/CustomDialog"
import { ToDoForm } from "./components/ToDoForm"
import { TodoContext } from "./components/TodoProvider/TodoContext"
import ToDoGroup from "./components/ToDoGroup"
import { EmptyState } from "./components/EmptyState"

function App() {

  const { toDos, addToDo, showDialog, openFormTodoDialog, closeFormTodoDialog, selectedTodo, editToDo } = use(TodoContext)

  const handleFormSubmit = (formData) => {
    if (selectedTodo) {
      editToDo(formData)
    }
    else {
      addToDo(formData)
    }

    closeFormTodoDialog()
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
            heading="Para estudar"
            items={toDos.filter(t => !t.completed)}
          />
          {toDos.length == 0 && <EmptyState />} {/*Renderização condicional: Se toDos.length é igual a 0, então retorne o componente EmptyState*/}
          <ToDoGroup
            heading="Concluídos"
            items={toDos.filter(t => t.completed)}
          />
          <Footer>
            <CustomDialog isOpen={showDialog} onClose={closeFormTodoDialog}>
              <ToDoForm
                onSubmit={handleFormSubmit}
                defaultValue={selectedTodo?.description}
              />
            </CustomDialog>
            <FabButton onClick={() => openFormTodoDialog()}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  )
}

export default App
