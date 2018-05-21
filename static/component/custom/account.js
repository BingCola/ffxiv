(function(exports) {
    function Cmpt(opt) {
        this.opt = opt || {};
        this.panelLogin = undefined;
    }
    Cmpt.prototype = {
        init: function() {
            var setting = {};
            try {
                setting = JSON.parse(localStorage.getItem('app_config'));
                if (!setting) setting = {};
            } catch (e) {
                setting = {};
            }

            if (setting.user && setting.user.account && setting.user.pwd && setting.user.remember) {
                this.login({ account: setting.user.account, pwd: setting.user.pwd });
            } else {
                CPlugin.nav.initUserNav();
            }
        },
        login: function(account) {
            var _this = this;
            // if (account.role == 4) {
            //     url = '/user/login/visitor'
            // } else {
            //     url = '/user/login'
            // }
            var $promise = $.Deferred();
            CPlugin.api.login(account).done(function(result) {
                if (result.success) {
                    window.User = result.data;
                    var user = {
                        id: User.id,
                        role: User.role
                    }
                    if (User.role != 4) {
                        user.account = User.account;
                        user.pwd = User.pwd
                    }
                    localStorage.setItem('app_config', JSON.stringify(user));
                    $promise.resolve();
                } else {
                    window.User = window.User || {};
                    $promise.rejectWith(null, [result.msg]);
                }
            }).fail(function() {
                window.User = window.User || {};
                $promise.reject();
            }).always(function() {
                CPlugin.nav.initUserNav();
            })
            return $promise.promise();
        },


        panelLoginTpl: '\
            <div class="cpc-login-cover"></div>\
            <div class="cpc-login-body">\
                <div class="cpc-ttl">幻化回廊</div>\
                <div class="c-btn cpc-btn-delete iconfont icon-delete-alt" data-action="clear"></div>\
                <div class="c-ctn cpc-login-header">\
                    <div class="cpc-result-msg"></div>\
                    <div class="c-btn cpc-btn-visitor" data-action="visitor">游客身份登陆</div>\
                </div>\
                <div class="cpc-login-box">\
                    <div class="cpc-account input-group cpc-wrap-ipt">\
                        <span class="cpc-ipt-abbdon iconfont icon-user"></span>\
                        <input type="text" class="cpc-account-ipt cpc-ipt" placeholder="账号"">\
                    </div>\
                    <div class="cpc-pwd input-group cpc-wrap-ipt">\
                        <span class="cpc-ipt-abbdon iconfont icon-lock"></span>\
                        <input type="text" id="iptPwd" class="cpc-pwd-ipt cpc-ipt" placeholder="密码"">\
                    </div>\
                    <div class="cpc-login-status">\
                        <span class="c-btn cpc-login-start iconfont icon-start" data-action="login"></span>\
                        <span class="cpc-loading-spin"></span>\
                    </div>\
                </div>\
                <div class="cpc-tool-grp c-ctn">\
                    <!--<span class="cpc-tool-item" data-action="visitor">游客身份登录</span>-->\
                    <span class="cpc-tool-item c-btn c-wrap-check square" data-action="remember"><span class="c-check-icon"></span><span class="c-check-text text">记住密码</span></span>\
                    <span class="cpc-tool-item c-btn" data-action="foget"><span class="text">忘记密码</span></span>\
                    <span class="cpc-tool-item c-btn" data-action="register"><span class="text">注册</span></span>\
                </div>\
            </div>',
        showPanelLogin: function() {
            if (this.panelLogin) return;
            this.panelLogin = document.createElement('div');
            this.panelLogin.classList.add('cpc-login-panel');
            this.panelLogin.innerHTML = this.panelLoginTpl;
            document.body.appendChild(this.panelLogin);
            this.bindPanelLoginEvent();
        },
        clearPanelLogin: function() {
            $(this.panelLogin).remove();
            this.panelLogin = null;
        },
        bindPanelLoginEvent: function() {
            $(this.panelLogin).on('click', '[data-action]', (e) => {
                var target = e.currentTarget;
                switch (target.dataset.action) {
                    case 'clear':
                        this.clearPanelLogin();
                        break;
                    case 'login':
                        this.startLoginByPanel()
                        break;
                    case 'remember':
                        target.classList.toggle('checked')
                        this.rememberAccount(target.classList.contains('checekd'));
                        break;
                }
            })
        },
        rememberAccount: function() {

        },
        showLoginResult: function() {},
        startLoginByPanel: function() {
            var account = {
                account: this.panelLogin.querySelector('.cpc-account-ipt').value,
                pwd: this.panelLogin.querySelector('.cpc-pwd-ipt').value
            }
            var isValid = this.checkLoginInfo(account);
            // if (!isValid) return;
            CPlugin.spinner.spin(this.panelLogin.querySelector('.cpc-loading-spin'), 3)
            this.login(account).done(() => {
                CPlugin.spinner.stop(this.panelLogin.querySelector('.cpc-loading-spin'))
            });
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
            Spinner.spin(container, { type: 'bar' })

            var tipDom = _this.container.querySelector('.resultTip');
            _this.login(postData).done(function() {
                _this.event.afterLogin && _this.event.afterLogin();
                _this.clearEvent();
                _this.hide();
            }).fail(function() {
                tipDom.innerHTML = '登录失败，密码错误';
            }).always(function() {
                Spinner.stop(container)
            })
        },

        destory: function() {

        }
    }
    exports.account = Cmpt
}(namespace('cmpt')))