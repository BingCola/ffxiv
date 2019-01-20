import style from './dropdown.scss';

const CLN = style;
const DEFAULT_OPTION = {
    position: 'bottom',
    toggle: 'hover',
    key: {
        parent: 'parent',
        value: 'value',
        content: 'content'
    },
    data: [],
    ele: {}
};
const init = (container, opt) => {
    let option = $.extend({}, true, DEFAULT_OPTION, opt);
    container.classList.add(`${CLN.ctn}`);
    !container.dataset.toggle && (container.dataset.toggle = option.toggle);
    !option.position && (cotnainer.dataset.position = option.position);
    initElementByClass(container, option);
    initElementByData(container, option);
    attachEvent(container, option);
};
const initElementByData = (container, option) => {
    container.dataset.position == 'left';
    if (!(option.data instanceof Array && option.data.length > 0)) return;
    let wrap = container.querySelector(`.${CLN.menu}`);
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.classList.add(`${CLN.menu}`);
        container.appendChild(wrap);
    }
    opiton.data.forEach(item => {
        if (container.querySelector(`.${CLN.item}[data-value="${option.key.value}"]`)) return;
        let parentDom;
        if (item[option.key.parent]) {
            parentDom = container.querySelector(`.${CLN.item}[data-value="${option.key.value}"]>.${CLN.menu}`);
            if (!parentDom) {
                parentDom;
            }
        } else {
            parentDom = wrap;
        }
        parentDom.appendChild(createItemDom(item, option));
    });
};
const createItemDom = (item, option) => {
    let dom = document.createElement('div');
    dom.className = `${CLN.item}`;
    dom.dataset.value = item[option.key.value];
    dom.innerHTML = `
    <div class="${CLN.content}">${item[option.key.content]}</div>
    <div class="${CLN.menu}"></div>
    `;
    return dom;
};
const initElementByClass = (container, option) => {
    if (!option.ele.item) return;
    $(container)
        .find(option.ele.item)
        .addClass(CLN.item);
};
const expand = container => {
    container.classList.add(`.focus`);
    $(document.body).on('click.dropdown', e => {
        if ($(e.target).parentsUtil('body', `.${CLN.content}`).length == 0) {
            container.classList.remove(`.focus`);
            $(document.body).off('click.dropdown');
        }
    });
};
const attachEvent = (container, option) => {
    let $container = $(container);
    $container.find(`.${CLN.list} .${CLN.item}`).on('click', e => {
        let content;
        if (option.event.onItemClick) {
            content = option.event.onItemClick(e.currentTarget);
        }
        if (typeof content == typeof void 0) {
            content = e.currentTarget.innerHTML;
        }
        $container.find(`.${CLN.body}`).innerHTML = content;
    });
    if (option.toggle == 'click') {
        $(container)
            .find(`.${CLN.body}`)
            .click(() => {
                expand(container);
            });
    }
};
export default { init, expand, CLN };
