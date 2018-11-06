import Base from '../component';
import NavTop from './NavTop/NavTop.js';
import NavBottom from './NavBottom/NavBottom.js';

export default class Navbar extends Base {
    constructor(option, require) {
        super(null, option, require);
    }

    init() {
        this.initNavTop();
        this.initNavBottom();
    }

    initNavTop() {
        if (this.option.navTop) this.navTop = new NavTop(this, this.option.navTop.container, this.option.navTop);
    }

    initNavBottom() {
        if (this.option.navBottom) this.navBottom = new NavBottom(this, this.option.navBottom.container, this.option.navBottom);
    }
}
