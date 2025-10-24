import './toDo-Form.style.css'
import { TextInput } from '../TextInput' // ../ = volta para a pasta componentes e acessa a pasta TextInput
import Button from '../Button' // ../ = volta para a pasta componentes e acessa a pasta Button

export function ToDoForm({ onSubmit, defaultValue }) {
    return (
        <form className="toDo-Form" action={onSubmit}>
            <TextInput
                placeholder="Digite o item que deseja adicionar"
                required
                name="description"
                defaultValue={defaultValue}
            />
            <Button type="submit">Salvar item</Button>
        </form>
    )
}