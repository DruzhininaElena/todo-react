import {Button} from './Button.tsx';
import {EditableSpan} from './EditableSpan.tsx';

type Props = {
    title: string
    deleteTodolist: () => void
    changeTodolistTitle: (title: string) => void
};
export const TodolistTitle = ({title, deleteTodolist, changeTodolistTitle}: Props) => {
    return (
        <>
            <h3>
                <EditableSpan value={title} changeTaskTitle={changeTodolistTitle}/>
                <Button title={'x'} onClick={deleteTodolist}/>
            </h3>
        </>
    );
};