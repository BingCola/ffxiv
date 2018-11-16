export default class Controller {
    constructor(page) {
        this.page = page;
        this.query = undefined;

        this.total = 0;
    }
    use() {
        this.init();
    }
    init() {
        this.initQuery();
    }
    initQuery() {
        this.query = {
            page: 0,
            limit: 20,
            sort: 'id',
            asc: true,
            filter: ''
        };
    }
    setQueryToCommand() {}
    search(page) {
        let deferred = $.Deferred();
        if (page == null) {
            this.query.page++;
        } else {
            this.query.page = page;
        }
        this.page.api.getGalleryItemList(this.query).done(result => {
            if (result.data && result.data.list) {
                this.total = result.data.total;
                deferred.resolveWith(this.screen, [result.data.list]);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise();
    }
    setHistory() {}
}
