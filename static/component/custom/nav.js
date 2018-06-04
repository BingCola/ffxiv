(function(exports) {
    function Cmpt(container, opt) {
        this.navTop = container.top;
        this.navBottom = container.bottom
        this.opt = opt;

        this.user = undefined;
    }
    Cmpt.prototype = {
        init: function() {
            this.initOption();
            this.initNavTop();
            this.initNavBottom();
        },
        get userProfileTpl() {
            return `
                <div class="cpc-user-profile">
                    <div class="cpc-user-info cpc-nav-item dropdown">
                        <div class="cpc-nav-content">
                            <img class="portrait" data-field="portrait" src="{portrait}" />
                        </div>
                        <div class="cpc-nav-sub-list">
                            <span class="name">{name}</span>
                            <div class="level">
                                <span class="number"></span>
                                <span class="track"></span>
                            </div>
                            <div class="c-ctn">
                                <span class="role item">{role}</span>
                                <span class="score item"></span>
                            </div>
                            <div class="c-ctn">
                                <span class="fans item"><span class="label">粉丝：</span><span data-field="fans">--</span></span>
                                <span class="works item"><span class="label">作品：</span><span data-field="works">--</span></span>
                                <!--<span class="allowWorks item"><span class="label">可投稿数量：</span><span data-field="allowWorks">--</span></span>-->
                            </div>
                            <span class="entrance">
                                <span class="item">个人中心</span>
                                <span class="item">投稿管理</span>
                                <span class="item">稿件审核</span>
                                <span class="item">关注管理</span>
                                <span class="item btnLogout"><span class="icon iconfont icon-logout"></span><span class="text">>注销</span></span>
                            </span>
                        </div>
                    </div>
                    <div class="cpc-nav-item dropdown cpc-user-message">
                        <div class="cpc-nav-content">
                            <span class="text">消息</span>
                            <span class="badge"></span>
                        </div>
                        <div class="cpc-nav-sub-list">
                            <div class="cpc-nav-item sub" data-field="mail">
                                <div class="cpc-nav-content">
                                    <span class="text">私信</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                            <div class="cpc-nav-item sub" data-field="reply">
                                <div class="cpc-nav-content">
                                    <span class="text">回复我的</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                            <div class="cpc-nav-item sub" data-field="call">
                                <div class="cpc-nav-content">
                                    <span class="text">@我的</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                            <div class="cpc-nav-item sub" data-field="praise">
                                <div class="cpc-nav-content">
                                    <span class="text">收到的赞</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cpc-nav-item"><div class="cpc-nav-content"><span class="text">收藏夹</span></div></div>
                    <div class="cpc-nav-item"><div class="cpc-nav-content">历史</div></div>
                    <div class="cpc-nav-item" data-href="/post"><div class="cpc-nav-content">投稿</div></div>
                </div>`
        },

        get visitorProfileTpl() {
            return `
                <div class="cpc-user-profile">
                    <div class="cpc-user-info cpc-nav-item dropdown">
                        <div class="cpc-nav-content">
                            <img class="portrait" data-field="portrait" src="{portrait}" />
                        </div>
                        <div class="cpc-nav-sub-list">
                            <span class="name">{name}</span>
                            <div class="level">
                                <span class="number"></span>
                                <span class="track"></span>
                            </div>
                            <div class="c-ctn">
                                <span class="role item">{role}</span>
                                <span class="score item"></span>
                            </div>
                            <div class="c-ctn">
                                <span class="fans item"><span class="label">粉丝：</span><span data-field="fans">--</span></span>
                                <span class="works item"><span class="label">作品：</span><span data-field="works">--</span></span>
                                <!--<span class="allowWorks item"><span class="label">可投稿数量：</span><span data-field="allowWorks">--</span></span>-->
                            </div>
                            <span class="entrance">
                                <span class="item">个人中心</span>
                                <span class="item">投稿管理</span>
                                <span class="item">稿件审核</span>
                                <span class="item">关注管理</span>
                                <span class="item btnLogout"><span class="icon iconfont icon-logout"></span><span class="text">注销</span></span>
                            </span>
                        </div>
                    </div>
                    <div class="cpc-nav-item dropdown cpc-user-message">
                        <div class="cpc-nav-content">
                            <span class="text">消息</span>
                            <span class="badge"></span>
                        </div>
                        <div class="cpc-nav-sub-list">
                            <div class="cpc-nav-item sub" data-field="mail">
                                <div class="cpc-nav-content">
                                    <span class="text">私信</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                            <div class="cpc-nav-item sub" data-field="reply">
                                <div class="cpc-nav-content">
                                    <span class="text">回复我的</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                            <div class="cpc-nav-item sub" data-field="call">
                                <div class="cpc-nav-content">
                                    <span class="text">@我的</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                            <div class="cpc-nav-item sub" data-field="praise">
                                <div class="cpc-nav-content">
                                    <span class="text">收到的赞</span>
                                    <span class="badge"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cpc-nav-item" data-href="/post">
                        <div class="cpc-nav-content"><span class="text">投稿</span></div>
                    </div>
                    <div class="cpc-nav-item" data-action="login">
                        <div class="cpc-nav-content"><span class="text">登录 / 注册</span></div>
                    </div>
                </div>`
        },

        get userLoginTpl() {
            return `
            <div class="cpc-user-profile login">
                <div class="cpc-nav-item" data-action="login">
                    <div class="cpc-nav-content"><span class="text">登录 / 注册</span></div>
                </div>
            </div>
            `
        },
        initOption: function() {
            // this.navUser = this.navTop.querySelector('.cpc-user-profile');
            this.navTopList = this.navTop.querySelector('.cpc-nav-list')
        },
        initNavTop: function() {
            this.initUserNav();
            this.attachNavTopEvent();
        },
        attachNavTopEvent: function() {
            $(this.navTop).off('click').on('click', '.cpc-nav-item', function(e) {
                var target = e.currentTarget;
                if (target.classList.contains('dropdown')) return;
                if (target.dataset.href) {
                    if (target.getAttribute("target") == "_blank") {
                        location = location.origin + target.dataset.href
                    } else {
                        window.open(location.origin + target.dataset.href)
                    }
                } else if (target.dataset.action) {
                    switch (target.dataset.action) {
                        case 'login':
                            CPlugin.authorize.showPanelLogin()
                            break;
                    }
                }
            })
            $(this.container).on('mouseover', '.cpc-nav-item', function() {

            })
        },
        initNavBottom: function() {
            if (!this.navBottom) return;
            this.attachNavBottomEvent();
        },
        attachNavBottomEvent: function() {
            $(this.navBottom).off('click').on('click', '.cpc-nav-item', function(e) {
                var target = e.currentTarget;
                if (target.dataset.href) {
                    if (target.getAttribute("target") == "_blank") {
                        location = location.origin + target.dataset.href
                    } else {
                        window.open(location.origin + target.dataset.href)
                    }
                }
            })
        },
        // initUserNav: function() {
        //     if (User && User.id) {
        //         this.navUser.classList.add('isLogin');
        //         this.setUserProfile();
        //     } else {
        //         this.navUser.classList.remove('isLogin')
        //     }
        // },
        initUserNav: function() {
            if (User && User.id) {
                this.setUserProfile();
            } else {
                this.clearUserProfile();
            }
        },
        setUserProfile: function() {
            $(this.navTop).find('.cpc-user-profile.login').remove();
            let template = User.role != 6 ? this.userProfileTpl : this.visitorProfileTpl;
            this.navUser = $(template.format({
                name: User.role != 6 ? User.name : '游客' + User.id,
                portrait: AppConfig.path.image + '/user/' + User.id + '.png',
                role: CONSTANT.USER.ROLE[User.role].text
            }))[0]
            this.navTopList.appendChild(this.navUser)
            this.setUserMessage();
            this.setUserLevel();
            this.setUserDetail();
        },
        setUserDetail() {
            CPlugin.api.getUserDetail(User.id).done(result => {
                if (!result.success) return;
                $(this.navUser).find('[data-field]').each((item, dom) => {
                    if (typeof result.data[dom.dataset.field] != typeof void 0) {
                        dom.innerHTML = result.data[dom.dataset.field]
                    }
                })
            })
        },
        clearUserProfile() {
            this.navUser && $(this.navUser).remove();
            this.navTopList.appendChild($(this.userLoginTpl)[0])
        },
        setUserMessage: function() {
            var $container = $(this.navUser).find('.cpc-user-message');
            if ($container.length == 0) return;
            CPlugin.api.getUserMessageNumber(User.id).done(function(result) {
                if (!(result && result.success)) return;
                var total = 0;
                let data = result.data;
                Object.keys(data).forEach(function(item) {
                    total += data[item];
                    data[item] && $container.find('[data-field="' + item + '"] .badge').html(NumberUtil.limitMax(data[item], 99));
                })
                total && $container.find('.cpc-nav-content .badge').html(NumberUtil.limitMax(total, 99));
            })
        },

        setUserLevel: function() {
            var scorePerLevel = 1000;
            var score = User.score;
            var $container = $(this.navUser);
            var level = parseInt(score / scorePerLevel) + 1
            $container.find('.number').html(level);
            $container.find('.score').html(score + '/' + level * scorePerLevel);
            $container.find('.track').css('width', (score % 1000) / 10 + '%');
        },
    }
    exports.nav = Cmpt
})(namespace('cmpt'))