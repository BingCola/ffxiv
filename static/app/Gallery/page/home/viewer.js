(function(exports) {
    function Viewer(page, option) {
        this.page = page;
        this.option = option;
    }
    Viewer.prototype = {
        template: {
            'latestBody': `
            <div class="header"><span class="text">最近投稿</span><span class="c-btn btnRefresh iconfont icon-refresh"></span></div>
            <div class="body"><%body%></div>`,
            'latestItem': `
            <div class="item <%bigMode%>" data-id="<%id%>">
                <img class="img" src="<%img%>">
                <span class="text"><%text%></span>
                <span class="author"><%author%></span>
                <span class="date"><%date%></span>
            </div>`,

            'primeBody': `
            <div class="header">
                <span class="c-label"><%moduleName%></span>
                <div class="wrapItemIndex"><%index%></div>
            </div>
            <div class="body"><%body%></div>`,
            'primeItem': '<div class="item" data-id=“<%id%>”><span class="text"><%text%></span><img class="img" src="<%img%>"></div>',

            'topRecommendItem': '<div class="item" data-id="<%id%>"><div class="wrapImg"><%img%></div><div style="<%textStyle%>" class="text"><%text%></div></div>',

            'quickEntrance': `    
            <div data-entrance="<%entrance%>" class="ctnEntrance">
                <img class="entranceBg" src="<%img%>">
                <span class="title"><%title%></span>
            </div>`
        },
        init: function() {},
        setTopRecommend: function(container, store) {
            var ctn = container.querySelector('.ctnItemPic')
            store.forEach((item, i) => {
                let imgHTML = ''
                if (item.custom) {
                    imgHTML = item.custom;
                } else {
                    item.img.forEach(img => {
                        imgHTML += `<img style="${img.style?img.style:''}" class="img" src='${Setting.path.image}/gallery/home/topRecommend/${img.src}'>`
                    })
                }
                let formatEl = {
                    id: item.id,
                    img: imgHTML,
                    text: (item.text && item.text.content) ? item.text.content : '',
                    text_style: (item.text && item.text.style) ? item.text.style : ''
                }
                ctn.innerHTML += this.template.topRecommendItem.format(formatEl);
            })
            ctn.children[0].classList.add('focus');
            this.setTopRecommendIndex(container, store)
        },
        setTopRecommendIndex: function(container, store) {
            var ctn = container.querySelector('.ctnItemIndex')
            store.forEach((item, i) => {
                ctn.innerHTML += `<span class="item" data-id="${item.id}"></span>`;
            })
            ctn.children[0].classList.add('focus')
        },

        setGalleryModulePrime: function(container, store, option) {
            var bodyHTML = '';
            var indexHTML = '';
            store.forEach(item => {
                let formatEl = {
                    img: option.imgPath + item.id + '.jpg',
                    text: item.name,
                    id: item.id
                }
                bodyHTML += this.template.primeItem.format(formatEl);
                indexHTML += `<span data-id="${item.id}" class="item"></span>`
            })
            container.innerHTML = this.template.primeBody.format({
                moduleName: option.name,
                index: indexHTML,
                body: bodyHTML
            })
            container.querySelector('.wrapItemIndex').children[0].classList.add('focus')
            container.querySelector('.body').children[0].classList.add('focus')
        },
        setGalleryModuleLatest: function(container, store, option) {
            var bodyHTML = '';
            store.forEach((item, index) => {
                let formatEl = {
                    date: DateUtil.getRelativeDateInfo(item.time),
                    img: option.imgPath + item.id + '.jpg',
                    text: item.name,
                    id: item.id,
                    author: item.author.name
                }
                if (index < option.setBigMode) {
                    formatEl.bigMode = 'bigMode';
                }
                bodyHTML += this.template.latestItem.format(formatEl);
            })
            container.innerHTML = this.template.latestBody.format({
                body: bodyHTML
            })
        },
        setQuickEntrance: function(container, store, option) {
            store.forEach((item, index) => {
                let formatEl = {
                    entrance: item.entrance,
                    title: item.title,
                    img: item.img,
                }
                container.innerHTML += this.template.quickEntrance.format(formatEl)
            })
        },
        setGalleryLatest: function(option) {},
        setScroLLGuide: function() {

        },
    }
    exports.viewer = Viewer;
})(namespace('gallery.home'))