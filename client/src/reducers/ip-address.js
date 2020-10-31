const initialState = {
    value: '',
    loading: false,
};

export default function ipAddress(state = initialState, action) {
    switch (action.type) {
        case 'IP_REQUEST':
            return {
                value: '',
                loading: true,
            };
        case 'IP_RECEIVE':
            return {
                value: action.ip,
                loading: false,
            };
        case 'IP_RESET':
            return {
                value: '',
                loading: false,
            };
        default:
            return state;
    }
}