import {Button} from './Button.tsx';
import {FilterValue} from '../App.tsx';

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
            <Button title={'All'}
                    onClick={onAllClickHandler}
                    className={currentFilterStatus === 'all' ? 'active-filter' : ''}
            />
            <Button title={'Active'}
                    onClick={onActiveClickHandler}
                    className={currentFilterStatus === 'active' ? 'active-filter' : ''}
            />
            <Button title={'Completed'}
                    onClick={onCompletedClickHandler}
                    className={currentFilterStatus === 'completed' ? 'active-filter' : ''}
            />
        </div>
    );
};