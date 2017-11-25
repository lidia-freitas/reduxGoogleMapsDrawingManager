import {createStore, applyMiddleware, combineReducers} from 'redux';
import {logger} from 'redux-logger';
import {toolbarReducer} from "./reducers/toolbarReducers";
import {mapsReducer} from "./reducers/mapsRecucers";
import {
    toggleTool,
    clearAll,
    toggleToolFlag,
    toggleToolCircle,
    toggleToolRectangle,
    toggleToolPolygon,
    toggleToolLine,
} from "./actions/toolbarActions";

import {addItem, removeItem, clearAllItems, setSelectedItem} from "./actions/mapsActions";
import {bindShortcuts, mousetrap, Mousetrap} from 'redux-shortcuts';
import {googleMapsApiLoader} from './google-maps-loader/google-maps-api-loader';


const elementMap = document.getElementById('map');
const listFloatButtons = document.getElementById('float-buttons');
let map, drawingManager, google;

googleMapsApiLoader({libraries: ['drawing'], apiKey: 'AIzaSyCvQYK-Rx0WEIX-wp5gOT7Dmj1a6XAo4Sk'})
    .then(createMap)
    .catch((err) => {
        console.log(err);
    });


function createMap(googleApi) {
    google = googleApi;

    map = new google.maps.Map(elementMap, {
        zoom: 15,
        center: new google.maps.LatLng(-25.466822, -49.274068)
    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: false,
        drawingControlOptions: {
            drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        },
        markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: true,
            editable: true,
            zIndex: 1
        }
    });

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        google.maps.event.addListener(circle, 'click', function (ev) {
            store.dispatch(setSelectedItem(this))
        });

        store.dispatch(addItem(circle));
    });

    render();
    clearIsVisible();
}


const toolbarElement = document.getElementById('toolbar');

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
const store = createStore(app, initialState, applyMiddleware(logger));

function render() {
    let state = store.getState();
    let inactiveCount = 0;

    for (let i = 0; i < toolbarElement.childElementCount; i++) {
        if (state.toolbarReducer[i].active) {
            toolbarElement.children[i].classList.add('active');
            toolbarElement.children[i].getElementsByTagName('button')[0].focus();
            if (state.toolbarReducer[i].id === 0) {
                drawingManager.setDrawingMode(state.toolbarReducer[i].drawingMode);
            } else {
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType[state.toolbarReducer[i].drawingMode]);
            }
        } else {
            inactiveCount++;
            toolbarElement.children[i].classList.remove('active');
            toolbarElement.children[i].getElementsByTagName('button')[0].blur();
        }

        if (inactiveCount === toolbarElement.childElementCount) {
            drawingManager.setDrawingMode(null);
        }
    }
}

function clearIsVisible() {
    let state = store.getState();

    let btnClearAll = listFloatButtons.children[0];
    let btnClearOne = listFloatButtons.children[1];

    if (state.mapsReducer.circles.length > 0) {
        btnClearAll.style.visibility = 'visible';
    } else {
        btnClearAll.style.visibility = 'hidden';
    }

    if (state.mapsReducer.circles.some(item => item.selected)) {
        btnClearOne.style.visibility = 'visible';
        state.mapsReducer.circles.forEach(item => {
            if(item.selected){

            }else{

            }
        })
    } else {
        btnClearOne.style.visibility = 'hidden';
    }
}

store.subscribe(render);
store.subscribe(clearIsVisible);


//ACTIONS
for (let i = 0; i < toolbarElement.childElementCount; i++) {
    toolbarElement.children[i].getElementsByTagName('button')[0].addEventListener('click', () => {
        store.dispatch(toggleTool(i))
    })
}

let closeBtns = document.getElementsByClassName('btn-close');

for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', () => {
        store.dispatch(clearAll());
    })
}


bindShortcuts(
    [['ctrl+a'], toggleToolFlag, true],
    [['ctrl+s'], toggleToolCircle, true],
    [['ctrl+d'], toggleToolRectangle, true],
    [['ctrl+f'], toggleToolPolygon, true],
    [['ctrl+g'], toggleToolLine, true],
    [['esc'], clearAll, true],
)(store.dispatch);

let btnClearAll = listFloatButtons.children[0];
let btnClearSelected = listFloatButtons.children[1];

btnClearSelected.addEventListener('click', () => {
    let item = store.getState().mapsReducer.circles.find(item => item.selected);
    store.dispatch(removeItem(item));
});

btnClearAll.addEventListener('click', () => {
   store.dispatch(clearAllItems());
});

