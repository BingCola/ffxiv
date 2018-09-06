export default class Navbar {
    constructor(opt, require) {
        this.opt = opt;
        this.require = require;
    }

    get DEFAULT_OPTION() {
        return {
            template: `
            `,
            brand: ``
        };
    }
    init() {
        this.initRequire();
        this.initOption();
    }
}
