export default class Auth {
    constructor(page, opt = {}, require = {}) {
        this.page = page;
        this.opt = opt;
        this.require = require;
    }

    init() {
        this.initOption();
        this.initRequire();
    }
    initOption() {}
    initRequire() {
        this.api = this.require.api;
    }
    login(account) {
        let _this = this;
        let req;
        if (account.role == 6) {
            req = this.api.loginInVisitor(account);
        } else {
            req = this.api.login(account);
        }
        var $promise = $.Deferred();
        req.done(function(result) {
            if (result.success) {
                window.User = result.data;
                var user = {
                    id: User.id,
                    role: User.role
                };
                let loginProfile = _this.getUserLoginProfile();
                loginProfile.account = User.account;
                loginProfile.pwd = User.pwd;
                loginProfile.role = User.role;
                if (user.role == 6) {
                    loginProfile.remember = true;
                    loginProfile.account = user.account = user.id;
                    let visitor = {};
                    try {
                        visitor = JSON.parse(localStorage.getItem('visitor_login_profile'));
                        if (!visitor) visitor = {};
                    } catch (e) {
                        visitor = {};
                    }
                    if (!visitor.id) {
                        localStorage.setItem('visitor_login_profile', JSON.stringify(user));
                    }
                }
                if (loginProfile.remember) localStorage.setItem('user_login_profile', JSON.stringify(loginProfile));
                $promise.resolve();
            } else {
                window.User = window.User || {};
                $promise.rejectWith(null, [result.msg]);
            }
        })
            .fail(function() {
                window.User = window.User || {};
                $promise.reject();
            })
            .always(function() {
                CPlugin.nav.initUserNav();
            });
        return $promise.promise();
    }

    showPanelLogin() {
        var _this = this;
        if (this.panelLogin) return;
        let user = this.getUserLoginProfile();

        this.panelLogin = document.createElement('div');
        this.panelLogin.classList.add('cpc-login-panel');

        this.panelLogin.innerHTML = this.panelLoginTpl.format({
            remember: user.remember ? 'checked' : '',
            account: user.remember && user.account ? user.account : '',
            pwd: user.remember && user.pwd ? user.pwd : ''
        });
        document.body.appendChild(this.panelLogin);
        this.bindPanelLoginEvent();
    }
    clearPanelLogin() {
        $(this.panelLogin).remove();
        this.panelLogin = null;
    }
    bindPanelLoginEvent() {
        $(this.panelLogin).on('click', '[data-action]', e => {
            var target = e.currentTarget;
            switch (target.dataset.action) {
                case 'clear':
                    this.clearPanelLogin();
                    break;
                case 'login':
                    this.startLoginByPanel();
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
    rememberAccount(check) {
        let user = this.getUserLoginProfile();
        user.remember = check ? true : false;
        localStorage.setItem('user_login_profile', JSON.stringify(user));
    }
    getUserLoginProfile() {
        var user = {};
        try {
            user = JSON.parse(localStorage.getItem('user_login_profile'));
            if (!user) user = {};
        } catch (e) {
            user = {};
        }
        return user;
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
    onLogin(postData) {
        var _this = this;
        var container = this.container.querySelector('.loginStatus');
        Spinner.spin(container, { type: 'bar' });

        var tipDom = _this.container.querySelector('.resultTip');
        _this
            .login(postData)
            .done(function() {
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

    destory() {}
}
