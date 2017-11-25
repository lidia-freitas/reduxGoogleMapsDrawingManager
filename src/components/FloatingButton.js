export class FloatingButton {
    constructor(element, name) {
        this.htmlElement = element;
        this.name = name;
        this.visible = null;
    }

    setState = (state) => {
        this.visible = state;
    };

    isvisible = () => {
        return this.visible;
    };

    render = () => {
        if (this.visible) {
            this.htmlElement.style.visibility = 'visible';
        } else {
            this.htmlElement.style.visibility = 'hidden';
        }
    };
}