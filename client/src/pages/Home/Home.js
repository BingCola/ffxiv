import CONSTANT from 'constant';

import Base from 'page';
import html from './Home.html';
import style from './Home.scss';

export default class Page extends Base {
    constructor() {
        super(...arguments);
    }
    get CLASSNAMES() {
        return style;
    }
    get HTML() {
        return html;
    }
    get container() {
        return this.router.container;
    }
    registerComponents() {}
    show() {
        this.initNav();

        this.initPanelGuide();
        this.initPanelRecommend();
        this.initPanelWorksPartition();
        this.initPanelRouter();

        this.attachEvent();
    }
    initNav() {
        let userProfile = {};
        if (this.User.role == 6) {
            userProfile = {
                state: 'visitor',
                controller: {
                    visitor: {
                        param: {
                            name: '游客' + this.User.id,
                            role: CONSTANT.USER.ROLE[this.User.role].text
                        }
                    }
                }
            };
        } else if (this.User.id) {
            userProfile = {
                state: 'login',
                controller: {
                    login: {
                        param: {
                            name: this.User.name,
                            role: CONSTANT.USER.ROLE[this.User.role].text
                        }
                    }
                }
            };
        } else {
            userProfile = {
                state: 'unlogin'
            };
        }
        this.cmpt.navbar.setOption({
            navTop: {
                container: document.querySelector('.c-page-header'),
                userProfile
            },
            navBottom: {
                container: document.querySelector('.c-page-footer')
            }
        });
        this.cmpt.navbar.use();
    }
    initPanelGuide() {}
    initPanelRecommend() {}
    initPanelWorksPartition() {}
    initPanelRouter() {}
    attachEvent() {}
}
