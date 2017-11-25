import {myStore} from "../store";

export class Toolbar {

    constructor(element) {
        this.HtmlElement = element;
        this.toolsList = [];
    }

    getTool = () => {
    };

    setActiveTool = () => {
    };

    setInactiveTool = () => {
    };

    render = () => {

        let state = myStore.getState();

        this.toolsList.forEach(function (item, idx, arr) {
            item.setState(state.toolbarReducer[idx].active);
            item.render();
        });
    };
}