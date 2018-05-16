(function(exports) {
    class Page {
        constructor() {
            super(...arguments)
            this.controller = undefined;
            this.viewer = undefined;
        }
        get layout() {
            return {
                view: '/app/Gallery/page/home/page.html',
                header: true,
                footer: true
            }
        }
        show() {
            var _this = this;
            _this.init();
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
            this.controller.getTopRecommend().done(result => {
                if (result && result.data) {
                    this.viewer.setTopRecommend(container, result.data);
                }
            })
        }
        initTransmogSection() {
            var container = document.getElementById('panelTransmog')
            this.controller.getPrimeItem({ limit: 5 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), result.data, { imgPath: Setting.path.image + '/plant/transmog/', name: '幻化' })
                }
            })
            this.controller.getLatestItem({ limit: 8 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), result.data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/transmog/' })
                }
            })
        }
        initDecorateSection() {
            var container = document.getElementById('panelDecoration')
            this.controller.getPrimeItem({ limit: 5 }).done((result) => {
                this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), result.data, { imgPath: Setting.path.image + '/plant/decoration/', name: '装潢' })
            })
            this.controller.getLatestItem({ limit: 8 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), result.data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/decoration/' })
                }
            })
        }
        initPictureSection() {
            var container = document.getElementById('panelPicture')
            this.controller.getPrimeItem({ limit: 5 }).done((result) => {
                this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), result.data, { imgPath: Setting.path.image + '/plant/picture/', name: '画册' })
            })
            this.controller.getLatestItem({ limit: 8 }).done((result) => {
                this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), result.data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/picture/' })
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