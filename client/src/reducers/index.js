import {
    combineReducers
} from 'redux'

import listReducer from './listReducer';
import updateReducer from './updateReducer';
import filterReducer from './filtersReducer';

export default combineReducers({
    list: listReducer,
    update: updateReducer,
    filters: filterReducer
});