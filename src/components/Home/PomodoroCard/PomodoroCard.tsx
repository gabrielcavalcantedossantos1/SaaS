import { useEffect, useState } from 'react'
import './styles.css'

export function PomodoroCard() {

    const INITIAL_TIME = 25 * 60; // 25 minutos em segundos

    const [time, setTime] = useState(INITIAL_TIME)

    const [isRunning, setIsRunning] = useState(false)


    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    return 0;
                }

                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <section className="pomodoroCard">
            <h2>🍅 Pomodoro</h2>
            <div className="timer">
                <time>{formatTime(time)}</time>
            </div>

            <footer className="buttons">
                <button className="start" type="button" onClick={() => setIsRunning(true)} disabled={isRunning}>
                    {time === 0 ? 'Reiniciar' : time === INITIAL_TIME ? 'Iniciar' : 'Continuar'}
                </button>
                <button className="pause" type="button" onClick={() => setIsRunning(false)} disabled={!isRunning}>
                    Pausar
                </button>
                <button className="reset" type="button" onClick={() => {
                    setTime(INITIAL_TIME);
                    setIsRunning(false);
                }}>
                    Resetar
                </button>
            </footer>
        </section>
    )
}