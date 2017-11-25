export class Tool {

    constructor(id, element) {
        this.id = id;
        this.htmlElement = element;
        this.active = false;
    }

    setState = (state) => {
        this.active = state;
    };

    isActive = () => {
        return this.active;
    };

    render = () => {
        if (this.isActive()) {
            this.htmlElement.classList.add('active');
            this.htmlElement.getElementsByTagName('button')[0].focus();
        } else {
            this.htmlElement.classList.remove('active');
            this.htmlElement.getElementsByTagName('button')[0].blur();
        }
    };
}