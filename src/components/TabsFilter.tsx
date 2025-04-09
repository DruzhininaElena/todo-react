import {FilterValue} from '../app/App.tsx';
import {Button, ButtonGroup, Grid} from '@mui/material';

type Props = {
    currentFilterStatus: FilterValue
    changeFilter: (filterValue: FilterValue) => void
};
export const TabsFilter = ({currentFilterStatus, changeFilter}: Props) => {

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <Grid container spacing={1} sx={{mt: '20px', mb: '25px', justifyContent: 'center'}}>
            <ButtonGroup variant="outlined" size={'small'}>
                <Button
                    disableElevation
                    onClick={onAllClickHandler}
                    color={'primary'}
                    variant={currentFilterStatus === 'all' ? 'contained' : 'outlined'}
                >
                    All
                </Button>
                <Button
                    disableElevation
                    onClick={onActiveClickHandler}
                    color={'primary'}
                    variant={currentFilterStatus === 'active' ? 'contained' : 'outlined'}
                >
                    Active
                </Button>
                <Button
                    disableElevation
                    onClick={onCompletedClickHandler}
                    color={'primary'}
                    variant={currentFilterStatus === 'completed' ? 'contained' : 'outlined'}
                >
                    Completed
                </Button>
            </ButtonGroup>
        </Grid>
    );
};