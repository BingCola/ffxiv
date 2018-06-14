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
                        data: moment(data[item]).format('YYYY-MM-DD HH:mm:ss')
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
            <span class="spContent">${content}</span>\
            <div class="divDetail c-popover" data-theme="light">\
                <div class="c-ctn">\
                    <span class="content">${content}</span>\
                    <span class="c-btn iconfont icon-thumb-up" data-action="for"></span>\
                    <span class="c-btn iconfont icon-thumb-down" data-action="for"></span>\
                </div>\
                <div class="c-ctn">\
                    <span class="c-btn" data-action="attention">关注</span>\
                    <span class="c-btn" data-action="delete">删除</span>\
                    <span class="c-btn" data-action="report">举报</span>\
                </div>\
            </div>'

            dom.innerHTML = this.formatEl(template, {
                content: data.content
            })
            return dom;
        },
        setRemark: function(data) {
            var container = document.getElementById('ctnRemarkInfo');
            var template = '<span class="icon ${icon}"></span><span class="text">${text}</span><span class="num">${num}</sann>';

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

            container.querySelector('.portrait').src = `${AppConfig.path.image}/user/${data.id}.png`;
            var fields = ['name', 'server', 'desc', 'works', 'fans'].map(function(item) {
                return {
                    name: item,
                    data: item == 'server' ? CONSTANT.SERVER[data[item]].name : data[item]
                }
            });
            this.setFieldData(container, fields);
        },
        setModel: function(data) {
            var container = document.getElementById('ctnModelInfo').querySelector('.ctnModelList');
            var ctnIndex = document.getElementById('ctnModelInfo').querySelector('.modelToggleIndex');
            ctnIndex.innerHTML = '';
            if (data.lenth == 0) {
                ctnIndex.classList.add('hide;')
            }
            data.forEach(function(item, index) {
                var dom = this.createModelDom(item);
                container.appendChild(dom)
                if (index == 0) {
                    dom.classList.add('focus');
                    ctnIndex.innerHTML += '<span class="spIndex focus" data-index="' + index + '"></span>'
                } else {
                    ctnIndex.innerHTML += '<span class="spIndex" data-index="' + index + '"></span>'
                }
            }.bind(this))
        },
        createModelDom: function(data) {
            var _this = this;
            var template = '\
                <div class="divCharacter">\
                    ${char_template}\
                </div>\
                <div class="divEqupment">\
                    ${equip_template}\
                </div>';

            var char_template = '\
                <div class="divField" data-field="portrait"><img src="${portrait}" onerror="this.style.display=\'none\'" class="c-portrait portrait"></div>\
                <div class="c-ctn fluid">\
                    <div class="c-wrap c-ctn charAction">${tool}</div>\
                    <div class="c-wrap divField" data-field="race">${race}</div>\
                    <div class="c-wrap divField" data-field="name">${name}</div>\
                </div>\
                <div class="divField" data-field="desc">${desc}</div>';

            var chart_tool_template = '\
                <span class="c-btn iconfont icon-attention" data-action="attention"></span>\
                <span class="c-btn iconfont icon-message" data-action="message"></span>';
            var strChar = this.formatEl(char_template, {
                name: data.name,
                race: CONSTANT.CHARACTER.RACE[data.race].name,
                desc: data.desc,
                portrait: data.id ? `
                        $ { AppConfig.path.image }
                        /user/$ { data.id }.png ` : `
                        $ { AppConfig.path.image }
                        /common/character / race_icon_$ { data.race }.png `,
                tool: data.id ? chart_tool_template : '<span class="noRegisterTip">未注册</span>'
            })
            template = template.replace(/\${char_template}/g, strChar);


            var equip_template = '\
                <div class="divField pos-${pos}">\
                    <img class="icon" src="${id}" onerror="this.src != \'${partDefaultImg}\' && (this.src=\'${partDefaultImg}\')">\
                    <span class="partName">${partName}</span>\
                    <span class="name">${name}</span>\
                    <span class="color" style="background-color:${extend}"></span>\
                    <span class="c-btn btnMore">更多作品</span>\
                </div>';
            var strEquip = Object.keys(CONSTANT.EQUIP_ITEM.PART).map(function(item) {
                var info = data.equip[item];
                return _this.formatEl(equip_template, {
                    id: `
                        $ { AppConfig.path.image }
                        /plant/single / $ { info.id }.jpg `,
                    partDefaultImg: `
                        $ { AppConfig.path.image }
                        /common/equip / equip_icon_sm_$ { item }.jpg `,
                    name: info.name,
                    partName: CONSTANT.EQUIP_ITEM.PART[item].name,
                    extend: info.color,
                    pos: CONSTANT.EQUIP_ITEM.PART[item].pos
                });
            }).join('');
            template = template.replace(/\${equip_template}/g, strEquip);
            var dom = document.createElement('div');
            dom.innerHTML = template;
            dom.className = 'divModel';
            if (data.id == this.page.store.author.id) {
                dom.classList.add('isSelf')
            }
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
            var template = '<img class="c-slide-img" src="${img}"><span class="c-slide-title">${title}</span>'
            dom.innerHTML = this.formatEl(template, {
                img: `
                        $ { AppConfig.path.image }
                        /plant/transmog / $ { data.id }.jpg `,
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
            if (typeof content != 'string' && typeof content != 'number') {
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