(exports => {
    class Cmpt {
        constructor(page, container, option) {
            this.page = page;
            this.container = container;
            this.option = option;
            this.init();
        }
        init() {
            this.initOption();
            this.fillContent();
            this.attachEvent();
        }
        initOption() {
            this.option = [
                {
                    field: "job",
                    title: "职业",
                    list: Object.keys(CONSTANT.CHARACTER.JOB).map(key => {
                        return {
                            val: key,
                            text: CONSTANT.CHARACTER.JOB[key].text
                        };
                    })
                },
                {
                    field: "gender",
                    title: "性别",
                    list: Object.keys(CONSTANT.CHARACTER.GENDER).map(key => {
                        return {
                            val: key,
                            text: CONSTANT.CHARACTER.GENDER[key].text
                        };
                    })
                },
                {
                    field: "race",
                    title: "种族",
                    list: Object.keys(CONSTANT.CHARACTER.RACE).map(key => {
                        return {
                            val: key,
                            text: CONSTANT.CHARACTER.RACE[key].text
                        };
                    })
                },
                {
                    field: "tag",
                    title: "标签",
                    list: [{ text: "清新", val: 1 }, { text: "多人", val: 2 }, { text: "搞笑", val: 3 }, { text: "稀有", val: 4 }, { text: "非洲人", val: 5 }]
                },
                {
                    field: "color",
                    title: "色系",
                    list: [
                        { content: "不限", color: "transparent", val: 0 },
                        { content: "红", color: "red", val: 1 },
                        { content: "蓝", color: "blue", val: 2 },
                        { content: "黄", color: "yellow", val: 3 },
                        { content: "绿", color: "green", val: 4 },
                        { content: "紫", color: "pueple", val: 5 },
                        { content: "粉", color: "pink", val: 6 },
                        { content: "灰", color: "grey", val: 7 },
                        { content: "白", color: "white", val: 8 },
                        { content: "黑", color: "black", val: 9 }
                    ],
                    onItemDomCreate(dom, item) {
                        dom.style.color = item.color;
                    }
                }
            ];

            this.query = {};
        }
        fillContent() {
            let container = this.container.querySelector(".workspace");
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].custom) continue;
                container.appendChild(this.createFieldCtn(fields));
            }
        }
        createFieldCtn(field) {
            let container = document.createElement("div");
            container.className = "wrapQueryField";
            container.dataset.field = field.field;
            container.dataset.mode = field.mode;
            container.innerHTML = `
            <span class="title">${field.title}</span>
            <div class="divQueryItemList"></div>
            `;
            let listCtn = container.querySelector(".divQueryItemList");
            field.list.forEach(item => {
                dom = document.createElement("span");
                dom.classList = "item";
                dom.dataset.field = field.field;
                dom.dataset.mode = field.mode;
                item.text && (dom.innerHTML = data[i].text);
                field.onItemDomCreate && field.onItemDomCreate(dom);
                listCtn.appendChild(dom);
            });
            return container;
        }
        attachEvent() {
            $(this.container)
                .find(".workspace")
                .on("click", ".item", e => {
                    let $target = $(e.currentTarget);
                    let $parent = $target.parentsUntil(".workspace", ".wrapQueryField");
                    $target.toggleClass("selected");
                    this.setQuery($parent);
                });
        }
        setQuery($dom) {
            let field = $dom.data().field;
            this.query[field] = [];
            $dom.find(".item.selected").each(index, dom => {
                this.query[field].push(parseInt(dom.dataset.value));
            });
        }
        getQuery() {
            return this.query;
        }
    }
    exports.sideToolbar = Cmpt;
})(namespace(""));
