import {combineReducers} from 'redux';

import listReducer from './reducers/listReducer';
import updateReducer from './reducers/updateReducer';
import filterReducer from './reducers/filterReducer';

const todosReducer = combineReducers({
    list: listReducer,
    update: updateReducer,
    filters: filterReducer
});

export default todosReducer;