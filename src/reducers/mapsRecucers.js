export const mapsReducer = (state, action) => {
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_ITEM':
            nextState.circles = [...nextState.circles, action.item];
            return nextState;
            break;
        case 'REMOVE_ITEM':
            nextState.circles = [...nextState.circles.filter(item => {
                if (item.id !== action.item.id) {
                    return item
                }
            })
            ];
            return nextState;
            break;
        case 'SET_SELECTED_ITEM':
            nextState.circles = [...nextState.circles.map(item => {
                if (item.id !== action.item.id) {
                    item.selected = false;
                } else {
                    item.selected = !item.selected;
                }

                return item;
            })];

            return nextState;
        case 'CLEAR_ALL_ITEMS':
            let count = nextState.circles.length;

            while (count > 0) {
                nextState.circles = [...nextState.circles.slice(1)];
                count--;
            }

            return nextState;
        default:
            return nextState;
    }
};
