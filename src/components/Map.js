import {myStore} from "../store";

export class Map {
    constructor(map, drawingManager, apiKey) {
        this.map = map;
        this.drawingManager = drawingManager;
        this.circleList = [];
    }

    render = () => {
        let state = myStore.getState();

        let toolSelected = state.toolbarReducer.find(item => item.active);
        let mapElementSelected = state.mapsReducer.circles.find(item => item.selected);

        if (!toolSelected) {
            this.drawingManager.setDrawingMode(null);
        } else if (toolSelected.id === 0) {
            this.drawingManager.setDrawingMode(toolSelected.drawingMode);
        } else {
            this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType[toolSelected.drawingMode]);
        }

        this.circleList.forEach(item => {
            if (!mapElementSelected || item.id !== mapElementSelected.id) {
                item.setOptions({fillColor: '#FFFF00'});
            } else if (item.id === mapElementSelected.id) {
                item.setOptions({fillColor: '#00FF00'});
            }
        });

        this.circleList = this.circleList.filter(item => {
            let found = state.mapsReducer.circles.find(i => i.id === item.id);
            if (found) {
                return item
            } else {
                item.setMap(null);
            }

        })

    }
}