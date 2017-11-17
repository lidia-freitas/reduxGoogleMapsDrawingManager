// TOOL REDUCER
const toolReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_TOOL':
            if (state.id !== action.id) {
                return {
                    ...state,
                    active: false
                };
            } else {
                return {
                    ...state,
                    active: !state.active
                };
            }
        default:
            return state;
    }
};


// TOOLBAR REDUCER
export const toolbarReducer = (state, action) => {

    let nextState = Object.assign([], state);

    switch (action.type) {
        case 'TOGGLE_TOOL':
            nextState = nextState.map(t => toolReducer(t, action));
            return nextState;
            break;
        default:
            return nextState;
    }
};