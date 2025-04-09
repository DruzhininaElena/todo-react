import {AppDispatch} from '../../app/store.ts';
import {useDispatch} from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()