/**
 * Created by BingCola on 2016/7/17.
 */
/**
 * Created by BingCola on 2016/7/2.
 */
// AppConfig = {
//     cdnSrc:'http://ffxiv.ufile.ucloud.com.cn'
//     // cdnSrc:'/static'
// };
Spinner = new Loading();
$(document).ready(function() {
    new InitScreen();
});
var InitScreen = (function() {
    var _this;

    function InitScreen() {
        _this = this;

        _this.moduleIndex = undefined;
        _this.moduleHistory = undefined;
        _this.moduleFilter = undefined;
        _this.moduleSideTool = undefined;
        _this.moduleFilter = undefined;

        _this.bgContainer = undefined;
        _this.opt = {

        };
        _this.init();
    }

    InitScreen.prototype = {
        init: function() {
            _this.initBgContainer();
            _this.initIndex();
            _this.initFilter();
            _this.initHistory();
            _this.initSideToolBar();
            _this.attachEvent();
        },

        initBgContainer: function() {
            _this.bgContainer = document.getElementById('bgContainer');
            $(_this.bgContainer).click(function(e) {
                $(e.currentTarget).removeClass('focus');
                $('.panelFadeToggle').removeClass('focus')
            })
        },

        initFilter: function() {
            var filterList = [
                'type', 'job', 'race', 'gender', 'iLevel', 'level', 'src', 'version', 'keyword', 'tag'
            ];
            var opt = {
                list: filterList,
                doSearch: function(request) {
                    _this.moduleIndex.opt.request = request;
                    _this.moduleIndex.setIndex()
                }
            };
            this.moduleFilter = new FilterWidget(this, document.getElementById('panelFilter'), opt);
            this.moduleFilter.init();
        },
        initIndex: function() {
            _this.moduleIndex = new MultiIndex(this, document.getElementById('panelMultiIndex'));
            _this.moduleIndex.init();
        },

        initHistory: function() {
            var opt = {
                cacheKey: 'searchLogOfMulti',
                filter: ['job', 'race', 'gender', 'iLevel', 'level', 'src', 'version', 'keyword', 'tag'],
                type: 'multi',
                doSearch: function(request) {
                    _this.moduleIndex.opt.request = request;
                    _this.moduleIndex.setIndex(null, true)
                }
            };
            _this.moduleHistory = new HistoryWidget(this, document.getElementById('panelHistory'), opt);
            _this.moduleHistory.init();
        },
        initSideToolBar: function() {
            var opt = [
                { 'type': 'filter', 'name': '筛选', module: _this.moduleFilter },
                { 'type': 'history', 'name': '历史', module: _this.moduleHistory },
                { 'type': 'tag', tag: 'job', icon: 'iconfont icon-battle', 'name': '职业' },
                { 'type': 'tag', tag: 'tag', icon: 'iconfont icon-tag', 'name': '标签' },
                { 'type': 'revert' },
                { 'type': 'pagination', 'container': document.getElementById('paginationBar') },
                { 'type': 'top', name: '回到顶部', container: document.getElementById('panelContentWrap'), callback: function() { _this.moduleIndex.setDetailDom(0) } },
            ];
            _this.moduleSideTool = new SideToolBarWidget(this, document.getElementById('panelSideToolBar'), opt);
            _this.moduleSideTool.init();
        },

        initCollect: function() {
            this.collect = new CollectWidget(_this, document.getElementById('panelCollect'))
        },
        toggleSideToolAndFilter: function(target, type, val) {
            if (target == 'filter') {
                var filter = _this.moduleFilter.store.tagGrp[type].instantiation;
                filter.activeTag(val)
            } else if (target == 'sideTool') {
                if (this.moduleSideTool.opt.filter(function(item) { return (item.type == 'tag' && item.tag == type) }).length == 0) return;
                this.moduleSideTool.activeTag(type, val);
            }
        },
        initRequestSet: function(opt, action) {
            this.moduleSideTool.revertTag();
            this.moduleFilter.revertToInit();
            this.moduleIndex.initRequest(opt);
            if (action) {
                if (!action.keepSearch) { $('.iptKeywordSearch ').val(''); }
                if (action.doSearch) this.moduleIndex.setIndex(null)
            } else {
                $('.iptKeywordSearch ').val('');
            }
            _this.moduleFilter.store.tagGrp['keyword'].instantiation.activeTag($('.iptKeywordSearch ').val());
        },
        attachEvent: function() {
            this.initNav();
        },
        initNav: function() {
            document.querySelector('.navBrand').onclick = function() {
                if (AppConfig.isInt) {
                    location.href = location.origin + '/int';
                } else {
                    location.href = location.origin + '';
                }
            };
            document.getElementById('divBtnMultiAccess').onclick = function() {
                if (AppConfig.isInt) {
                    location.href = location.origin + '/multi/int';
                } else {
                    location.href = location.origin + '/multi';
                }
            };
            document.getElementById('divBtnPrimeAccess').onclick = function() {
                if (AppConfig.isInt) {
                    location.href = location.origin + '/prime/int';
                } else {
                    location.href = location.origin + '/prime';
                }
            };
            document.getElementById('divBtnSingleAccess').onclick = function() {
                if (AppConfig.isInt) {
                    location.href = location.origin + '/single/int';
                } else {
                    location.href = location.origin + '/single';
                }
            };

            var $iptKeyword = $('.topNav .iptKeywordSearch');

            $iptKeyword.change(function(e) {
                _this.moduleFilter.store.tagGrp['keyword'].instantiation.activeTag(e.currentTarget.value);
            });
            $iptKeyword.keyup(function(e) {
                if (e.keyCode != 13) return;
                var content = $(e.currentTarget)[0].value;
                if (content == '' || content == undefined) {
                    _this.moduleIndex.initRequestSet({}, { doSearch: true });
                    return;
                }
                var option = { content: {}, command: {} };
                var request = KeywordFilter.prototype.getData(content);
                option.content['keyword'] = request.content;
                option.command['name'] = request.mongodb;
                _this.initRequestSet({ request: option }, { keepSearch: true, doSearch: true });
            });
            $iptKeyword.prev().off('click').on('click', function(e) {
                var content = $(e.currentTarget).next()[0].value;
                if (content == '' || content == undefined) {
                    _this.initRequestSet({}, { doSearch: true });
                    return;
                }
                var option = { content: {}, command: {} };
                var request = KeywordFilter.prototype.getData(content);
                option.content['keyword'] = request.content;
                option.command['name'] = request.mongodb;
                _this.initRequestSet({ request: option }, { keepSearch: true, doSearch: true });
            })
        },
        revertSearch: function(clearFilter) {
            var $search = $(document.querySelector('.iptKeywordSearch '));
            if ($search.val() != '') {
                $search.val('');
                if (clearFilter) this.moduleFilter.store.tagGrp['keyword'].instantiation.activeTag('');
                this.moduleIndex.opt.request.content['keyword'] = 0;
                delete this.moduleIndex.opt.request.command['name'];
            }
        }
    };
    return InitScreen
})();


var MultiIndex = (function() {
    var _this;

    function MultiIndex(screen, ctn, opt) {
        _this = this;
        this.screen = screen;
        this.ctn = ctn;
        this.$ctn = $(this.ctn);
        this.opt = opt ? opt : {};

        this.store = [];
    }

    MultiIndex.prototype = {
        init: function() {
            this.initOption();
            this.attachEvent();
        },

        initOption: function() {
            (!this.opt) && (this.opt = {});
            if (!this.opt.ctnDetail) this.opt.ctnDetail = document.getElementById('panelDetail');
            this.opt.isScroll = false;
            this.calculateItemHeight();
            this.initRequest();
        },

        initRequest: function(opt) {
            this.opt.indexNum = 30;
            this.opt.page = 0;
            this.opt.sort = 'iLevel';
            this.opt.sortFlag = 0;
            this.total = 0;

            this.opt.indexNavInView = 5;

            this.opt.request = {
                content: {
                    job: 0,
                    gender: 0,
                    race: 0,
                    iLevel: 0,
                    level: 0,
                    src: 0,
                    version: 0,
                    keyword: 0
                },
                command: {}
            };
            if (opt) {
                this.opt = $.extendObj(true, {}, this.opt, opt)
            }
        },
        setIndex: function(page, noLog, callback) {
            var _this = this;
            if (page != null) {
                this.opt.page = page
            } else {
                this.store = [];
                this.opt.page = 0
            }
            this.$ctn.html('');
            this.opt.ctnDetail.innerHTML = '';
            Spinner.spin(document.getElementById('containerMain'));
            $('.panelFadeToggle ').removeClass('focus');
            $('.bgContainer ').removeClass('focus');
            WebAPI.post('/search/multi/' + this.opt.indexNum + '/' +
                this.opt.page + '/' + this.opt.sort + '/' + this.opt.sortFlag,
                this.opt.request.command).done(function(result) {
                if (!(result.index && result.index instanceof Array)) return;
                _this.store = result.index;
                for (var i = 0; i < result.index.length; i++) {
                    _this.setIndexDom(result.index[i], i)
                }
                _this.setIndexItemHeight();
                _this.opt.total = result.total;
                if (page == null) {
                    _this.screen.moduleSideTool.setPagination(_this.screen.moduleSideTool.paginationCtn, parseInt(_this.opt.total / _this.opt.indexNum) + 1);
                    if (!noLog) {
                        _this.setSearchLog();
                    }
                }
                callback && callback();
            }).always(function() {
                Spinner.stop();
            })
        },

        setSearchLog: function() {
            this.screen.moduleHistory.insertLog(this.opt.request)
        },

        setIndexDom: function(result, index) {
            var divMultiIndex, divOverview, divInfo, divInfoBg, divBtnGrp, divTtl, btnDoCollect;
            var imgOverview, spName, spInfo, spDetail, divDetailImg, spNote;
            divMultiIndex = document.createElement('div');
            divMultiIndex.className = 'divMultiIndex';

            divOverview = document.createElement('div');
            divOverview.className = 'divOverview';
            divBtnGrp = document.createElement('div');
            divBtnGrp.className = 'divIndexBtnGrp';
            var imgSrc = result.info.img.replace('.jpg', '').replace('.png', '');
            divBtnGrp.innerHTML = '<span data-src="' + AppConfig.cdnSrc + '/images/clothes/multi/' + imgSrc + '" class="btnModelChange btnItem glyphicon glyphicon-random" title="更换模特"></span>';
            // if(result[i]['_id']) {
            //     btnDoCollect = document.createElement('span');
            //     if (this.screen.collect.idList.multi.indexOf([result[i]['_id']]) > -1) {
            //         btnDoCollect.className = 'btnDoCollect glyphicon glyphicon-star';
            //         btnDoCollect.setAttribute('title','取消收藏')
            //     } else {
            //         btnDoCollect.className = 'btnDoCollect glyphicon glyphicon-star-empty';
            //         btnDoCollect.setAttribute('title','收藏')
            //     }
            //     btnDoCollect.dataset.id = result[i]['_id'];
            //     btnDoCollect.dataset.name = result[i].name;
            //     divBtnGrp.appendChild(btnDoCollect);
            // }

            imgOverview = document.createElement('span');
            imgOverview.className = 'imgOverview';
            //imgOverview.src = AppConfig.cdnSrc + '/images/clothes/multi/' + result.info.img;
            divMultiIndex.dataset.src = AppConfig.cdnSrc + '/images/clothes/multi/' + result.info.img;
            imgOverview.style.backgroundImage = 'url("' + AppConfig.cdnSrc + '/images/clothes/multi/' + result.info.img + '")';

            divTtl = document.createElement('div');
            // divTtl.className = 'divTtl figureTtl';
            divTtl.className = 'divTtl';

            spName = document.createElement('span');
            spName.className = 'spName';
            spName.textContent = result.name;

            divTtl.appendChild(spName);
            divTtl.appendChild(divBtnGrp);

            divMultiIndex.appendChild(imgOverview);

            // divInfoBg = document.createElement('div');
            // divInfoBg.className = 'divInfoBg';
            // divOverview.appendChild(divInfoBg);
            divOverview.appendChild(divTtl);
            divMultiIndex.appendChild(divOverview);

            // divInfo = document.createElement('div');
            // divInfo.className = 'divInfo figureText';
            // divInfo.appendChild(_this.createInfoDom(result.job,'job'));
            // //divInfo.appendChild(_this.createInfoDom(result[i].race,'race'));
            // //divInfo.appendChild(_this.createInfoDom(result[i].gender,'gender'));
            // divInfo.appendChild(_this.createInfoDom(result.level,'level'));
            // if(result.iLevel)divInfo.appendChild(_this.createInfoDom(result.iLevel,'iLevel'));
            // // divInfo.appendChild(_this.createInfoDom(result.iLevel,'iLevel'));
            // divInfo.appendChild(_this.createNoteDom(result.info.srcDesc,'srcDesc'));
            // //if(result.version)divInfo.appendChild(this.createInfoDom(result.version,'version'));
            // //divInfo.appendChild(_this.createNoteDom(result.info.dye,'dye'));
            // divInfo.appendChild(_this.createNoteDom(result.info.note,'note'));
            // divOverview.appendChild(divInfo);

            // divMultiIndex.appendChild(_this.createPartIndexDom(result[i].detail));
            // divMultiIndex.appendChild(_this.createPartImg(result[i].detail));
            _this.ctn.appendChild(divMultiIndex);
            if (index == 0) _this.setDetailDom(0);
        },

        setDetailDom: function(index) {
            var result = this.store[index];
            var $dom = $(this.opt.ctnDetail).find(result._id);
            if (this.opt.ctnDetail.dataset.index == index) return;
            if ($dom.length > 0) {
                $dom.siblings().removeClass('focus');
                $dom.addClass('focus');
                return;
            } else {
                $(this.opt.ctnDetail).children().removeClass('focus');
            }
            this.opt.ctnDetail.dataset.index = index;
            var detail = result.detail;
            var dom = document.createElement('div');
            dom.id = result._id;
            dom.className = 'divDetail focus';
            dom.innerHTML = '<span class="spName">' + result.name + '</span>';
            dom.appendChild(this.createInfoDom(result.job, 'job'));
            dom.appendChild(this.createInfoDom(result.race, 'race'));
            dom.appendChild(this.createInfoDom(result.gender, 'gender'));
            dom.appendChild(this.createInfoDom(result.level, 'level'));
            if (result.iLevel) dom.appendChild(this.createInfoDom(result.iLevel, 'iLevel'));
            dom.appendChild(this.createNoteDom(result.info.srcDesc, 'srcDesc'));
            if (result.version) dom.appendChild(this.createInfoDom(result.version, 'version'));
            dom.appendChild(this.createNoteDom(result.info.dye, 'dye'));
            dom.appendChild(this.createNoteDom(result.info.note, 'note'));

            dom.appendChild(this.createConsistDom(detail));

            this.opt.ctnDetail.appendChild(dom);
        },
        createConsistDom: function(detail) {
            var divConsist = document.createElement('div');
            divConsist.className = 'divConsist';
            var arrPartLeft = [
                'weapon',
                'hat',
                'top',
                'glove',
                'belt',
                'under',
                'shoe'
            ];
            var arrPartRight = [
                'sWeapon',
                'necklace',
                'earring',
                'bracelet',
                'ring',
                'ring'
            ];
            var divIndexLeft = document.createElement('div');
            divIndexLeft.className = 'divPartLeft';
            var initIndex = { initType: false };
            for (var i = 0; i < arrPartLeft.length; i++) {
                divIndexLeft.appendChild(this.createIndexDom(arrPartLeft[i], detail[arrPartLeft[i]], initIndex));
            }

            var divIndexRight = document.createElement('div');
            divIndexRight.className = 'divPartRight';

            for (var i = 0; i < arrPartRight.length; i++) {
                divIndexRight.appendChild(this.createIndexDom(arrPartRight[i], detail[arrPartRight[i]], initIndex));
            }
            var divPartOverview = document.createElement('div');
            divPartOverview.className = 'divPartOverview';
            var imgPartOverview;

            var divPartDetail = document.createElement('div');
            divPartDetail.className = 'divPartDetailCtn';
            Object.keys(detail).forEach(function(type) {
                imgPartOverview = document.createElement('span');
                imgPartOverview.className = 'imgPartOverview';
                if (type == initIndex.initType) imgPartOverview.className += ' focus';
                imgPartOverview.dataset.type = type;
                imgPartOverview.style.backgroundImage = 'url("' + AppConfig.cdnSrc + '/images/clothes/single/' + type + '/' + detail[type].img + '")';
                //imgPartOverview.style.backgroundImage = 'url("/static/images/clothes/single/' + type +'/' + 'test1.jpg' + '")';
                //imgPartOverview.src = '/static/images/clothes/single/' + type +'/' + 'test1.jpg';
                divPartOverview.appendChild(imgPartOverview);

                if (type == initIndex.initType) {
                    divPartDetail.innerHTML += '\
                <div class="divPartDetail focus" data-type="' + type + '">\
                <span class="spPartName">' + detail[type].name + ':' + '</span>\
                <span class="spPartSrc">' + detail[type].srcDesc + '</span></div>'
                } else {
                    divPartDetail.innerHTML += '\
                <div class="divPartDetail" data-type="' + type + '">\
                <span class="spPartName">' + detail[type].name + ':' + '</span>\
                <span class="spPartSrc">' + detail[type].srcDesc + '</span></div>'
                }
            });


            divConsist.appendChild(divIndexLeft);
            divConsist.appendChild(divPartOverview);
            divConsist.appendChild(divIndexRight);
            divConsist.appendChild(divPartDetail);

            return divConsist;
        },

        createIndexDom: function(type, index, init) {
            var spIndex = document.createElement('span');
            spIndex.className = 'spPart';
            if (index) {
                spIndex.className += ' active';
                if (!init.initType) {
                    spIndex.className += ' focus';
                    init.initType = type;
                }
            }
            spIndex.dataset.type = type;
            spIndex.innerHTML = '<img src="' + AppConfig.cdnSrc + '/images/common/' + type + '.jpg">';
            return spIndex;
        },
        createInfoDom: function(val, type) {
            var spInfo = document.createElement('span');
            spInfo.className = 'spInfo';
            spInfo.dataset.type = type;
            var info = this.screen.moduleFilter.mapFilter[type].prototype.info;
            var label = document.createElement('span');
            label.className = 'spInfoLabel';
            label.textContent = info.name + ': ';
            spInfo.appendChild(label);

            var content = document.createElement('span');
            content.className = 'spInfoContent';
            if (type == 'level' || type == 'iLevel') {
                content.textContent = val;
            } else {
                if (val instanceof Array) {
                    for (var i = 0; i < info.content.length; i++) {
                        for (var j = 0; j < val.length; j++) {
                            if (info.content[i].val == val[j]) {
                                content.textContent += info.content[i].name + ' ';
                                break;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < info.content.length; i++) {
                        if (info.content[i].val == val) {
                            content.textContent = info.content[i].name;
                            break;
                        }
                    }
                }
            }
            spInfo.appendChild(content);
            return spInfo;
        },
        getDetailById: function(id) {
            for (var i = 0; i < this.store.length; i++) {
                if (id == this.store[i]._id) {
                    return this.store[i];
                }
            }
            return false
        },
        createNoteDom: function(text, type) {
            var spNote = document.createElement('span');
            spNote.className = 'spInfo';
            spNote.dataset.type = type;
            if (type == 'dye') {
                spNote.textContent = text ? '可染色' : '不可染色'
            } else if (type == 'srcDesc') {
                spNote.textContent = '来源：' + text;
            } else if (type == 'iLevel') {
                spNote.textContent = '装等：' + text;
            } else {
                spNote.textContent = text;
            }
            return spNote;
        },

        initScroll: function() {
            var scrollTop = 0;
            var prevScrollTop = 0;

            var scrollDom = document.getElementById('panelContentWrap');
            var timer;
            $(scrollDom).scroll(function(e) {
                scrollTop = $(e.currentTarget).scrollTop();
                // _this.opt.isScroll = true;
                // timer && clearTimeout(timer);
                // timer = setTimeout(function(){
                //     _this.opt.isScroll = false;
                if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop < e.currentTarget.offsetHeight + 50) {
                    $(_this.screen.moduleSideTool.paginationCtn).addClass('focus');
                    scrollTop = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight - 50
                } else {
                    $(_this.screen.moduleSideTool.paginationCtn).removeClass('focus');
                }
                _this.setDetailByPos(scrollTop);
                //     clearTimeout(timer);
                // },300);
            })
        },
        setDetailByPos: function(top) {

            // var index = parseInt((top + 70)/this.opt.itemHeight);
            // $('.divMultiIndex ').eq(index).addClass('focus').siblings().removeClass('focus');
            if (top <= 0) {
                this.opt.ctnDetail.style.webkitTransform = 'translateY(0)';
                this.opt.ctnDetail.style.transform = 'translateY(0)';
            } else {
                this.opt.ctnDetail.style.webkitTransform = 'translateY(' + top + 'px)';
                this.opt.ctnDetail.style.transform = 'translateY(' + top + 'px)';
            }
            // this.setDetailDom(index);
        },
        attachEvent: function() {
            $(this.ctn).on('click', '.divMultiIndex', function(e) {
                fullScreenImg(e.currentTarget.dataset.src);
            });
            $(this.ctn).on('click', '.btnItem', function(e) {
                e.stopPropagation();
                _this.changeModel(e.currentTarget.dataset.src, $(e.currentTarget).parentsUntil('#panelMultiIndex', '.divMultiIndex').find('.imgOverview'));
            });
            $(this.ctn).on('click', '.imgPart', function(e) {
                fullScreenImg(e.currentTarget.src);
            });
            $(this.ctn).on('mouseover', '.divMultiIndex ', function(e) {
                if (_this.opt.isScroll) return;
                if ($(e.currentTarget).hasClass('focus')) return;
                $(e.currentTarget).siblings().removeClass('focus');
                $(e.currentTarget).addClass('focus');
                _this.setDetailDom($(e.currentTarget).index());
            });
            $(this.opt.ctnDetail).on('mouseenter', '.spPart', function(e) {
                var $target = $(e.currentTarget);
                var type = e.currentTarget.dataset.type;
                if (!$target.hasClass('active')) return;

                var $parent = $target.parent();
                var $detail = $parent.siblings('.divPartDetailCtn').children();
                var $imgOverview = $parent.siblings('.divPartOverview').children();
                $target.siblings().removeClass('focus');
                $target.addClass('focus');
                $imgOverview.removeClass('focus');
                $imgOverview.filter('[data-type="' + type + '"]').addClass('focus');
                $detail.removeClass('focus');
                $detail.filter('[data-type="' + type + '"]').addClass('focus')
            });
            $(this.opt.ctnDetail).on('click', '.imgPartOverview', function(e) {
                fullScreenImg(e.currentTarget.src);
            });
            window.onresize = _this.onresize;
            this.initScroll();
        },
        changeModel: function(src, $target) {
            if ($target.parent().hasClass('imgAlt')) {
                $target.parent().removeClass('imgAlt');
            } else {
                if ($target.length < 2) {
                    var img = document.createElement('img');
                    img.onload = function() {
                        var imgOverview = document.createElement('span');
                        imgOverview.className = 'imgOverview imgAlt';
                        imgOverview.src = img.src;
                        //imgOverview.style.backgroundImage = 'url("' + img.src + '")';
                        $target.after(imgOverview);
                        $target.height();
                        $target.parent().addClass('imgAlt');
                    };
                    img.src = src + '_alt.jpg';
                    //img.src = 'http://ffxiv.ufile.ucloud.com.cn/images/clothes/multi/Ilv148fb_zl_suit.jpg';
                } else {
                    $target.parent().addClass('imgAlt');
                }
            }
        },
        onresize: function() {
            _this.calculateItemHeight();
            _this.setIndexItemHeight();
        },
        setIndexItemHeight: function() {
            $('.divMultiIndex').height(this.opt.itemHeight);
        },
        calculateItemHeight: function() {
            this.opt.itemHeight = (document.getElementById('panelMultiIndex').offsetWidth - 60) * 947 / 2000;
            return this.opt.itemHeight;
        },
        close: function() {

        }
    };

    return MultiIndex
})();