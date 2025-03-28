import {Button} from './Button.tsx';

type Props = {
    title: string
    deleteTodolist: () => void
};
export const TodolistTitle = ({title, deleteTodolist}: Props) => {
    return (
        <h3>
            {title}
            <Button title={'x'} onClick={deleteTodolist}/>
        </h3>
    );
};