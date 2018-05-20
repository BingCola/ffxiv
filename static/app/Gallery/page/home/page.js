(function(exports) {
    class Page extends namespace('cmpt.page') {
        constructor() {
            super(...arguments)
            this.controller = undefined;
            this.viewer = undefined;
        }
        get LAYOUT() {
            return {
                view: '/app/Gallery/page/home/page.html',
                header: true,
                footer: true
            }
        }
        get CONFIG() {
            return {
                top: 5
            }
        }
        init() {
            this.initController();
            this.initViewer();
            this.initTopRecommend()
            this.initTransmogSection();
            this.initDecorateSection();
            this.initPictureSection();
            this.initGuideLine();
            this.initQuikEntrance();
            this.attachEvent();
        }
        initController() {
            this.controller = new(namespace('gallery.home.controller'))(this)
        }
        initViewer() {
            this.viewer = new(namespace('gallery.home.viewer'))(this)
        }
        initTopRecommend() {
            var container = document.getElementById('panelRecommend');
            this.controller.getTopItem(this.CONFIG.top).done(data => {
                this.viewer.setTopRecommend(container, data);
            })
        }
        initTransmogSection() {
            var container = document.getElementById('panelTransmog')
            this.controller.getPrimeItem({ limit: 5 }).done((data) => {
                this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), data, { imgPath: Setting.path.image + '/plant/transmog/', name: '幻化' })
            })
            this.controller.getLatestItem({ limit: 8 }).done((data) => {
                this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/transmog/' })
            })
        }
        initDecorateSection() {
            var container = document.getElementById('panelDecoration')
            this.controller.getPrimeItem({ limit: 5 }).done((data) => {
                this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), data, { imgPath: Setting.path.image + '/plant/decoration/', name: '装潢' })
            })
            this.controller.getLatestItem({ limit: 8 }).done((data) => {
                this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/decoration/' })
            })
        }
        initPictureSection() {
            var container = document.getElementById('panelPicture')
            this.controller.getPrimeItem({ limit: 5 }).done((data) => {
                this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), data, { imgPath: Setting.path.image + '/plant/picture/', name: '画册' })
            })
            this.controller.getLatestItem({ limit: 8 }).done((data) => {
                this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/picture/' })
            })
        }
        initQuikEntrance() {
            var container = document.getElementById('panelQuickEntrance');
            var store = [
                { entrance: 'illustration', title: '幻化图鉴', img: Setting.path.image + '/gallery/home/quickEntrance/1.jpg' },
                { entrance: 'post', title: '投稿', img: Setting.path.image + '/gallery/home/quickEntrance/2.jpg' },
                { entrance: 'wardrobe', title: '衣柜', img: Setting.path.image + '/gallery/home/quickEntrance/3.jpg' },
                { entrance: 'personal', title: '个人中心', img: Setting.path.image + '/gallery/home/quickEntrance/4.jpg' }
            ]
            this.viewer.setQuickEntrance(container, store)
        }
        initGuideLine() {

        }
        attachEvent() {

        }
        close() {

        }
    }
    exports.home = Page
})(namespace('gallery'))