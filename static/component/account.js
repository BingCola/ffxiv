(function(exports) {
    function Cmpt(opt) {
        this.opt = opt || {};
        this.panelLogin = undefined;
    }
    Cmpt.prototype = {
        init: function() {
            var user = {};
            var setting = {};
            try {
                user = JSON.parse(localStorage.getItem('user_info'));
            } catch (e) {
                user = {};
            }
            try {
                setting = JSON.parse(localStorage.getItem('app_config'));
            } catch (e) {
                setting = {};
            }

            if (user.id && setting.user && setting.user.remember) {
                this.login(user);
            } else {
                CPlugin.nav.initUserNav();
            }
        },
        login: function(account) {
            var _this = this;
            var url = '';
            // if (account.role == 4) {
            //     url = '/user/login/visitor'
            // } else {
            //     url = '/user/login'
            // }
            url = '/user/login';
            var $promise = $.Deferred();
            WebAPI.post(url, account).done(function(result) {
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
                    localStorage.setItem('user_info', JSON.stringify(user));
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
            <div class="cp-panel-cover"></div>\
            <div class="cp-panel-body">\
                <div class="cp-ttl">幻化回廊</div>\
                <div class="cp-result-msg"></div>\
                <div class="c-btn cp-btn-delete iconfont icon-delete-alt" data-action="delete"></div>\
                <div class="cp-login-box">\
                    <div class="cp-account input-group">\
                        <span class="input-group-addon iconfont icon-user"></span>\
                        <input type="text" class="cp-account-ipt" placeholder="账号"">\
                    </div>\
                    <div class="cp-pwd input-group">\
                        <span class="input-group-addon iconfont icon-lock"></span>\
                        <input type="text" id="iptPwd" class="cp-pwd-ipt" placeholder="密码"">\
                    </div>\
                    <div class="cp-login-status">\
                        <span class="c-btn cp-login-start glyphicon glyphicon-play" data-action="login"></span>\
                        <span class="cp-loading-spin"></span>\
                    </div>\
                </div>\
                <div class="cp-tool-grp">\
                    <span class="cp-tool-item" data-action="visitor">游客身份登录</span>\
                    <span class="cp-tool-item" data-action="foget">忘记密码</span>\
                    <span class="cp-tool-item" data-action="register">注册</span>\
                </div>\
            </div>',
        showPanelLogin: function() {
            if (this.panelLogin) return;
            this.panelLogin = document.createElement('div');
            this.panelLogin.classList.add('.cp-panel-login');
            this.panelLogin.innerHTML = this.panelLoginTpl;
            this.bindPanelLoginEvent();
        },
        clearPanelLogin: function() {
            $(this.panelLogin).remove();
            this.panelLogin = null;
        },
        bindPanelLoginEvent: function() {
            $(this.panelLogin).oin('[data-action]', function(e) {
                var target = e.currentTarget;
                switch (target.action) {
                    case 'delete':
                        this.clearPanelLogin();
                        break;
                    case 'login':
                        this.startLoginByPanel()
                        break;
                }
            })
        },
        showLoginResult: function() {},
        startLoginByPanel: function() {
            var account = {
                account: this.panel.querySelector('cp-account-ipt').value,
                pwd: this.panel.querySelector('cp-pwd-ipt').value
            }
            var isValid = this.checkLoginInfo(account);
            if (!isValid) return;
            Spinner.spin(this.panelLogin.querySelector('.cp-loading-spin'), 2)
            this.login(account).done(function() {
                Spinner.stop(this.panelLogin.querySelector('.cp-loading-spin'))
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