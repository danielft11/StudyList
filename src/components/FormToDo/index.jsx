import Button from '../Button';
import TextInput from '../TextInput';
import './form-todo.style.css';

const FormToDo = ({ onSubmit }) => {

    return (
        <form action={onSubmit} className='form'>
            <TextInput
                placeholder="Digite o item que deseja adicionar"
                name="description"
            />
            <Button>
                Salvar item
            </Button>
        </form>
    )
}

export default FormToDo;