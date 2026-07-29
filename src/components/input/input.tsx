import { useId, type ChangeEvent } from "react"
import './style.css'

type InputType = {
    text: string,
    type?: string,
    placeholder: string,
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string
}

export function Input({ name, placeholder, text, type, onChange, value }: InputType) {

    const id = useId()

    return (
        <div>
            <label htmlFor={id}>{text}</label>
            <input type={type ?? 'text'} id={id} placeholder={placeholder} name={name} value={value} onChange={onChange} />
        </div>
    )
}