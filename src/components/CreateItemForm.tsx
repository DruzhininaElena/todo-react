import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    createItem: (newTaskTitle: string) => void
};
export const CreateItemForm = ({createItem}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') createItemHandler()
    }


    return (
        <div>
            <input value={newTaskTitle}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createTaskOnEnterHandler}
                   className={error ? 'error' : ''}
            />
            <Button title={'+'} onClick={createItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};