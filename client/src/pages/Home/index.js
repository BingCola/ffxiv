import 'c.ui.scss';
import 'iconfont/iconfont.css';
import 'default.scss';
import 'common';

import CONSTANT from 'constant';
import Router from 'router';
import Auth from 'auth.js';
import Navbar from 'Navbar/Navbar.js';
import Login from 'Login/Login.js';

import Home from './Home';

let auth = new Auth();
let login = new Login({}, { auth });
let navbar = new Navbar(CONSTANT.CMPT_CONFIG.NAVBAR, { login, auth });
let User = {};
let ready = Promise.all([auth.login()]);
ready.then(() => {
    User = auth.store;
    let router = new Router({
        root: 'Home',
        path: [
            {
                name: 'Home',
                constructor: Home
            }
        ],
        component: {
            navbar,
            login
        },
        util: { auth },
        global: { User },
        container: document.getElementById('root')
    });

    if (process.env.NODE_ENV == 'development') window.Router = router;
});
