export const mapsReducer = (state, action) => {
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_ITEM':
            nextState.circles = elementAddReducer(nextState.circles, action);
            return nextState;
            break;
        case 'REMOVE_SELECTED_ITEMS':
            nextState.circles = nextState.circles.filter(item => !item.selected);
            return nextState;
            break;
        case 'REMOVE_ALL_ITEMS':
            nextState.circles = [];
            return nextState;
        case 'SET_SELECTED_ITEM':
            nextState.circles = nextState.circles.map(elem => setItemSelectedReducer(elem, action));
            return nextState;
        case 'SET_SELECTED_MULTI_ITEM':
            nextState.circles = nextState.circles.map(elem => setMultiItemSelectedReducer(elem, action));
            return nextState;
        default:
            return nextState;
    }
};

function elementAddReducer(array, action) {
    let newArray = array.slice();
    newArray.splice(newArray.length, 0, action.item);
    return newArray;
}

function setItemSelectedReducer(state, action) {
    if (state.id !== action.item.id) {
        return {
            ...state,
            selected: false
        };
    } else {
        return {
            ...state,
            selected: !state.selected
        };
    }
}

function setMultiItemSelectedReducer(state, action) {
    if (state.id === action.item.id) {
        return {
            ...state,
            selected: true
        }
    } else {
        return {
            ...state
        }
    }
}


