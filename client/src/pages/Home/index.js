import 'c.ui.scss';

import Router from '../../core/router';

import Home from './Home';

const router = new Router({
    root: 'Home',
    path: [
        {
            name: 'Home',
            constructor: Home
        }
    ]
});
