export const mapsReducer = (state, action) => {
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_ITEM':
            return nextState.circles.push(action.item);
            break;
        case 'REMOVE_ITEM':
            return nextState.circles.filter(item => !action.item);
            break;
        default:
            return nextState;
            break;
    }
};