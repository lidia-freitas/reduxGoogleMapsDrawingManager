import {myStore} from "./store";
import {Toolbar} from "./components/Toolbar";
import {Tool} from "./components/Tool";

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
import {FloatingButton} from "./components/FloatingButton";
import {googleMapsApiLoader} from "./utils/google-maps-loader/google-maps-api-loader";
import {Map} from "./components/Map";
import {FloatingButtonsHolder} from "./components/FloatingButtonsHolder";


//////// init toolbar
const myToolbar = new Toolbar(document.getElementById('toolbar'));
let idx = 0;

for (let item of myToolbar.HtmlElement.querySelectorAll('div.tool')) {
    let tool = new Tool(idx, item);
    let triggerBtn = tool.htmlElement.querySelectorAll('button')[0];
    let closeBtn = tool.htmlElement.getElementsByClassName('btn-close')[0];

    triggerBtn.addEventListener('click', () => myStore.dispatch(toggleTool(tool.id)));
    if (closeBtn) closeBtn.addEventListener('click', () => myStore.dispatch(clearAll()));
    myToolbar.toolsList.push(tool);
    idx++;
}

bindShortcuts(
    [['ctrl+a'], toggleToolFlag, true],
    [['ctrl+s'], toggleToolCircle, true],
    [['ctrl+d'], toggleToolRectangle, true],
    [['ctrl+f'], toggleToolPolygon, true],
    [['ctrl+g'], toggleToolLine, true],
    [['esc'], clearAll, true],
)(myStore.dispatch);

myStore.subscribe(myToolbar.render);
myToolbar.render();

//////// init maps
const myMap = new Map();

googleMapsApiLoader({libraries: ['drawing'], apiKey: 'AIzaSyCvQYK-Rx0WEIX-wp5gOT7Dmj1a6XAo4Sk'})
    .then(function (google) {
        myMap.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: new google.maps.LatLng(-25.466822, -49.274068)
        });

        myMap.drawingManager = new google.maps.drawing.DrawingManager({
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

        myMap.drawingManager.setMap(myMap.map);

        google.maps.event.addListener(myMap.drawingManager, 'circlecomplete', function (circle) {
            circle.id = myMap.circleList.length;
            myMap.circleList.push(circle);
            myStore.dispatch(addItem({id: circle.id, selected: false}));

            google.maps.event.addListener(circle, 'click', function (ev) {
                myStore.dispatch(setSelectedItem({id: circle.id}))
            });

        });

        myStore.subscribe(myMap.render);
        myMap.render();

    }).catch((err) => {
    console.log(err)
});

//////// init floating buttons
const floatingBtnHolder = new FloatingButtonsHolder(document.getElementById('float-buttons'));
const btnClearAll = new FloatingButton(document.getElementById('btn-clear-all'), 'btnClearAll');
const btnClearSelected = new FloatingButton(document.getElementById('btn-clear-selected'), 'btnClearSelected');

btnClearAll.htmlElement.addEventListener('click', () => {
    myStore.dispatch(clearAllItems());
});

btnClearSelected.htmlElement.addEventListener('click', () => {
    let item = myStore.getState().mapsReducer.circles.find(item => item.selected);
    myStore.dispatch(removeItem(item));
});

floatingBtnHolder.btnList.push(btnClearAll);
floatingBtnHolder.btnList.push(btnClearSelected);

myStore.subscribe(floatingBtnHolder.render);
floatingBtnHolder.render();



