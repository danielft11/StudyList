import './empty-state.style.css'

export function EmptyState() {
    return (
        <section className="emptyState">
            <p>Não existem tarefas cadastradas, adicione para começar!</p>
            <img src="/empty.png" alt="empty image" />
        </section>
    )
}