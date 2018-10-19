import Fetch from './fetch';

export default {
    login(data) {
        return Fetch.post('/user/login', data);
    },
    loginInVisitor(data) {
        return Fetch.post('/user/login/visitor', data);
    },
    getUserMessageNumber(id) {
        return Fetch.get('/user/getMessageNum/' + id);
    },
    getUserDetail(id) {
        return Fetch.get('/user/info/' + id);
    },

    getTopGalleryItem(limit) {
        return Fetch.get(`/gallery/getItem/top/${limit}`);
    },
    getPrimeGalleryItem(data) {
        return Fetch.post('/gallery/getItem/prime', data);
    },
    getLatestGalleryItem(data) {
        return Fetch.post('/gallery/getItem/latest', data);
    },
    getGalleryItemList(data) {
        return Fetch.post('/gallery/getItem/list', data);
    },
    getGalleryItemDetail(id) {
        return Fetch.get(`/gallery/getItem/detail/${id}`);
    },
    getRelateGalleryItem(id) {
        return Fetch.get(`/gallery/getItem/relate/${id}`);
    }
};
