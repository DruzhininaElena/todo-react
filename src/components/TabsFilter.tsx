import {FilterValue} from '../App.tsx';
import {Button} from '@mui/material';

type Props = {
    currentFilterStatus: FilterValue
    changeFilter: (filterValue: FilterValue) => void
};
export const TabsFilter = ({currentFilterStatus, changeFilter}: Props) => {

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <div style={{marginTop: '20px', marginBottom: '20px'}}>
            <Button
                onClick={onAllClickHandler}
                color={'inherit'}
                variant={currentFilterStatus === 'all' ? 'contained' : 'text'}
                size={'small'}
            >
                All
            </Button>
            <Button
                onClick={onActiveClickHandler}
                color={'primary'}
                variant={currentFilterStatus === 'active' ? 'contained' : 'text'}
                size={'small'}
            >
                Active
            </Button>
            <Button
                onClick={onCompletedClickHandler}
                color={'secondary'}
                variant={currentFilterStatus === 'completed' ? 'contained' : 'text'}
                size={'small'}
            >
                Completed
            </Button>
        </div>
    );
};