import Fetch from './fetch';

export default class Api extends Fetch {
    login(data) {
        return this.post('/user/login', data);
    }
    loginInVisitor(data) {
        return this.post('/user/login/visitor', data);
    }
    getUserMessageNumber(id) {
        return this.get('/user/getMessageNum/' + id);
    }
    getUserDetail(id) {
        return this.get('/user/info/' + id);
    }

    getTopGalleryItem(limit) {
        return this.get(`/gallery/getItem/top/${limit}`);
    }
    getPrimeGalleryItem(data) {
        return this.post('/gallery/getItem/prime', data);
    }
    getLatestGalleryItem(data) {
        return this.post('/gallery/getItem/latest', data);
    }
    getGalleryItemList(data) {
        return this.post('/gallery/getItem/list', data);
    }
    getGalleryItemDetail(id) {
        return this.get(`/gallery/getItem/detail/${id}`);
    }
    getRelateGalleryItem(id) {
        return this.get(`/gallery/getItem/relate/${id}`);
    }
}
