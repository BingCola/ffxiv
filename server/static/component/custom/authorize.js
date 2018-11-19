(function(exports) {
    function Cmpt(opt) {
        this.opt = opt || {};
        this.panelLogin = undefined;
    }
    Cmpt.prototype = {
        init: function() {
            let user = this.getUserLoginProfile();

            if (user && user.account && (user.pwd || user.role == 6) && user.remember) {
                this.login({ account: user.account, pwd: user.pwd });
            } else {
                CPlugin.nav.initUserNav();
            }
        },
        login: function(account) {
            var _this = this;
            let req;
            if (account.role == 6) {
                req = CPlugin.api.loginInVisitor(account);
            } else {
                req = CPlugin.api.login(account);
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
        },

        panelLoginTpl:
            '\
            <div class="cpc-login-cover"></div>\
            <div class="cpc-login-body">\
                <div class="cpc-ttl">幻化回廊</div>\
                <div class="c-btn cpc-btn-delete iconfont icon-delete-alt" data-action="clear"></div>\
                <div class="c-clear-fix cpc-login-header">\
                    <div class="c-btn cpc-btn-visitor" data-action="visitor">游客身份登陆</div>\
                    <div class="cpc-result-msg"></div>\
                </div>\
                <div class="cpc-login-box">\
                    <div class="cpc-account input-group cpc-wrap-ipt c-input-wrap">\
                        <span class="cpc-ipt-abbdon iconfont icon-user"></span>\
                        <input value="{account}" type="text" class="cpc-account-ipt cpc-ipt c-input" placeholder="账号"">\
                    </div>\
                    <div class="cpc-pwd c-input-wrap cpc-wrap-ipt">\
                        <span class="cpc-ipt-abbdon iconfont icon-lock"></span>\
                        <input value="{pwd}" type="password" class="cpc-pwd-ipt cpc-ipt c-input" placeholder="密码"">\
                    </div>\
                    <div class="cpc-login-status">\
                        <span class="c-btn cpc-login-start iconfont icon-start" data-action="login"></span>\
                        <span class="cpc-loading-spinner"></span>\
                    </div>\
                </div>\
                <div class="cpc-tool-grp c-clear-fix">\
                    <!--<span class="cpc-tool-item" data-action="visitor">游客身份登录</span>-->\
                    <span class="cpc-tool-item c-btn c-check-wrap square {remember}" data-action="remember"><span class="c-check-icon"></span><span class="c-check-text text">记住密码</span></span>\
                    <span class="cpc-tool-item c-btn" data-action="foget"><span class="text">忘记密码</span></span>\
                    <span class="cpc-tool-item c-btn" data-action="register"><span class="text">注册</span></span>\
                </div>\
            </div>',
        showPanelLogin: function() {
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
        },
        clearPanelLogin: function() {
            $(this.panelLogin).remove();
            this.panelLogin = null;
        },
        bindPanelLoginEvent: function() {
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
        },
        rememberAccount: function(check) {
            let user = this.getUserLoginProfile();
            user.remember = check ? true : false;
            localStorage.setItem('user_login_profile', JSON.stringify(user));
        },
        getUserLoginProfile: function() {
            var user = {};
            try {
                user = JSON.parse(localStorage.getItem('user_login_profile'));
                if (!user) user = {};
            } catch (e) {
                user = {};
            }
            return user;
        },
        showLoginResult: function(msg) {
            let container = this.panelLogin.querySelector('.cpc-result-msg');
            container.innerHTML = msg;
        },
        startLoginByPanel: function(account) {
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
        },
        loginInVisitor: function() {
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
        },
        checkLoginInfo: function(account) {
            if (!account.account) {
                this.showLoginResult('账号不得为空');
                return false;
            }
            if (!account.pwd) {
                this.showLoginResult('请输入正确的密码格式');
                return false;
            }
            return true;
        },
        onLogin: function(postData) {
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
        },

        destory: function() {}
    };
    exports.authorize = Cmpt;
})(namespace('cmpt'));
