import nanoid from 'nanoid';
import {
    filter
} from '../utils';

export default function tasks(state = {}, action) {
    switch (action.type) {
        case 'TASK_ADD':
            const newId = nanoid();
            return {
                ...state,
                [newId]: action.task,
            };
        case 'TASK_REMOVE':
            return filter(state, (id) => id !== action.id);
        default:
            return state;
    }
}