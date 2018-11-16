/**
 * Created by BingCola on 2017/2/9.
 */
(function(exports) {
    class Page {
        constructor() {
            this.consistCtn = undefined;
            this.imgGrpCtn = undefined;

            this.store = {};
        }

        get LAYOUT() {
            return {
                view: '/app/Gallery/page/post/page.html',
                header: true,
                footer: true
            };
        }

        init() {
            this.consistCtn = document.getElementById('ctnConsistInfo');
            this.imgGrpCtn = document.getElementById('ctnImgInfo');

            this.attachEvent();
            this.initImgGrp();
            this.initConsistInfo();
        }
        initImgGrp() {
            var _this = this;
            var $wrap = $(this.imgGrpCtn).find('.wrapImgInfo');
            var $btnAdd = $wrap.find('.btnAdd');
            //$btnAdd.before(_this.createImgDom());
        }
        initConsistInfo() {
            var _this = this;
            var $wrap = $(this.consistCtn);
            var $btnAdd = $wrap.find('.btnAdd');
            $btnAdd.off('click').on('click', function(e) {
                $wrap.append(_this.createConsistDom());
            });
            $wrap.on('click', '.btnConsistDel ', function(e) {
                $(e.currentTarget)
                    .parent()
                    .remove();
            });
            $wrap.on('click', '.toolItem ', function(e) {
                $(e.currentTarget)
                    .siblings()
                    .removeClass('selected');
                $(e.currentTarget).addClass('selected');
                var $infoCtn = $(e.currentTarget)
                    .parent()
                    .next();
                switch (e.currentTarget.dataset.user) {
                    case 'author':
                        $infoCtn.find('input').attr('disabled', true);
                        $infoCtn.find('textaera').attr('disabled', true);
                        $infoCtn.find('select').attr('disabled', true);
                        $infoCtn
                            .find('[data-info="name"]')
                            .children('input')
                            .val('上传者名字');
                        $infoCtn
                            .find('[data-info="desc"]')
                            .children('textaera')
                            .html('上传者描述描述');
                        break;
                    case 'select':
                        var init = $(e.currentTarget).find('.iptUserSel')[0].dataset.init;
                        $infoCtn.find('input').attr('disabled', true);
                        $infoCtn.find('textaera').attr('disabled', true);
                        $infoCtn.find('select').attr('disabled', true);
                        $infoCtn
                            .find('[data-info="name"]')
                            .children('input')
                            .val('当前选择用户名字：' + init ? init : '');
                        $infoCtn
                            .find('[data-info="desc"]')
                            .children('textaera')
                            .html('当前选择用户名字描述描述:' + init ? init : '');
                        break;
                    case 'custom':
                        $infoCtn.find('input').attr('disabled', false);
                        $infoCtn.find('textaera').attr('disabled', false);
                        $infoCtn.find('select').attr('disabled', false);
                        break;
                }
            });
            $btnAdd.before(_this.createConsistDom());

            $wrap.off('focus').on('focus', '.iptUserSel', function(e) {
                var $infoCtn = $(e.currentTarget).next();
                _this.setSelectList($infoCtn.find('.selectList'), e.currentTarget.value);
                $infoCtn.addClass('focus');
            });
            $wrap.off('blur').on('blur', '.iptUserSel', function(e) {
                window.setTimeout(function() {
                    if (e.currentTarget.dataset.init) {
                        e.currentTarget.value = e.currentTarget.dataset.init;
                    } else {
                        e.currentTarget.value = '';
                    }
                    var $infoCtn = $(e.currentTarget).next();
                    $infoCtn.removeClass('focus');
                }, 200);
            });
            $wrap.off('input propertychange').on('input propertychange', '.iptUserSel', function(e) {
                var $infoCtn = $(e.currentTarget).next();
                $infoCtn.addClass('focus');
                _this.setSelectList($infoCtn.find('.selectList'), e.currentTarget.value);
            });
            $wrap.on('click', '.wrapUserSelect .divSelectItem', function(e) {
                var target = e.currentTarget;
                var $infoCtn = $(e.currentTarget)
                    .parent()
                    .prev();
                $infoCtn[0].innerHTML =
                    '\
            <img class="portrait" src="' +
                    AppConfig.path.image +
                    '/user/' +
                    target.dataset.id +
                    '.png"/>\
            <span class="name">' +
                    target.dataset.name +
                    '</span>';
                $infoCtn.parent().removeClass('focus');
                $infoCtn.parent().prev()[0].dataset.init = target.dataset.name;
                $infoCtn
                    .parent()
                    .prev()
                    .val(target.dataset.name);
                var $content = $infoCtn
                    .parent()
                    .parent()
                    .next();
                $content
                    .find('[data-info="name"]')
                    .children('input')
                    .val('当前选择用户名字：' + target.dataset.name ? target.dataset.name : '');
                $content
                    .find('[data-info="desc"]')
                    .children('textaera')
                    .html('当前选择用户名字描述描述:' + target.dataset.name ? target.dataset.name : '');
            });

            $wrap.on('focus', '.iptItemSel', function(e) {
                var $infoCtn = $(e.currentTarget).next();
                $infoCtn.addClass('focus');
                _this.setItemSelectList($infoCtn.find('.selectList'), e.currentTarget.value);
            });
            $wrap.on('blur', '.iptItemSel', function(e) {
                window.setTimeout(function() {
                    var $infoCtn = $(e.currentTarget).next();
                    $infoCtn.removeClass('focus');
                    if (e.currentTarget.dataset.init) {
                        e.currentTarget.value = e.currentTarget.dataset.init;
                    } else {
                        e.currentTarget.value = '';
                    }
                }, 200);
            });
            $wrap.on('input propertychange', '.iptItemSel', function(e) {
                var $infoCtn = $(e.currentTarget).next();
                $infoCtn.addClass('focus');
                _this.setItemSelectList($infoCtn.find('.selectList'), e.currentTarget.value);
            });
            $wrap.on('click', '.wrapItemSelect .divSelectItem', function(e) {
                var target = e.currentTarget;
                var $infoCtn = $(e.currentTarget)
                    .parent()
                    .prev();
                $infoCtn[0].innerHTML =
                    '\
            <!--<img class="portrait" src="' +
                    AppConfig.path.image +
                    '/user/' +
                    target.dataset.id +
                    '.png"/>\
            <span class="name">头部</span>\
            <span class="name">' +
                    target.dataset.name +
                    '</span>-->\
            <span class="job itemInfo">职业：白魔法师</span>\
            <span class="level itemInfo">等级：60</span>\
            <span class="iLevel itemInfo">装等：135</span>\
            <span class="src itemInfo">来源：制作</span>\
            <span class="color itemInfo">不可染色</span>';
                $infoCtn.parent().prev()[0].dataset.init = target.dataset.name;
                //$infoCtn.parent().parent().prev().html(target.dataset.name);
                $infoCtn
                    .parent()
                    .parent()
                    .prev()
                    .prev()[0].src = AppConfig.path.image + '/user/' + target.dataset.id + '.png';
            });
            // $wrap.on('mouseover', '.divItem', function(e) {
            //     $(e.currentTarget).find('.wrapItemSelect').addClass('hover')
            // })

            // $wrap.on('mouseleave', '.divItem', function(e) {
            //     $(e.currentTarget).find('.wrapItemSelect').removeClass('hover')
            // })
        }
        setSelectList($ctn, val) {
            var item;
            $ctn.html('');
            for (var i = 0; i < 5; i++) {
                item = document.createElement('div');
                item.className = 'divSelectItem';
                item.innerHTML = `
                <img class="portrait" src="${AppConfig.path.image + '/user/' + (i + 1)}.png"/>
                <span class="name">人物${val + (i + 1)}</span>
                <span class="race">猫魅</span>
                <span class="gender">女</span>
                <span class="server">摩杜纳</span>
                `;
                item.dataset.name = val;
                item.dataset.id = i + 1;
                $ctn.append(item);
            }
        }
        setItemSelectList($ctn, val) {
            var item;
            $ctn.html('');
            for (var i = 0; i < 5; i++) {
                item = document.createElement('div');
                item.className = 'divSelectItem';
                item.innerHTML = `
                <img class="portrait" src="${AppConfig.path.image + '/user/' + (i + 1)}.png"/>\
                <span class="name">装备${val + (i + 1)}</span>\
                <span class="job">白魔法师</span>\
                <span class="iLevel">50/135</span>\
                `;
                item.dataset.name = val;
                item.dataset.id = i + 1;
                $ctn.append(item);
            }
        }
        attachEvent() {
            var _this = this;
            var mainImgCtn = document.getElementById('ctnImgMain');
            var iptImgMain = document.getElementById('iptMainImg');
            mainImgCtn.querySelector('.imgItem').onclick = function(e) {
                $(iptImgMain).trigger('click');
            };
            var fileUrl = '';
            iptImgMain.onchange = function(e) {
                fileUrl = window.URL.createObjectURL(iptImgMain.files[0]);
                mainImgCtn.querySelector('.imgItem').innerHTML = '<img class="img" src="' + fileUrl + '">';
                iptImgMain.val = '';
                mainImgCtn.querySelector('.img').onload = function() {
                    window.URL.revokeObjectURL(fileUrl);
                };
            };
            this.attachImgGrpEvent();
        }
        attachImgGrpEvent() {
            var _this = this;
            var fileUrl = '';
            var imgItemDom;
            var imgGrpCtn = document.getElementById('ctnImgInfo');
            imgGrpCtn.dataset.num = 0;
            var iptImgGrp = document.getElementById('iptImgGrpAdd');
            var btnAdd = imgGrpCtn.querySelector('.btnAdd');
            btnAdd.onclick = function() {
                $(iptImgGrp).trigger('click');
            };
            iptImgGrp.onchange = function(e) {
                imgGrpCtn.dataset.num = parseInt(imgGrpCtn.dataset.num) + 1;
                if (imgGrpCtn.dataset.num == 2) imgGrpCtn.classList.add('disable');
                fileUrl = window.URL.createObjectURL(iptImgGrp.files[0]);
                imgItemDom = _this.createImgDom(fileUrl);
                $(btnAdd).before(imgItemDom);
                iptImgGrp.val = '';
                imgItemDom.querySelector('.img').onload = function() {
                    window.URL.revokeObjectURL(fileUrl);
                };
            };
            $(imgGrpCtn).on('click', '.btnDel', function(e) {
                imgGrpCtn.dataset.num = parseInt(imgGrpCtn.dataset.num) - 1;
                if (imgGrpCtn.dataset.num == 2) imgGrpCtn.classList.remove('disable');
                $(e.currentTarget)
                    .parent()
                    .remove();
            });
        }
        createConsistDom() {
            var dom = document.createElement('div');
            dom.className = 'divConsist c-clear-fix';
            dom.innerHTML = `
        <span class="btnConsistDel iconfont icon-delete-alt"></span>
        <div class="divModelInfo c-clear-fix">
            <div class="toolGrp">
                <span class="toolItem btnIsAuthor selected" data-user="author">
                    模特为上传者
                </span>
                <span class="userSel toolItem" data-user="select">
                    <span class="btnRegisterUser">模特为其他已注册用户</span>
                    <input class="iptUserSel selectIpt" data-type="user" type="text" placeholder="请输入已注册用户id">
                    <div class="wrapUserSelect">
                        <div class="wrapUserInfo selectInfo">
                        </div>
                        <div class="userList selectList"></div>
                    </div>
                </span>
                <span class="toolItem customUser" data-user="custom">
                    <span class="btnCustomModel">自定义模特</span>
                </span>
            </div>
            <div class="content">
                <span class="infoItem" data-info="name">
                    <label>姓名：</label>
                    <input disabled type="text" class="iptModelInfo form-control" value="上传者名字">
                </span>
                <span class="infoItem" data-info="race">
                    <label>职业：</label>
                    <select disabled type="text" class="iptModelInfo form-control">
                        ${Object.keys(CONSTANT.CHARACTER.JOB).map(key => {
                            return `<option value="${key}">${CONSTANT.CHARACTER.JOB[key].text}</option>`;
                        })}
                    </select>
                </span>
                <span class="infoItem" data-info="server">
                    <label>服务器：</label>
                    <select disabled type="text" class="iptModelInfo form-control">
                    ${Object.keys(CONSTANT.SERVER).map(key => {
                        return `<option value="${key}">${CONSTANT.SERVER[key].text}</option>`;
                    })}
                    </select>
                </span>
                <span class="infoItem" data-info="race">
                    <label>种族：</label>
                    <select disabled type="text" class="iptModelInfo form-control">
                        ${Object.keys(CONSTANT.CHARACTER.RACE).map(key => {
                            return `<option value="${key}">${CONSTANT.CHARACTER.RACE[key].text}</option>`;
                        })}
                    </select>
                </span>
                <span class="infoItem" data-info="gender">
                    <label>性别：</label>
                    <select disabled type="text" class="iptModelInfo form-control">
                        ${Object.keys(CONSTANT.CHARACTER.GENDER).map(key => {
                            return `<option value="${key}">${CONSTANT.CHARACTER.GENDER[key].text}</option>`;
                        })}
                    </select>
                </span>
                <span class="infoItem" data-info="desc">
                    <label>简介：</label>
                    <textaera disabled type="text" class="iptModelInfo form-control iptModelDesc" value="上传者描述描述">上传者描述描述</textaera>
                </span>
            </div>
        </div>
        <div class="divItemInfo divItemInfo ">
            <div class="leftItem"></div>
            <div class="rightItem"></div>
        </div>`;

            var dictItem = {
                left: {
                    weapon: { name: '主手', img: AppConfig.path.image + '/common/equip/equip_icon_sm_1.jpg' },
                    hat: { name: '头部', img: AppConfig.path.image + '/common/equip/equip_icon_sm_2.jpg' },
                    top: { name: '上装', img: AppConfig.path.image + '/common/equip/equip_icon_sm_3.jpg' },
                    glove: { name: '手套', img: AppConfig.path.image + '/common/equip/equip_icon_sm_4.jpg' },
                    belt: { name: '腰带', img: AppConfig.path.image + '/common/equip/equip_icon_sm_5.jpg' },
                    under: { name: '下装', img: AppConfig.path.image + '/common/equip/equip_icon_sm_6.jpg' },
                    shoe: { name: '鞋', img: AppConfig.path.image + '/common/equip/equip_icon_sm_7.jpg' }
                },
                right: {
                    sWeapon: { name: '副手', img: AppConfig.path.image + '/common/equip/equip_icon_sm_8.jpg' },
                    necklace: { name: '项链', img: AppConfig.path.image + '/common/equip/equip_icon_sm_9.jpg' },
                    earring: { name: '耳环', img: AppConfig.path.image + '/common/equip/equip_icon_sm_10.jpg' },
                    bracelet: { name: '手镯', img: AppConfig.path.image + '/common/equip/equip_icon_sm_11.jpg' },
                    leftRing: { name: '左戒指', img: AppConfig.path.image + '/common/equip/equip_icon_sm_12.jpg' },
                    rightRing: { name: '右戒指', img: AppConfig.path.image + '/common/equip/equip_icon_sm_13.jpg' }
                }
            };

            var leftItem = dom.querySelector('.leftItem');
            Object.keys(dictItem.left).forEach(function(item) {
                leftItem.innerHTML += `
            <div class="divItem" data-type="${item}">
                <img class="itemPic" src="${dictItem.left[item].img}">
                <span class="itemPart">${dictItem.left[item].name}</span>
                <div class="itemSel">
                    <input type="text" class="iptItemName iptItemSel" placeholder="请选择装备">
                    <div class="wrapItemSelect">
                        <div class="wrapItemInfo selectInfo"></div>
                        <div class="itemList selectList"></div>
                    </div>
                </div>
            </div>`;
            });

            var rightItem = dom.querySelector('.rightItem');
            Object.keys(dictItem.right).forEach(function(item) {
                rightItem.innerHTML += `
            <div class="divItem" data-type="${item}">
                <img class="itemPic" src="${dictItem.right[item].img}">
                <span class="itemPart">${dictItem.right[item].name}</span>
                <div class="itemSel">
                    <input type="text" class="iptItemName iptItemSel" placeholder="请选择装备">
                    <div class="wrapItemSelect">
                        <div class="wrapItemInfo selectInfo"></div>
                        <div class="itemList selectList"></div>
                    </div>
                </div>
            </div>`;
            });
            return dom;
        }
        createImgDom(url) {
            var dom = document.createElement('div');
            dom.className = 'divImgSlide';
            dom.innerHTML = `
        <div class="toolGrp">
            <span class="btnTool iconfont icon-tailor"></span>
            <span class="btnTool iconfont icon-draw-brush"></span>
            <div class="beautyTool">
                <span class="btnTool iconfont icon-pic-alt"></span>
                <div class="subTool beautyItemList">
                    <span class="item">
                        <span class="name">亮度</span><span class="bar"></span>
                    </span>
                    <span class="item">
                        <span class="name">对比度</span><span class="bar"></span>
                    </span>
                    <span class="item">
                        <span class="name">灰度</span><span class="bar"></span>
                    </span>
                </div>
            </div>
        </div>
        <span class="btnDel iconfont icon-delete-alt"></span>
        <span class="imgItem"><img class="img" src="${url}"></span>`;
            return dom;
        }
        close() {}
    }
    exports.post = Page;
})(namespace('gallery'));
