(function(exports) {
    function Viewer(page, option) {
        this.page = page;
        this.option = option;
        this.query = undefined;

        this.total = 0;
    }
    Viewer.prototype = {
        init: function() {},
        setAlbum: function(data) {
            var container = document.getElementById('ctnPhotoAlbum');
        },
        setBase: function(data) {
            var container = document.getElementById('ctnBaseInfo');
            var fields = ['title', 'time'].map(function(item) {
                if (item == 'time') {
                    return {
                        name: item,
                        data: new Date(data[item]).format('yyyy-MM-dd HH:mm:ss')
                    }
                } else {
                    return {
                        name: item,
                        data: data[item]
                    }
                }
            });
            this.setFieldData(container, fields)

            this.setDesc(data);
        },
        setDesc: function(data) {
            var container = document.getElementById('ctnDescInfo');
            var fields = ['desc'].map(function(item) {
                return {
                    name: item,
                    data: data[item]
                }
            });
            this.setFieldData(container, fields)
        },
        setTag: function(data) {
            var container = document.getElementById('ctnTagInfo').querySelector('.wrapTagList')
            data.forEach(function(item) {
                container.appendChild(this.createTagDom(item));
            }.bind(this))
        },
        createTagDom: function(data) {
            var dom = document.createElement('div');
            dom.className = "wrapTagItem c-interact";
            dom.dataset.toggle = 'hover'
            var template = '\
            <span class="spContent c-text-3">${content}</span>\
            <div class="divDetail c-popover" data-theme="light">\
                <div class="c-ctn">\
                    <span class="content c-text-1">${content}</span>\
                    <span class="c-btn iconfont icon-thumb-up" data-action="for"></span>\
                    <span class="c-btn iconfont icon-thumb-down" data-action="for"></span>\
                </div>\
                <div class="c-ctn">\
                    <span class="c-btn c-text-4" data-action="attention">关注</span>\
                    <span class="c-btn c-text-4" data-action="delete">删除</span>\
                    <span class="c-btn c-text-4" data-action="report">举报</span>\
                </div>\
            </div>'

            dom.innerHTML = this.formatEl(template, {
                content: data.content
            })
            return dom;
        },
        setRemark: function(data) {
            var container = document.getElementById('ctnRemarkInfo');
            var template = '<span class="icon ${icon}"></span><span class="text c-text-3">${text}</span><span class="num c-text-3">${num}</sann>';

            var dictText = {
                'view': '浏览',
                'praise': '赞',
                'collect': '收藏',
                'shield': '屏蔽',
                'share': '分享'
            }
            var fields = ['share', 'view', 'praise', 'collect', 'shield'].map(function(item) {
                return {
                    name: item,
                    data: {
                        icon: 'iconfont icon-' + item,
                        num: data[item],
                        text: dictText[item]
                    }
                }
            });
            this.setFieldData(container, fields, template);
        },
        setAuthor: function(data) {
            var container = document.getElementById('ctnAuthorInfo');

            container.querySelector('.portrait').src = AppConfig.userImgSrc + data.id + '.png';
            var fields = ['name', 'server', 'desc', 'works', 'fans'].map(function(item) {
                return {
                    name: item,
                    data: data[item]
                }
            });
            this.setFieldData(container, fields);
        },
        setModel: function(data) {
            var container = document.getElementById('ctnModelInfo');
            data.forEach(function(item) {
                container.appendChild(this.createModelDom(item))
            }.bind(this))
        },
        createModelDom: function(data) {
            var _this = this;
            var template = '\
                <div class="divCharacter>\
                    <div class="divField" data-field="portrait"><img class="portrait"></div>\
                    <div class="c-ctn">\
                        <div class="divField" data-field="name"></div>\
                        <div class="divField" data-field="server"></div>\
                        <div class="divField" data-field="desc"></div>\
                    </div>\
                </div>\
                <div class="divEqupment">\
                    ${equip_template}\
                </div>';

            var equip_template = '\
                <div class="divField">\
                    <img class="icon" src="${id}.jpg">\
                    <span class="name">${name}</name>\
                    <span class="desc">${extend}</span>\
                </div>';
            var strEquip = Object.keys(CONSTANT.EQUIP_PART).map(function(item) {
                var info = data.equip[item];
                return _this.formatEl(equip_template, {
                    id: AppConfig.commonImgSrc + 'equip_icon_sm_' + item,
                    name: info.name,
                    extend: CONSTANT.EQUIP_PART[item].name
                });
            }).join('');
            template = template.replace(/\${equip_template}/g, strEquip)
            var dom = document.createElement('div');
            dom.innerHTML = template;
            var fields = ['name', 'server', 'desc'].map(function(item) {
                return {
                    name: item,
                    data: data[item]
                }
            });

            this.setFieldData(dom, fields);
            dom.className = 'divModel'
            return dom;
        },
        setRecommend: function(data) {
            var container = document.getElementById('ctnRecommend').querySelector('.c-slide-list');
            container.innerHTML = '';
            data.forEach(function(item) {
                container.appendChild(this.createRecommendDom(item))
            }.bind(this))
        },
        createRecommendDom: function(data) {
            var dom = document.createElement('div');
            dom.className = 'c-slide'
            dom.dataset.id = data.id
            var template = '<img class="c-slide-img" src="${img}"><span class="c-text-4 c-slide-title">${title}</span>'
            dom.innerHTML = this.formatEl(template, {
                img: AppConfig.galleryImgSrc + data.id + '.jpg',
                title: data.title
            })
            return dom;
        },
        setFieldData: function(container, fields, template) {
            var _this = this;
            if (!fields) return;
            fields.forEach(function(item) {
                container.querySelector('[data-field="' + item.name + '"]').innerHTML =
                    _this.formatEl(template, item.data);
            })
        },
        formatEl: function() {
            var str = arguments[0];
            var content = arguments[1];
            if (!content) return '';
            if (typeof content != 'string') {
                Object.keys(content).forEach(function(key) {
                    var reg = new RegExp('\\${' + key + '}', 'g');
                    str = str.replace(reg, content[key]);
                })
            } else {
                str = content;
            }
            return str;
        }
    }
    exports.viewer = Viewer;
})(namespace('gallery.works'))