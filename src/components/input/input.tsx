import { useId, type InputHTMLAttributes } from "react"
import "./style.css"

type InputType = InputHTMLAttributes<HTMLInputElement> & {
    text: string
}

export function Input({ text, ...props }: InputType) {
    const id = useId()

    return (
        <div>
            <label htmlFor={id}>{text}</label>

            <input
                id={id}
                {...props}
            />
        </div>
    )
}