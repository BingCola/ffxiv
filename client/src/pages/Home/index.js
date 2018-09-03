import Base from '../../core/page';
import Html from './index.html';
import Style from './index.sass';

export default class Page extends Base {
    constructor() {
        super(...arguments);
    }
    open() {}
    setLayout() {}
}

new Page();
