export default function counter(state = 0, action) {
    switch (action.type) {
        case 'COUNTER_INC':
            return state + 1;
        case 'COUNTER_DEC':
            return state - 1;
        default:
            return state;
    }
}