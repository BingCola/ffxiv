(function(exports) {
    function Page() {
        this.controller = undefined;
        this.viewer = undefined;
    }
    Page.prototype = {
        setLayout: function() {
            return this.layout = {
                view: '/app/Gallery/page/home/page.html'
            }
        },
        show: function() {
            var _this = this;
            _this.init();
        },
        init: function() {
            this.initController();
            this.initViewer();
            this.initTopRecommend()
            this.initTransmogSection();
            this.initDecorateSection();
            this.initPictureSection();
            this.initGuideLine();
            this.initQuikEntrance();
            this.attachEvent();
        },
        initController: function() {
            this.controller = new(namespace('gallery.home.controller'))(this)
        },
        initViewer: function() {
            this.viewer = new(namespace('gallery.home.viewer'))(this)
        },
        initTopRecommend: function() {
            var container = document.getElementById('panelRecommend');
            this.controller.getTopRecommend().done(result => {
                if (result && result.data) {
                    this.viewer.setTopRecommend(container, result.data);
                }
            })
        },
        initTransmogSection: function() {
            var container = document.getElementById('panelTransmog')
            this.controller.getModulePrimeItem({ limit: 5 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), result.data, { imgPath: Setting.path.image + '/plant/transmog/', name: '幻化' })
                }
            })
            this.controller.getModuleLatestItem({ limit: 8 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), result.data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/transmog/' })
                }
            })
        },
        initDecorateSection: function() {
            var container = document.getElementById('panelDecoration')
            this.controller.getModulePrimeItem({ limit: 5 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), result.data, { imgPath: Setting.path.image + '/plant/decoration/', name: '装潢' })
                }
            })
            this.controller.getModuleLatestItem({ limit: 8 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), result.data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/decoration/' })
                }
            })
        },
        initPictureSection: function() {
            var container = document.getElementById('panelPicture')
            this.controller.getModulePrimeItem({ limit: 5 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModulePrime(container.querySelector('.panelModulePrime'), result.data, { imgPath: Setting.path.image + '/plant/picture/', name: '画册' })
                }
            })
            this.controller.getModuleLatestItem({ limit: 8 }).done((result) => {
                if (result && result.success) {
                    this.viewer.setGalleryModuleLatest(container.querySelector('.panelModuleLatest'), result.data, { setBigMode: 3, imgPath: Setting.path.image + '/plant/picture/' })
                }
            })
        },
        initQuikEntrance: function() {
            var container = document.getElementById('panelQuickEntrance');
            var store = [
                { entrance: 'illustration', title: '幻化图鉴', img: Setting.path.image + '/gallery/home/quickEntrance/1.jpg' },
                { entrance: 'post', title: '投稿', img: Setting.path.image + '/gallery/home/quickEntrance/2.jpg' },
                { entrance: 'wardrobe', title: '衣柜', img: Setting.path.image + '/gallery/home/quickEntrance/3.jpg' },
                { entrance: 'personal', title: '个人中心', img: Setting.path.image + '/gallery/home/quickEntrance/4.jpg' }
            ]
            this.viewer.setQuickEntrance(container, store)
        },
        initGuideLine: function() {

        },
        attachEvent: function() {

        },
        close: function() {

        },
    }
    exports.home = Page
})(namespace('gallery'))