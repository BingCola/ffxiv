import api from 'api.js';
import spinner from 'Spinner/Spinner.js';

export default class Auth {
    constructor(option = {}, require = {}) {
        this.option = option;
        this.require = require;
    }

    init() {
        this.initOption();
        this.initRequire();
    }
    initOption() {
        this.store = {};
    }
    initRequire() {
        this.api = this.require.api || api;
    }
    login(account) {
        let req;
        if (account.role == 6) {
            req = this.api.loginInVisitor(account);
        } else {
            req = this.api.login(account);
        }
        var $promise = $.Deferred();
        req.done(result => {
            if (result.success) {
                this.store = Object.assign(this.store, result.data);
                var user = {
                    id: this.store.id,
                    role: this.store.role
                };
                let loginProfile = this.getUserLoginProfile();
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

    rememberAccount(check) {
        let user = getUserLoginProfile();
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
}
