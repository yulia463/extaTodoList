import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../App.module.css";

type UniversalFieldInputType = {
    callback: (newTitle:string) => void
}
export const UniversalFieldInput = (props:UniversalFieldInputType) => {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<'Ошибка, введите имя товара!' | ''>('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError('')
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const trimmedValue = inputValue.trim()
        if (event.key === 'Enter')
            if (trimmedValue !== '') {
                props.callback(inputValue)
                setInputValue('')
            } else {
                setError('Ошибка, введите имя товара!')
                setInputValue('')
            }
    }
    const onClickHandler = () => {
        const trimmedValue = inputValue.trim()
        if (trimmedValue !== '') {
            props.callback(inputValue)
            setInputValue('')
        } else {
            setError('Ошибка, введите имя товара!');
            setInputValue('')
        }
    }

    return (
        <div>
            <input
                value={inputValue}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button
                disabled={inputValue.trim() === ''}
                onClick={onClickHandler}
            >add
            </button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}