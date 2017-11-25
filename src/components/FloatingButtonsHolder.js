import {myStore} from "../store";

export class FloatingButtonsHolder {
    constructor(element){
        this.htmlElement = element;
        this.btnList = [];
    }

    render = () => {
        let state = myStore.getState();

        let btnClearAll = this.btnList.find(item => item.name === 'btnClearAll');
        let btnClearSelected = this.btnList.find(item => item.name === 'btnClearSelected');

        btnClearAll.setState(state.mapsReducer.circles.length > 0);
        btnClearSelected.setState(state.mapsReducer.circles.some(item => item.selected));

        btnClearAll.render();
        btnClearSelected.render();
    }
}