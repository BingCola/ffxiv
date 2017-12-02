(function(exports) {
    function Cmpt(ctn, opt) {
        this.ctn = ctn;
        this.opt = opt || {};

        this.map = undefined;
        this.init();
    }
    Cmpt.prototype = {
        init: function() {
            var provider = this.opt.provider || 'gaode';
            this.ins = new(namespace('cmpt.map.' + provider))(this.ctn, this.opt);
        },
        destory: function() {
            this.ins.destory();
        }
    }
    exports.map = Cmpt
}(namespace('cmpt')))


;
(function(exports) {
    function Map(ctn, opt) {
        this.ctn = ctn;
        this.opt = opt;

        this.map = undefined;
        this.plugin = {};
        this.init();
    }
    Map.prototype = {
        init: function() {
            this.initOption();
            if (typeof AMap == 'undefined') {
                this.loadScript();
            } else {
                this.initMap();
            }
        },
        initOption: function() {
            var defaultOpt = {
                key: '071ba38e2a58b93dbe167ba04f342783',
                plugin: {
                    search: {

                    }
                }
            }
            this.opt = $.extend({}, defaultOpt, this.opt)
        },
        loadScript: function() {
            var _this = this;
            window.mapLoadCallback = function() {
                console.log('map ready');
                _this.initMap();
            }
            var script = document.createElement('script');
            script.src = 'http://webapi.amap.com/maps?v=1.4.0&key=' + this.opt.key + '&callback=mapLoadCallback'
            var dom = document.getElementsByTagName('body')[0].appendChild(script);
        },
        initMap: function(option) {
            this.map = new AMap.Map(this.ctn.querySelector('.c-map-body'), option
                // {
                //     center: [117.00, 36.68],
                //     zoom: 6
                // }
            );
            if (this.opt.plugin.search) {
                this.initSearch();
            }
        },
        initSearch: function() {
            var _this = this;
            var iptSearch = this.ctn.querySelector('.c-search-ipt');
            iptSearch.id = "mapSearchIpt";
            iptSearch.onkeyup = function(e) {
                if (e.keyCode == 13) {
                    _this.search(iptSearch.value)
                } else {
                    _this.plugin.search && _this.plugin.search.clear();
                }
            }
            this.ctn.querySelector('.c-search-clear').onclick = function(e) {
                $(e.currentTarget).prev().val('')
            }
            this.ctn.querySelector('.c-search-done').onclick = function(e) {
                if (!iptSearch.value) return;
                _this.search(iptSearch.value)
            }
            var $promisePlaceSearch = $.Deferred();
            var $promiseAutoComplete = $.Deferred();
            AMap.service(["AMap.PlaceSearch"], function() {
                $promisePlaceSearch.resolve();
            });
            AMap.plugin('AMap.Autocomplete', function() { //回调函数
                //实例化Autocomplete
                $promiseAutoComplete.resolve();
            })
            $.when($promisePlaceSearch, $promiseAutoComplete).done(() => {
                this.plugin.search = new AMap.PlaceSearch({
                    map: _this.map,
                    panel: _this.ctn.querySelector('.c-search-result'),
                    pageSize: 3
                });
                this.plugin.autoComplete = new AMap.Autocomplete({
                    // input: $(_this.ctn).siblings('.c-search').find('.c-search-ipt')[0]
                    input: 'mapSearchIpt'
                });
                AMap.event.addListener(_this.plugin.autoComplete, "select", select); //注册监听，当选中某条记录时会触发
                function select(e) {
                    _this.plugin.search.setCity(e.poi.adcode);
                    _this.plugin.search.search(e.poi.name); //关键字查询查询
                    _this.opt.plugin.search.afterSelect && _this.opt.plugin.search.afterSelect(e)
                }
            })
        },
        search: function(value) {
            this.plugin.autoComplete.search(' ')
            this.plugin.search && this.plugin.search.search(value)
        },
        onMapLoad: function() {

        },
        destory: function() {
            this.map.destroy();
        }
    }
    exports.gaode = Map

})(namespace('cmpt.map'))