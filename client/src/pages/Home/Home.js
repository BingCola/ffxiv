import Api from '../../service/api';

import Base from 'page';
import Html from './Home.html';
import Style from './Home.scss';

export default class Page extends Base {
    constructor() {
        super(...arguments);
    }
    get router() {
        return router;
    }
    get api() {
        return api;
    }
    get container() {
        return container;
    }
    registerComponents() {
        this.cmpt = {};
    }
    open() {}
    setLayout() {
        this.container.innerHTML = Html.format();
    }
}

const container = document.getElementById('root');
const api = new Api();
