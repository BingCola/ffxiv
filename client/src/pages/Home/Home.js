import Base from 'page';
import Html from './Home.html';
import Style from './Home.scss';

export default class Page extends Base {
    constructor() {
        super(...arguments);
    }
    get CLASS() {
        return Style;
    }
    get container() {
        return this.router.container;
    }
    registerComponents() {
        this.cmpt = {};
    }
    open() {}
    setLayout() {
        this.container.innerHTML = Html.fill(Style);
    }
}
