(function(exports) {
    class Page extends namespace("cmpt.page") {
        constructor() {
            super(...arguments);
            this.controller = undefined;
            this.viewer = undefined;
        }
        get LAYOUT() {
            return {
                view: "/app/Gallery/page/home/page.html",
                header: true,
                footer: true
            };
        }
        get CONFIG() {
            return {
                top: 5
            };
        }
        init() {
            this.initController();
            this.initViewer();
            this.initTopRecommend();
            this.initTransmogSection();
            this.initDecorateSection();
            this.initPictureSection();
            this.initGuideLine();
            this.initRoutes();
            this.attachEvent();
        }
        initController() {
            this.controller = new (namespace("gallery.home.controller"))(this);
        }
        initViewer() {
            this.viewer = new (namespace("gallery.home.viewer"))(this);
        }
        initTopRecommend() {
            var container = document.getElementById("panelRecommend");
            this.controller.getTopItem(this.CONFIG.top).done(data => {
                this.viewer.setTopRecommend(container, data);
            });
        }
        initTransmogSection() {
            var container = document.getElementById("panelTransmog");
            this.controller.getPrimeItem({ limit: 5 }).done(data => {
                this.viewer.setGalleryModulePrime(container.querySelector(".panelModulePrime"), data, {
                    imgPath: AppConfig.path.image + "/plant/transmog/",
                    name: "幻化"
                });
            });
            this.controller.getLatestItem({ limit: 8 }).done(data => {
                this.viewer.setGalleryModuleLatest(container.querySelector(".panelModuleLatest"), data, {
                    setBigMode: 3,
                    imgPath: AppConfig.path.image + "/plant/transmog/"
                });
            });
        }
        initDecorateSection() {
            var container = document.getElementById("panelDecoration");
            this.controller.getPrimeItem({ limit: 5 }).done(data => {
                this.viewer.setGalleryModulePrime(container.querySelector(".panelModulePrime"), data, {
                    imgPath: AppConfig.path.image + "/plant/decoration/",
                    name: "装潢"
                });
            });
            this.controller.getLatestItem({ limit: 8 }).done(data => {
                this.viewer.setGalleryModuleLatest(container.querySelector(".panelModuleLatest"), data, {
                    setBigMode: 3,
                    imgPath: AppConfig.path.image + "/plant/decoration/"
                });
            });
        }
        initPictureSection() {
            var container = document.getElementById("panelPicture");
            this.controller.getPrimeItem({ limit: 5 }).done(data => {
                this.viewer.setGalleryModulePrime(container.querySelector(".panelModulePrime"), data, {
                    imgPath: AppConfig.path.image + "/plant/picture/",
                    name: "画册"
                });
            });
            this.controller.getLatestItem({ limit: 8 }).done(data => {
                this.viewer.setGalleryModuleLatest(container.querySelector(".panelModuleLatest"), data, {
                    setBigMode: 3,
                    imgPath: AppConfig.path.image + "/plant/picture/"
                });
            });
        }
        initRoutes() {
            var container = document.getElementById("panelRoutes");
            var store = [
                { entrance: "illustration", title: "幻化图鉴", img: AppConfig.path.image + "/gallery/home/routes/1.jpg" },
                { entrance: "post", title: "投稿", img: AppConfig.path.image + "/gallery/home/routes/2.jpg" },
                { entrance: "wardrobe", title: "衣柜", img: AppConfig.path.image + "/gallery/home/routes/3.jpg" },
                { entrance: "personal", title: "个人中心", img: AppConfig.path.image + "/gallery/home/routes/4.jpg" }
            ];
            this.viewer.setRoutes(container, store);
        }
        initGuideLine() {}
        attachEvent() {}
        close() {}
    }
    exports.home = Page;
})(namespace("gallery"));
