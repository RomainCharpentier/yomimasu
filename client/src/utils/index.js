export function filter(obj, cb) {
    const output = {};
    Object.keys(obj)
        .filter((key) => cb(key, obj[key]))
        .forEach((key) => {
            output[key] = obj[key];
        });
    return output;
}

export function pluck(obj, keys) {
    const output = {};
    for (const [key, val] of Object.entries(obj)) {
        if (keys.includes(key)) output[key] = val;
    }
    return output;
}

export function combineReducers(reducers = {}) {
    return (state = {}, action) => {
        //console.debug('Action Dispatch :: %s %O', action.type, action);

        const nextState = {};
        let changed = false;

        for (const [key, reducer] of Object.entries(reducers)) {
            const prevStateSlice = state[key];
            const nextStateSlice = reducer(prevStateSlice, action);
            nextState[key] = nextStateSlice;
            changed = changed || nextState !== state;
        }

        //console.log(nextState);

        return changed ? nextState : state;
    };
}