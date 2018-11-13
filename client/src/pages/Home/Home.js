import CONSTANT from 'constant';
import { PATH } from 'config';

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
        Promise.all([this.api.getUserMessageNumber(this.User.id), this.api.getUserDetail(this.User.id)]).then(() => {
            this.initNav();
        });

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
                            role: CONSTANT.USER.ROLE[this.User.role].text,
                            portrait: `${PATH.IMAGE}/user/portrait/${this.User.id}.png`
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
                            role: CONSTANT.USER.ROLE[this.User.role].text,
                            portrait: `${PATH.IMAGE}/user/portrait/${this.User.id}.png`
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
                brand: `<img class="cc-nav-brand-img" src="${PATH.IMAGE}/common/logo.png">`,
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
