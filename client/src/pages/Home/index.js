import 'c.ui.scss';
import 'common';
import Router from 'router';
import Navbar from 'Navbar/Navbar.js';

import Home from './Home';

let navbar = new Navbar({
    navTop: {
        container: document.querySelector('.c-page-header'),

        brand: ``,
        router: {
            routes: [
                {
                    text: '首页',
                    action: {}
                },
                {
                    text: '幻化',
                    action: {}
                },
                {
                    text: '装修',
                    action: {}
                },
                {
                    text: '图册',
                    action: {}
                },
                {
                    text: '图鉴',
                    children: []
                },
                {
                    text: '帮助',
                    children: [
                        {
                            text: '留言板'
                        },
                        {
                            text: '投稿指南'
                        },
                        {
                            text: '联系我们'
                        },
                        {
                            text: '关于'
                        }
                    ]
                }
            ]
        }
    },
    navBottom: {
        container: document.querySelector('.c-page-footer')
    }
});
navbar.use();

new Router({
    root: 'Home',
    path: [
        {
            name: 'Home',
            constructor: Home
        }
    ],
    plugin: {
        navbar
    },
    container: document.getElementById('root')
});
