import style from './search.scss';

const CLN = style;

/**
 *
 * @param {*} container
 * @param {*} option
 * {
 *      aysnc:null,     获取数据方法
 *      handleData:null,    处理数据方法
 *      template:{
 *
 *      }
 *
 * }
 */

const DEFAULT_OPTION = {
    aysnc: null,
    handleDATA: null,
    template: {
        content: ``,
        selectItem: ``
    },
    event: {
        onSelectItemInit: null,
        onSelect: null
    }
};
const init = (container, option = {}) => {
    option = $.extend(true, {}, DEFAULT_OPTION, option);
    let ipt = container.querySelector(`.${CLN.ipt}`);
    if (!ipt) {
        ipt = createInputDom();
        container.appendChild(ipt);
    }
    let contentDom = container.querySelector(`.${CLN.content}`);
    if (!contentDom) {
        contentDom = createContentDom();
        container.appendChild(contentDom);
    }
    let listDom = container.querySelector(`.${CLN.list}`);
    if (!listDom) {
        listDom = createListDom();
        container.appendChild(listDom);
    }

    let aysnc = option.aysnc;
    $(ipt).on('input propertychange', e => {
        listDom.innerHTML = '';
        aysnc(e.currentTarget.value).then(result => {
            let data = result;
            if (option.handleData) {
                data = option.handleData(data);
            }
            data.forEach(item => {
                listDom.appendChild(createItemDom(item.text, item.value, option));
            });
        });
    });
    $(ipt).on('blur', () => {
        $(contentDom).removeClass('c-hide');
    });
    listDom.on('click', `.${CLN.item}`, e => {
        let target = e.currentTarget;
        contentDom.innerHTML = option.template.content ? option.template.content.fill(target.content) : target.innerHTML;
        container.dataset.value = target.dataset.value;
        option.onSelect && option.onSelect(target, target.content, contentDom);
    });
    $(contentDom).on('click', () => {
        $(ipt).trigger('focus');
        $(contentDom).addClass('c-hide');
    });
};

const createInputDom = () => {
    let dom = document.createElement('input');
    dom.className = CLN.ipt;
    dom.dataset.type = 'text';
    return dom;
};

const createContentDom = () => {
    let dom = document.createElement('div');
    dom.className = CLN.content;
    return dom;
};

const createListDom = () => {
    let dom = document.createElement('div');
    dom.className = CLN.list;
    return dom;
};
const createItemDom = (item, option) => {
    let dom = document.createElement('div');
    dom.className = CLN.list;
    dom.innerHTML = option.template.selectItem ? option.template.selectItem.fill(item) : item.text;
    dom.dataset.value = item.value;
    dom.content = item;
    option.event.onSelectItemInit && option.event.onSelectItemInit(dom, item, option);
    return dom;
};

export default { init };
