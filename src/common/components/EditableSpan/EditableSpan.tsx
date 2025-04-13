import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

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
                <TextField
                    autoFocus
                    onBlur={turnOffEditMode}
                    onKeyDown={turnOffEditModeOnEnterHandler}
                    value={title}
                    onChange={changeTitle}
                    variant={'standard'}
                />
            ) : (
                <span
                    style={{flexGrow: '1', wordBreak: 'break-all'}}
                    onDoubleClick={turnOnEditMode}
                >
                    {value}
                </span>
            )}
        </>
    );
};