import {createStore, applyMiddleware, combineReducers} from 'redux';
import {logger} from 'redux-logger';
import {toolbarReducer} from "./reducers/toolbarReducers";
import {mapsReducer} from "./reducers/mapsRecucers";

const initialState = {
    toolbarReducer: [
        {
            id: 0,
            text: 'reset',
            active: true,
            drawingMode: null
        },
        {
            id: 1,
            text: 'flag',
            active: false,
            drawingMode: 'MARKER'
        },
        {
            id: 2,
            text: 'circle',
            active: false,
            drawingMode: 'CIRCLE'
        },
        {
            id: 3,
            text: 'rectangle',
            active: false,
            drawingMode: 'RECTANGLE'
        },
        {
            id: 4,
            text: 'polygon',
            active: false,
            drawingMode: 'POLYGON'
        },
        {
            id: 5,
            text: 'line',
            active: false,
            drawingMode: 'POLYLINE'
        }
    ],
    mapsReducer: {
        circles: []
    }
};
const app = combineReducers({toolbarReducer, mapsReducer});

export const myStore = createStore(app, initialState, applyMiddleware(logger));