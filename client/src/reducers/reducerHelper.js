export function initiate(draft) {
    draft.pending = true;
    draft.error = null;
}

export function error(draft, action) {
    draft.pending = false;
    draft.error = action.payload;
}