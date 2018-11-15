import auth from 'auth';
import Spinner from 'Spinner/spinner';

import Base from '../component';
import html from './login.html';
import style from './login.scss';

export default class Login extends Base {
    constructor(option, require) {
        super(null, option, require);
    }

    get CLASSNAMES() {
        return style;
    }

    get HTML() {
        return html;
    }
    init() {}

    show() {
        if (!this.container) {
            this.createPanelDom();
            this.attachEvent();
        } else {
            this.container.classlist.remove('c-hide');
        }
    }
    hide() {
        if (this.container) this.container.classlist.add('c-hide');
    }
    createPanelDom() {
        let user = this.require.auth.getUserLoginProfile();
        this.container = document.createElement('div');
        this.container.classList.add(this.CLN['login']);
        this.container.innerHTML = this.HTML.fill(this.CLN).fill({
            remember: user.remember ? 'checked' : '',
            account: user.remember && user.account ? user.account : '',
            pwd: user.remember && user.pwd ? user.pwd : ''
        });

        document.body.appendChild(this.container);
    }
    attachEvent() {
        $(this.container).on('click', '[data-action]', e => {
            var target = e.currentTarget;
            switch (target.dataset.action) {
                case 'hide':
                    this.hide();
                    break;
                case 'login':
                    this.login();
                    break;
                case 'remember':
                    target.classList.toggle('checked');
                    this.require.auth.rememberAccount(target.classList.contains('checked'));
                    break;
                case 'visitor':
                    this.loginInVisitor();
                    break;
            }
        });
    }
    checkLoginInfo(account) {
        if (!account.account) {
            this.showLoginResult('账号不得为空');
            return false;
        }
        if (!account.pwd) {
            this.showLoginResult('请输入正确的密码格式');
            return false;
        }
        return true;
    }
    loginInVisitor() {
        var visitor = {};
        try {
            visitor = JSON.parse(localStorage.getItem('visitor_login_profile'));
            if (!visitor) visitor = {};
        } catch (e) {
            visitor = {};
        }
        if (!visitor.id) {
            this.login({ role: 6 });
        } else {
            this.login(visitor);
        }
    }
    showLoginResult(msg) {
        let container = this.container.querySelector('.cpc-result-msg');
        container.innerHTML = msg;
    }
    login() {
        let account = {
            account: this.container.querySelector(`.${this.loginIpt}[data-field="account"]`).value,
            pwd: this.container.querySelector(`.${this.loginIpt}[data-field="password"]`).value
        };
        if (account.role != 6 && !this.checkLoginInfo(account)) {
            return;
        }
        let wrapLoginStatus = this.container.querySelector(`.${this.CLN.loginStatus}`);
        let wrapLoginStatusSpinner = this.container.querySelector(`.${this.CLN.loginSpinner}`);
        wrapLoginStatus.classList.add('loading');
        Spinner.spin(wrapLoginStatusSpinner, 3);
        this.require.auth
            .login(account)
            .done(result => {
                this.option.event.afterLogin && this.option.event.afterLogin(result);
                this.hide();
            })
            .fail(msg => {
                Spinner.stop(wrapLoginStatusSpinner);
                wrapLoginStatus.classList.remove('loading');
                if (!msg) {
                    this.showLoginResult('服务器暂不可用');
                } else {
                    this.showLoginResult('登录失败，密码错误');
                }
            });
    }
    unuse() {
        $(this.container).remove();
        this.container = null;
    }
}
