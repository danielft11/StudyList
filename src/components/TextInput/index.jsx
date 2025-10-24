import './text-input.style.css';

export function TextInput(props) {
    return <input {...props} className="text-input" />; // Spread operator "{...props}" para passar todas as props recebidas para o input
}