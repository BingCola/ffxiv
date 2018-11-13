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
            this.option = [{
                    field: "job",
                    title: "职业",
                    mode: "single",
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
                    mode: "single",
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
                    mode: "single",
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
                    mode: "multi",
                    list: [{ text: "清新", val: 1 }, { text: "多人", val: 2 }, { text: "搞笑", val: 3 }, { text: "稀有", val: 4 }, { text: "非洲人", val: 5 }]
                },
                {
                    field: "color",
                    title: "色系",
                    mode: "multi",
                    hover: false,
                    list: [
                        { content: "红", color: "red", val: 1 },
                        { content: "蓝", color: "blue", val: 2 },
                        { content: "黄", color: "yellow", val: 3 },
                        { content: "绿", color: "green", val: 4 },
                        { content: "紫", color: "purple", val: 5 },
                        { content: "粉", color: "pink", val: 6 },
                        { content: "灰", color: "grey", val: 7 },
                        { content: "白", color: "white", val: 8 },
                        { content: "黑", color: "black", val: 9 }
                    ],
                    onItemDomCreate(dom, item) {
                        dom.style.background = item.color;
                        dom.setAttribute("title", item.content);
                    }
                }
            ];

            this.query = {};
        }
        fillContent() {
            let container = this.container.querySelector(".workspace");
            for (var i = 0; i < this.option.length; i++) {
                if (this.option[i].custom) continue;
                container.appendChild(this.createFieldCtn(this.option[i]));
            }
        }
        createFieldCtn(field) {
            let container = document.createElement("div");
            container.className = "wrapQueryField";
            container.dataset.field = field.field;
            container.dataset.mode = field.mode;
            container.innerHTML = `
            <span class="title">${field.title}</span>
            <div class="divQueryItemList c-clear-fix"></div>
            `;
            let listCtn = container.querySelector(".divQueryItemList");
            if (field.hover !== false) listCtn.classList.add("hover");
            field.list.forEach(item => {
                let dom = document.createElement("span");
                dom.className = "item";
                dom.dataset.field = field.field;
                dom.dataset.mode = field.mode;
                // item.text && (dom.innerHTML = `<span class="text" data-text="${item.text}">${item.text}</span>`);
                item.text && (dom.innerHTML = `${item.text}`);
                field.onItemDomCreate && field.onItemDomCreate(dom, item);
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
            $dom.find(".item.selected").each((index, dom) => {
                this.query[field].push(parseInt(dom.dataset.value));
            });
        }
        getQuery() {
            return this.query;
        }
    }
    exports.sideToolbar = Cmpt;
})(namespace("gallery.gallery"));