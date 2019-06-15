import { combineReducers } from 'redux';
import {chipReducer} from './chipReducer';

const rootReducer = combineReducers({
    reactChip: chipReducer
});

export default rootReducer;