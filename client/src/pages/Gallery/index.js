import 'c.ui.scss';
import 'default.scss';
import 'common';
import 'iconfont/iconfont.css';
import CONSTANT from 'constant';
import Router from 'router';
import Auth from 'auth.js';
import Navbar from 'navbar/navbar.js';
import Login from 'login/login.js';

import Gallery from './gallery';

let auth = new Auth();
let login = new Login({}, { auth });
let navbar = new Navbar(CONSTANT.CMPT_CONFIG.NAVBAR, { auth, login });
let User = {};
let ready = Promise.all([auth.login()]);
ready.then(() => {
    User = auth.store;
    let router = new Router({
        root: 'Gallery',
        path: [
            {
                name: 'Gallery',
                constructor: Gallery
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
