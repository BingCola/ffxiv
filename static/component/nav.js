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
        initOption: function() {
            this.navUser = this.navTop.querySelector('.cp-user-profile')
        },
        initNavTop: function() {
            this.initUserNav();
            this.attachNavTopEvent();
        },
        attachNavTopEvent: function() {
            $(this.navTop).off('click').on('click', '.cp-nav-item', function(e) {
                var target = e.currentTarget;
                if (target.classList.contains('dropdown')) return;
                if (target.dataset.href) {
                    if (target.getAttribute("target") = "_blank") {
                        location = location.origin + target.dataset.href
                    } else {
                        window.open(location.origin + target.dataset.href)
                    }
                }
            })
        },
        initNavBottom: function() {
            if (!this.navBottom) return;
            this.attachNavBottomEvent();
        },
        attachNavBottomEvent: function() {
            $(this.navTop).off('click').on('click', '.cp-nav-item', function(e) {
                var target = e.currentTarget;
                if (target.dataset.href) {
                    if (target.getAttribute("target") = "_blank") {
                        location = location.origin + target.dataset.href
                    } else {
                        window.open(location.origin + target.dataset.href)
                    }
                }
            })
        },
        initUserNav: function() {
            if (User && User.id) {
                this.navUser.classList.add('isLogin');
                this.setUserProfile();
            } else {
                this.navUser.classList.remove('isLogin')
            }
        },
        setUserProfile: function() {

            this.navUser.querySelector('[data-field="name"]').innerHTML = User.name;
            this.navUser.querySelector('[data-field="portrait"]').src = Setting.path.image + '/user' + User.id + '.png';
            this.navUser.querySelector('[data-field="role"]').innerHTML = CONSTANT.USER.ROLE[User.role].name;

            this.setUserMessage();
            this.setUserLevel();
        },

        setUserMessage: function() {
            var $container = $(this.navUser).find('.cp-user-message');
            if ($container.length == 0) return;
            WebAPI.get('/user/getMessageNum/' + UserManager.id).done(function(result) {
                var total = 0;
                Object.keys(result).forEach(function(item) {
                    total += result[item];
                    result[item] && $container.find('[data-field="' + item + '"] .badge').html(result[item]);
                })
                total && $container.find('.cp-nav-content .badge').html(total);
            })
        },

        setUserLevel: function() {
            var scorePerLevel = 1000;
            var score = User.score;
            var $container = $(this.navUser).find('.level');
            var level = parseInt(score / scorePerLevel) + 1
            $container.find('.number').html(level);
            $container.find('.tip').html(score + '/' + level * scorePerLevel);
            $container.find('.levelScore').css('width', (score % 1000) / 10 + '%');
        },
    }
    exports.nav = Cmpt
})(namespace('cmpt'))