import auth from 'auth';
import spinner from 'Spinner/Spinner';

import Base from '../component';
import html from './Login.html';
import style from './Login.scss';

export default class Navbar extends Base {
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
            this.createPanelLogin();
            this.attachEvent();
        } else {
            this.container.classlist.remove('c-hide');
        }
    }
    hide() {
        if (this.container) this.container.classlist.add('c-hide');
    }
    createPanelLogin() {
        let user = this.option.profile;
        this.container = document.createElement('div');
        this.container.classList.add('panel');
        this.container.innerHTML = this.HTML.format({
            remember: user.remember ? 'checked' : '',
            account: user.remember && user.account ? user.account : '',
            pwd: user.remember && user.pwd ? user.pwd : ''
        });

        document.body.appendChild(this.container);
    }
    attachEvent() {
        $(this.panelLogin).on('click', '[data-action]', e => {
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
                    this.rememberAccount(target.classList.contains('checked'));
                    break;
                case 'visitor':
                    this.loginInVisitor();
                    break;
            }
        });
    }
    login() {
        var container = this.container.querySelector('.loginStatus');
        Spinner.spin(container, { type: 'bar' });

        var tipDom = this.container.querySelector('.resultTip');
        this.login(postData)
            .done(() => {
                _this.event.afterLogin && _this.event.afterLogin();
                _this.clearEvent();
                _this.hide();
            })
            .fail(function() {
                tipDom.innerHTML = '登录失败，密码错误';
            })
            .always(function() {
                Spinner.stop(container);
            });
    }
    rememberAccount(check) {
        let user = this.getUserLoginProfile();
        user.remember = check ? true : false;
        localStorage.setItem('user_login_profile', JSON.stringify(user));
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
            this.startLoginByPanel({ role: 6 });
        } else {
            this.startLoginByPanel(visitor);
        }
    }
    showLoginResult(msg) {
        let container = this.panelLogin.querySelector('.cpc-result-msg');
        container.innerHTML = msg;
    }
    startLoginByPanel(account) {
        account = account || {
            account: this.panelLogin.querySelector('.cpc-account-ipt').value,
            pwd: this.panelLogin.querySelector('.cpc-pwd-ipt').value
        };
        if (account.role != 6) {
            var isValid = this.checkLoginInfo(account);
            // if (!isValid) return;
        }
        let wrapLoginStatus = this.panelLogin.querySelector('.cpc-login-status');
        let wrapLoginStatusSpinner = this.panelLogin.querySelector('.cpc-loading-spinner');
        wrapLoginStatus.classList.add('loading');
        CPlugin.spinner.spin(this.panelLogin.querySelector('.cpc-loading-spinner'), 3);
        this.login(account)
            .done(() => {
                this.clearPanelLogin();
            })
            .fail(msg => {
                CPlugin.spinner.stop(this.panelLogin.querySelector('.cpc-loading-spinner'));
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
