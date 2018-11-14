import Base from '../Nav';
import style from './NavTop.scss';
import html from './NavTop.html';

import api from 'api';
import CONSTANT from 'constant';
import { PATH } from 'config';

export default class NavTop extends Base {
    constructor() {
        super(...arguments);
    }

    get DEFAULT_OPTION() {
        return {
            container: null,
            show: true,
            tpl: ``,

            brand: '',
            router: {
                tpl: `        
                    <div class="${this.CLN.navRouteContent}">
                        <span class="text">{text}</span>
                    </div>
                    <div class="${this.CLN.navSubRouteList}"></div>`,
                tplSub: `
                <div class="${this.CLN.navRouteContent}">
                    <span class="text">{text}</span>
                </div>`,
                routes: []
            },
            userProfile: {
                controller: {
                    login: {
                        tpl: `                
                        <div class="${this.CLN.navRoute} multi ${this.CLN.navUserBoard}" data-field="detail">
                            <div class="${this.CLN.navRouteContent}">
                                <img class="portrait" data-field="portrait" src="{portrait}" />
                            </div>
                            <div class="${this.CLN.navSubRouteList}">
                                <div data-field="name">{name}</div>
                                <div class="block c-clear-fix">
                                    <div data-field="level">
                                        <span class="number"></span>
                                        <span class="shining"></span>
                                        <span class="track"></span>
                                    </div>
                                    <div class="c-clear-fix">
                                        <span class="role fieldItem">{role}</span>
                                        <span class="score fieldItem"></span>
                                    </div>
                                    <div class="c-clear-fix">
                                        <span class="fans fieldItem"><span class="label">粉丝：</span><span data-fill="fans">{fans}</span></span>
                                        <span class="works fieldItem"><span class="label">作品：</span><span data-fill="works">{works}</span></span>
                                        <!--<span class="allowWorks fieldItem"><span class="label">可投稿数量：</span><span data-fill="allowWorks">--</span></span>-->
                                    </div>
                                </div>
                                <div class="block router c-clear-fix">
                                    <span class="route">个人中心</span>
                                    <span class="route">投稿管理</span>
                                    <span class="route">稿件审核</span>
                                    <span class="route">关注管理</span>
                                    <span class="route btnLogout"><span class="icon iconfont icon-logout"></span><span class="text">注销</span></span>
                                </div>
                            </div>
                        </div>
                        <div class="${this.CLN.navRoute} multi">
                            <div class="${this.CLN.navRouteContent}">
                                <span class="text">消息</span>
                                <span class="badge">--</span>
                            </div>
                            <div class="${this.CLN.navSubRouteList}">
                                <div class="${this.CLN.navRoute} sub" data-field="mail">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">私信</span>
                                        <span class="badge" data-fill="mail">--</span>
                                    </div>
                                </div>
                                <div class="${this.CLN.navRoute} sub" data-field="reply">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">回复我的</span>
                                        <span class="badge" data-fill="mail">--</span>
                                    </div>
                                </div>
                                <div class="${this.CLN.navRoute} sub" data-field="call">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">@我的</span>
                                        <span class="badge" data-fill="call">--</span>
                                    </div>
                                </div>
                                <div class="${this.CLN.navRoute} sub" data-field="praise">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">收到的赞</span>
                                        <span class="badge" data-fill="praise">--</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="${this.CLN.navRoute}" data-href="/post">
                            <div class="${this.CLN.navRouteContent}"><span class="text">投稿</span></div>
                        </div>
                        <div class="${this.CLN.navRoute}" data-action="login">
                            <div class="${this.CLN.navRouteContent}"><span class="text">登录 / 注册</span></div>
                        </div>`,
                        param: {}
                    },
                    visitor: {
                        tpl: `
                            <div class="${this.CLN.navRoute} multi  ${this.CLN.navUserBoard}" data-field="detail">
                                <div class="${this.CLN.navRouteContent}">
                                    <img data-field="portrait" src="{portrait}" />
                                </div>
                                <div class="${this.CLN.navSubRouteList}">
                                    <div data-field="name">{name}</div>
                                    <div class="block c-clear-fix">
                                        <div data-field="level">
                                            <span class="number"></span>
                                            <span class="shining"></span>
                                            <span class="track"></span>
                                        </div>
                                        <div class="c-clear-fix">
                                            <span class="role fieldItem">{role}</span>
                                            <span class="score fieldItem"></span>
                                        </div>
                                        <div class="c-clear-fix">
                                            <span class="fans fieldItem"><span class="label">粉丝：</span><span data-fill="fans">{fans}</span></span>
                                            <span class="works fieldItem"><span class="label">作品：</span><span data-fill="works">{works}</span></span>
                                            <!--<span class="allowWorks fieldItem"><span class="label">可投稿数量：</span><span data-fill="allowWorks">--</span></span>-->
                                        </div>
                                    </div>
                                    <div class="block router c-clear-fix">
                                        <span class="route">个人中心</span>
                                        <span class="route">投稿管理</span>
                                        <span class="route">稿件审核</span>
                                        <span class="route">关注管理</span>
                                        <span class="route btnLogout"><span class="icon iconfont icon-logout"></span><span class="text">注销</span></span>
                                    </div>
                                </div>
                            </div>
                        <div class="${this.CLN.navRoute} multi" data-field="message">
                            <div class="${this.CLN.navRouteContent}">
                                <span class="text">消息</span>
                                <span class="badge">--</span>
                            </div>
                            <div class="${this.CLN.navSubRouteList}">
                                <div class="${this.CLN.navRoute} sub" data-field="mail">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">私信</span>
                                        <span class="badge" data-fill="mail">--</span>
                                    </div>
                                </div>
                                <div class="${this.CLN.navRoute} sub" data-field="reply">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">回复我的</span>
                                        <span class="badge" data-fill="mail">--</span>
                                    </div>
                                </div>
                                <div class="${this.CLN.navRoute} sub" data-field="call">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">@我的</span>
                                        <span class="badge" data-fill="call">--</span>
                                    </div>
                                </div>
                                <div class="${this.CLN.navRoute} sub" data-field="praise">
                                    <div class="${this.CLN.navRouteContent}">
                                        <span class="text">收到的赞</span>
                                        <span class="badge" data-fill="praise">--</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div class="${this.CLN.navRoute}" data-href="/post">
                                <div class="${this.CLN.navRouteContent}"><span class="text">投稿</span></div>
                            </div>
                            <div class="${this.CLN.navRoute}" data-action="login">
                                <div class="${this.CLN.navRouteContent}"><span class="text">登录 / 注册</span></div>
                            </div>
                        `
                    },
                    unlogin: {
                        tpl: `            
                            <div class="${this.CLN.navRoute}" data-action="login">
                                <div class="${this.CLN.navRouteContent}"><span class="text">登录 / 注册</span></div>
                            </div>`,
                        param: {}
                    }
                },
                state: 'unlogin'
            },

            event: {
                onInit: null
            }
        };
    }
    get CLASSNAMES() {
        return style;
    }
    get HTML() {
        return html;
    }
    get action() {
        return {
            login: () => {
                this.cmpt.require.login.setOption({
                    event: {
                        afterLogin: user => {
                            let userProfile = this.getUserProfile();
                            this.setUserProfile(userProfile.controller[userProfile.state], userProfile.state);
                        }
                    }
                });
                this.cmpt.require.login.show();
            }
        };
    }
    initNavContent() {
        this.container.classList.add(this.CLN['nav-top']);
        this.initBrand();
        this.initRouter();
        this.initUserProfile();
    }
    initBrand() {
        let container = this.container.querySelector(`.${this.CLN['nav-brand']}`);
        if (this.option.brand) {
            container.innerHTML = this.option.brand;
        } else {
            container.classList.add('c-hide');
        }
    }
    initRouter() {
        let container = this.container.querySelector(`.${this.CLN['nav-router']}`);
        this.option.router.routes.forEach(route => {
            let tpl = route.tpl || this.option.router.tpl;
            let dom = document.createElement('div');
            dom.className = this.CLN.navRoute;
            dom.innerHTML = tpl.fill(route);
            if (route.action && route.action.type) {
                dom.dataset[route.action.type] = route.action.content;
            }

            if (route.children instanceof Array && route.children.length > 0) {
                dom.classList.add('multi');
                dom.querySelector(`.${this.CLN.navRouteContent}`).dataset.text = route.text;
                this.setSubRoutes(dom.querySelector(`.${this.CLN.navSubRouteList}`), route.children);
            } else {
                dom.querySelector(`.${this.CLN.navSubRouteList}`).classList.add('c-hide');
            }
            container.appendChild(dom);
        });
    }
    setSubRoutes(container, routes) {
        routes.forEach(route => {
            let tpl = route.tpl || this.option.router.tplSub;
            let dom = document.createElement('div');
            dom.className = `sub ${this.CLN.navRoute}`;
            dom.innerHTML = tpl.fill(route);
            if (route.action && route.action.type) {
                dom.dataset[route.action.type] = route.action.content;
            }
            container.appendChild(dom);
        });
    }
    initUserProfile() {
        let userProfile = this.getUserProfile();
        this.setUserProfile(userProfile.controller[userProfile.state], userProfile.state);
    }
    getUserProfile() {
        let user = this.cmpt.require.auth.store;
        let userProfile = {};
        if (user.id) {
            userProfile = {
                state: 'login',
                controller: {
                    login: {
                        param: {
                            id: user.id,
                            name: user.name,
                            role: CONSTANT.USER.ROLE[user.role].text,
                            portrait: `${PATH.IMAGE}/user/portrait/${user.id}.png`
                        }
                    }
                }
            };
            if (user.role == 6) {
                userProfile.state = 'visitor';
                userProfile.controller.visitor = userProfile.controller.login;
                userProfile.controller.visitor.param.name = '游客' + user.id;
            }
        } else {
            userProfile = {
                state: 'unlogin'
            };
        }
        return userProfile;
    }
    setUserDetail(container, user) {
        let $container = $(container).find('[data-field="detail"]');
        api.getUserDetail(user.id).done(result => {
            if (!result.success) return;
            $container.find('[data-fill]').each((item, dom) => {
                if (typeof result.data[dom.dataset.fill] != typeof void 0) {
                    dom.innerHTML = result.data[dom.dataset.fill];
                }
            });
        });
    }
    setUserMessage(container, user) {
        let $container = $(container).find('[data-field="message"]');
        if ($container.length == 0) return;
        api.getUserMessageNumber(user.id).done(result => {
            if (!(result && result.success)) return;
            var total = 0;
            let data = result.data;
            Object.keys(data).forEach(function(item) {
                total += data[item];
                let num = NumberUtil.limitMax(data[item], 99);
                if (num) {
                    data[item] &&
                        $container
                            .find('[data-fill="' + item + '"]')
                            .removeClass('c-hide')
                            .html(num);
                } else {
                    data[item] && $container.find('[data-fill="' + item + '"] .badge').addClass('c-hide');
                }
            });
            total = NumberUtil.limitMax(total, 99);
            if (total) {
                $container
                    .find(`.${this.CLN.navRouteContent}>.badge`)
                    .removeClass('c-hide')
                    .html(total);
            } else {
                $container.find('.cc-route-content .badge').addClass('c-hide');
            }
        });
    }

    setUserLevel(container, user) {
        let scorePerLevel = 1000;
        let score = user.score;
        let $container = $(container);
        let level = parseInt(score / scorePerLevel) + 1;
        $container.find('[data-field="level"] .number').html(level);
        $container.find('.score').html(score + '/' + level * scorePerLevel);
        $container.find('[data-field="level"] .track').css('width', (score % 1000) / 10 + '%');
        $container.find('[data-field="level"] .shining').css('left', (score % 1000) / 10 + '%');
    }

    setUserProfileByState(state) {
        if (!this.option.userProfile.controller[state]) {
            console.error('顶部导航条用户菜单模块加载失败：未找到与' + state + '相对应状态配置。');
            return;
        }
        let container = this.container.querySelector(`.${this.CLN['nav-user-profile']}`);
        container.dataset.state = state;
        let option = this.option.userProfile.controller[state];
        let user = option.param;
        container.innerHTML = option.tpl.fill(user);

        this.setUserMessage(container, user);
        this.setUserDetail(container, user);
        this.setUserLevel(container, user);

        option.onInit && option.onInit(container, option);
    }
    setUserProfile(option, state) {
        if (!this.option.userProfile.controller[state]) {
            console.error('顶部导航条用户菜单设置用户信息失败：未找到与' + state + '相对应状态配置。');
            return;
        }
        this.option.userProfile.controller[state] = Object.assign(this.option.userProfile.controller[state], option);
        this.setUserProfileByState(state);
    }
    attachEvent() {
        $(this.container).on('click.route.href', '[data-href]', e => {
            location.href = e.currentTarget.dataset.href;
        });

        $(this.container).on('click.route.action', '[data-action]', e => {
            this.action[e.currentTarget.dataset.action] && this.action[e.currentTarget.dataset.action](e.currentTarget);
        });
    }
}
