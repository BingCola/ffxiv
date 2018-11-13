import 'c.ui.scss';
import 'default.scss';
import 'common';
import Router from 'router';
import Auth from 'auth.js';
import Navbar from 'Navbar/Navbar.js';
import Login from 'Login/Login.js';

import Home from './Home';

let navbar = new Navbar({
    navTop: {
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
                    children: [
                        {
                            text: '套装'
                        },
                        {
                            text: '散件'
                        }
                    ]
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
        router: {
            cols: [
                {
                    sections: [
                        {
                            text: '传送门',
                            routes: [{ text: '幻化回廊' }, { text: '幻化图鉴' }, { text: '装修图鉴' }, { text: '艾欧泽亚图册' }]
                        }
                    ]
                },
                {
                    sections: [
                        {
                            text: '图鉴检索',
                            routes: [{ text: '4.0新装备' }, { text: 'PVP装备' }, { text: '制作装备' }, { text: '蛮神装备' }, { text: '24团体副本装备' }]
                        }
                    ]
                },
                {
                    sections: [
                        {
                            text: '用户相关',
                            routes: [{ text: '个人中心' }, { text: '投稿' }, { text: '收藏柜' }, { text: '搜索历史' }, { text: '关注动态' }]
                        }
                    ]
                },
                {
                    sections: [
                        {
                            text: '友情链接',
                            routes: [{ text: 'FF14官网' }, { text: 'FF14中文网' }, { text: 'NGA玩家社区' }]
                        },
                        {
                            text: '下载支持',
                            routes: [{ text: 'chrome官方正版' }, { text: '网游加速器' }, { text: 'FF14玩家助手' }]
                        }
                    ]
                }
            ]
        },
        copyright: 'Copyright (C) 2010 - 2016 SQUARE ENIX CO., LTD. All Rights Reserved. © 2016'
    }
});

let auth = new Auth();
let login = new Login();
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
