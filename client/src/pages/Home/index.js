import 'c.ui.scss';
import api from 'api';
import 'common';
import Router from 'router';

import Home from './Home';

new Router({
    root: 'Home',
    path: [
        {
            name: 'Home',
            constructor: Home
        }
    ],
    plugin: {
        api
    },
    container: document.getElementById('root')
});
