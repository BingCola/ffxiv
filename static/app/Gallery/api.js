(function(exports) {
    class Cmpt extends namespace('cmpt.api') {
        constructor() {
            super(...arguments)
        }

        login(data) {
            return this.post('/user/login', data)
        }
        loginInVisitor(data) {
            return this.post('/user/login/visitor', data)
        }
        getUserMessageNumber(id) {
            return this.get('/user/getMessageNum/' + id)
        }
        getUserDetail(id) {
            return this.get('/user/info/' + id)
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
        getGalleryItemList(data) {
            return this.post('/gallery/getItem/list', data)
        }
    }
    exports.api = Cmpt;
}(namespace('gallery')))