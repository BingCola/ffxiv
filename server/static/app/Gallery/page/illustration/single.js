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
            _this.moduleIndex = new SingleIndex(this, document.getElementById('panelSingleIndex'));
            _this.moduleIndex.init();
        },

        initHistory: function() {
            var opt = {
                cacheKey: 'searchLogOfSingle',
                filter: ['type', 'job', 'race', 'gender', 'iLevel', 'level', 'src', 'version', 'keyword', 'tag'],
                type: 'single',
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
                { 'type': 'tag', tag: 'type', icon: 'iconfont icon-cloth', 'name': '部位' },
                { 'type': 'tag', tag: 'tag', icon: 'iconfont icon-tag', 'name': '标签' },
                { 'type': 'revert' },
                { 'type': 'pagination', 'container': document.getElementById('paginationBar') },
                { 'type': 'top', name: '回到顶部' },
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


var SingleIndex = (function() {
    var _this;

    function SingleIndex(screen, ctn, opt) {
        _this = this;
        this.screen = screen;
        this.ctn = ctn;
        this.$ctn = $(this.ctn);
        this.opt = opt ? opt : {};

        this.store = [];
    }

    SingleIndex.prototype = {
        init: function() {
            this.initOption();
            this.attachEvent();
        },

        initOption: function() {
            (!this.opt) && (this.opt = {});
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
                    type: 0,
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
            Spinner.spin(document.getElementById('containerMain'));
            $('.panelFadeToggle ').removeClass('focus');
            $('.bgContainer ').removeClass('focus');
            WebAPI.post('/search/single/' + this.opt.indexNum + '/' +
                this.opt.page + '/' + this.opt.sort + '/' + this.opt.sortFlag,
                this.opt.request.command).done(function(result) {
                if (!(result.index && result.index instanceof Array)) return;
                for (var i = 0; i < result.index.length; i++) {
                    _this.setIndexDom(result.index[i], i)
                }
                _this.store = result.index;
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

        setIndexDom: function(result) {
            var divSingleIndex, divOverview, divInfo, divNote, divDetail, btnDoCollect;
            var imgOverview, spName, spInfo, spDetail, divDetailImg, spNote;
            divSingleIndex = document.createElement('div');
            divSingleIndex.className = 'divSingleIndex';

            divOverview = document.createElement('div');
            divOverview.className = 'divOverview';
            // if(result['_id']) {
            //     btnDoCollect = document.createElement('span');
            //     if (this.screen.collect.idList.single.indexOf([result['_id']]) > -1) {
            //         btnDoCollect.className = 'btnDoCollect glyphicon glyphicon-star';
            //     } else {
            //         btnDoCollect.className = 'btnDoCollect glyphicon glyphicon-star-empty';
            //     }
            //     btnDoCollect.dataset.id = result['_id'];
            //     btnDoCollect.dataset.name = result.name;
            //     divOverview.appendChild(btnDoCollect);
            // }

            imgOverview = document.createElement('span');
            imgOverview.className = 'imgOverview';
            var imgSrc = AppConfig.cdnSrc + '/images/clothes/single/' + TypeFilter.prototype.getTagInfoByVal(result.type).type + '/' + result.info.img;
            imgOverview.dataset.src = imgSrc;
            imgOverview.style.backgroundImage = 'url("' + imgSrc + '")';

            spName = document.createElement('span');
            spName.className = 'spDetail spName';
            spName.textContent = result.name;

            divOverview.appendChild(imgOverview);
            //divOverview.appendChild(spName);
            divSingleIndex.appendChild(divOverview);

            divInfo = document.createElement('div');
            divInfo.className = 'divDetail';

            divInfo.appendChild(spName);
            divInfo.appendChild(_this.createInfoDom(result.type, 'type'));
            divInfo.appendChild(_this.createInfoDom(result.job, 'job'));
            divInfo.appendChild(_this.createInfoDom(result.race, 'race'));
            divInfo.appendChild(_this.createInfoDom(result.gender, 'gender'));
            divInfo.appendChild(_this.createInfoDom(result.iLevel, 'iLevel'));
            divInfo.appendChild(_this.createInfoDom(result.level, 'level'));
            divInfo.appendChild(_this.createInfoDom(result.version, 'version'));

            divInfo.appendChild(_this.createNoteDom(result.info.srcDesc, 'srcDesc'));
            divInfo.appendChild(_this.createNoteDom(result.info.dye, 'dye'));
            divInfo.appendChild(_this.createNoteDom(result.info.note, 'note'));
            divSingleIndex.appendChild(divInfo);

            _this.ctn.appendChild(divSingleIndex);
        },

        createInfoDom: function(val, type) {
            var _this = this;
            var spInfo = document.createElement('span');
            spInfo.className = 'spDetail';
            spInfo.dataset.type = type;
            var info = this.screen.moduleFilter.mapFilter[type].prototype.info;
            var label = document.createElement('span');
            label.className = 'spDetailLabel';
            label.textContent = info.name + ': ';
            spInfo.appendChild(label);

            var infoContent, arrInfoName = [];
            var content = document.createElement('span');
            content.className = 'spDetailContent';
            if (type == 'level' || type == 'iLevel') {
                content.textContent = val;
            } else {
                if (val instanceof Array && val.length > 0) {
                    val.forEach(function(item) {
                        infoContent = _this.getContentByVal(type, item);
                        if (infoContent && infoContent.name) arrInfoName.push(infoContent.name);
                    })
                } else {
                    infoContent = this.getContentByVal(type, val);
                    if (infoContent && infoContent.name) arrInfoName = [infoContent.name];
                }
                content.innerHTML = arrInfoName.join('&nbsp;&nbsp;&nbsp;');
            }
            spInfo.appendChild(content);
            return spInfo;
        },
        getContentByVal: function(type, val) {
            return this.screen.moduleFilter.store.tagGrp[type].instantiation.getTagInfoByVal(val)
        },
        createNoteDom: function(text, type) {
            var spNote = document.createElement('span');
            spNote.className = 'spDetail';
            spNote.dataset.type = type;
            if (type == 'dye') {
                spNote.textContent = text ? '可染色' : '不可染色'
            } else if (type == 'srcDesc') {
                spNote.textContent = '来源：' + text;
            } else {
                spNote.textContent = text;
            }
            return spNote;
        },
        attachEvent: function() {
            $(this.ctn).on('click', '.imgOverview', function(e) {
                fullScreenImg(e.currentTarget.dataset.src);
            });

            this.$ctn.off('scroll').on('scroll', function(e) {
                if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop < e.currentTarget.offsetHeight + 50) {
                    $(_this.screen.moduleSideTool.paginationCtn).addClass('focus');
                } else {
                    $(_this.screen.moduleSideTool.paginationCtn).removeClass('focus');
                }
            });
        },
        close: function() {

        }
    };

    return SingleIndex
})();