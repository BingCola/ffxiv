import api from 'api.js';
import spinner from 'Spinner/Spinner.js';

export default class Auth {
    constructor(option = {}, require = {}) {
        this.option = option;
        this.require = require;
        this.init();
    }

    init() {
        this.initOption();
    }
    initOption() {
        this.store = {};
    }

    get api() {
        return this.require.api || api;
    }
    login(account) {
        let $promise = $.Deferred();
        if (!account) account = this.getUserLoginProfile();
        if (!account) $promise.reject();
        let req;
        if (account.role == 6) {
            req = this.api.loginInVisitor(account);
        } else {
            req = this.api.login(account);
        }
        req.done(result => {
            if (result.success) {
                this.store = result.data;
                let user = {
                    id: this.store.id,
                    role: this.store.role
                };
                let loginProfile = this.getUserLoginProfile();
                loginProfile.account = this.store.account;
                loginProfile.pwd = this.store.pwd;
                loginProfile.role = this.store.role;
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
                this.store = {};
                $promise.rejectWith(null, [result.msg]);
            }
        }).fail(() => {
            this.store = {};
            $promise.reject();
        });
        return $promise.promise();
    }

    rememberAccount(check) {
        let user = getUserLoginProfile();
        user.remember = check ? true : false;
        localStorage.setItem('user_login_profile', JSON.stringify(user));
    }
    getUserLoginProfile() {
        let user = {};
        try {
            user = JSON.parse(localStorage.getItem('user_login_profile'));
            if (!user) user = {};
        } catch (e) {
            user = {};
        }
        return user;
    }
}
