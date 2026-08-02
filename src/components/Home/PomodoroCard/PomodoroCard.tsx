import './styles.css'

export function PomodoroCard() {
    return (
        <section className="pomodoroCard">
            <h2>Pomodoro</h2>
            <div className="timer">
                <time>25:00</time>
            </div>

            <footer className="buttons">
                <button className="start">Iniciar</button>
                <button className="pause">Pausar</button>
                <button className="reset">Resetar</button>
            </footer>
        </section>
    )
}