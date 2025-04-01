import {FilterValue} from '../App.tsx';
import {Button, Grid} from '@mui/material';

type Props = {
    currentFilterStatus: FilterValue
    changeFilter: (filterValue: FilterValue) => void
};
export const TabsFilter = ({currentFilterStatus, changeFilter}: Props) => {

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <Grid container spacing={1} sx={{marginTop: '20px', marginBottom: '20px', justifyContent: 'center'}}>
            <Button
                // sx={{flexGrow: '1'}}
                onClick={onAllClickHandler}
                color={'inherit'}
                variant={currentFilterStatus === 'all' ? 'contained' : 'text'}
                size={'small'}
            >
                All
            </Button>
            <Button
                // sx={{flexGrow: '1'}}
                onClick={onActiveClickHandler}
                color={'primary'}
                variant={currentFilterStatus === 'active' ? 'contained' : 'text'}
                size={'small'}
            >
                Active
            </Button>
            <Button
                // sx={{flexGrow: '1'}}
                onClick={onCompletedClickHandler}
                color={'secondary'}
                variant={currentFilterStatus === 'completed' ? 'contained' : 'text'}
                size={'small'}
            >
                Completed
            </Button>
        </Grid>
    );
};