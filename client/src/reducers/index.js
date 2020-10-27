import {
    combineReducers
} from 'redux'
import books from './books'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    books,
    visibilityFilter
});