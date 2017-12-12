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
        let mapElementSelected = state.mapsReducer.circles.filter(item => item.selected);

        if (!toolSelected) {
            this.drawingManager.setDrawingMode(null);
        } else if (toolSelected.id === 0) {
            this.drawingManager.setDrawingMode(toolSelected.drawingMode);
        } else {
            this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType[toolSelected.drawingMode]);
        }

        if (mapElementSelected.length > 0) {
            mapElementSelected.forEach(item => {
                if (event && event.ctrlKey) {
                    (this.circleList.find(i => i.id === item.id)).setOptions({fillColor: '#00FF00'});
                } else {
                    this.circleList.forEach(i => {
                        i.setOptions({fillColor: i.id === item.id ? '#00FF00' : '#FFFF00'});
                    })
                }
            });
        } else {
            this.circleList.forEach(i => {
                i.setOptions({fillColor: '#FFFF00'});
            })
        }

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