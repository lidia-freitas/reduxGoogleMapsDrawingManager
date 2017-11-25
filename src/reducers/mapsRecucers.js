export const mapsReducer = (state, action) => {
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_ITEM':
            nextState.circles = [...nextState.circles, action.item];
            return nextState;
            break;
        case 'REMOVE_ITEM':
            nextState.circles = [...nextState.circles.filter(item => {
                if (item === action.item) {
                    item.setMap(null)
                } else {
                    return item
                }
            })
            ];
            return nextState;
            break;
        case 'CLEAR_ALL_ITEMS':
            nextState.circles = [...nextState.circles.map(item => {
                item.setMap(null)
            })];

            let count = nextState.circles.length;

            while (count > 0) {
                nextState.circles = [...nextState.circles.slice(1)];
                count--;
            }

            return nextState;
        case 'SET_SELECTED_ITEM':
            nextState.circles = [...nextState.circles.map(item => {
                if (item !== action.item) {
                    item.selected = false;
                } else {
                    item.selected = !item.selected;
                }

                if (item.selected) {
                    item.setOptions({fillColor: '#00FF00'});
                } else {
                    item.setOptions({fillColor: '#FFFF00'});
                }


                return item;
            })];

            return nextState;
        default:
            return nextState;
    }
};