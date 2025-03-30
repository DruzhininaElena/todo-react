import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    value: string
    changeTaskTitle: (newTitle: string) => void
};
export const EditableSpan = ({value, changeTaskTitle}: Props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const turnOnEditMode = () => {
        setEditMode(true)
    }
    const turnOffEditMode = () => {
        setEditMode(false)
        changeTaskTitle(title)
    }
    const turnOffEditModeOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setEditMode(false)
        changeTaskTitle(title)

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <input
                    autoFocus
                    onBlur={turnOffEditMode}
                    onKeyDown={turnOffEditModeOnEnterHandler}
                    value={title}
                    onChange={changeTitle}
                />
                ) : (
                <span
                    style={{marginRight: '5px'}}
                    onDoubleClick={turnOnEditMode}
                >
                    {value}
                </span>
            )}
        </>
    );
};