(function(exports) {
    class Cmpt extends namespace('cmpt.api') {
        constructor() {
            super(...arguments)
        }

        login(data) {
            return this.post('/user/login', data)
        }


        getTopGalleryItem(limit) {
            return this.get(`/gallery/getItem/top/${limit}`)
        }
        getPrimeGalleryItem(data) {
            return this.post('/gallery/getItem/prime', data)
        }
        getLatestGalleryItem(data) {
            return this.post('/gallery/getItem/latest', data)
        }
    }
    exports.api = Cmpt;
}(namespace('gallery')))