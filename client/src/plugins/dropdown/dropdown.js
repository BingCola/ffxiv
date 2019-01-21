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
    let option = $.extend(true, {}, DEFAULT_OPTION, opt);
    container.classList.add(`${CLN.ctn}`);
    !container.dataset.toggle && (container.dataset.toggle = option.toggle);
    !container.dataset.position && (container.dataset.position = option.position);
    initElementByData(container, option);
    initElementByClass(container, option);
    setItemAnimateDelay(container, option);
    attachEvent(container, option);
};
const initElementByData = (container, option) => {
    container.dataset.position == 'left';
    if (!(option.data instanceof Array && option.data.length > 0)) return;
    let wrap = container.querySelector(`.${CLN.menu}`);
    if (!wrap) {
        wrap = document.createElement('div');
        $(wrap).addClass(`${CLN.menu} ${CLN.root}`);
        container.appendChild(wrap);
    }
    option.data.forEach(item => {
        if (container.querySelector(`.${CLN.item}[data-value="${option.key.value}"]`)) return;
        let parentDom;
        if (item[option.key.parent]) {
            parentDom = container.querySelector(`.${CLN.item}[data-value="${item[option.key.parent]}"]>.${CLN.menu}`);
            if (!parentDom) {
                parentDom = createItemDom(
                    (() => {
                        for (let i = 0; i < option.data.length; i++) {
                            if (option.data[i][option.key.value] == item[option.key.parent]) {
                                return option.data[i];
                            }
                        }
                    })(),
                    option
                );
                if (parentDom) parentDom = $(parentDom).find(`>.${CLN.menu}`)[0];
            }
        } else {
            parentDom = wrap;
        }
        parentDom && parentDom.appendChild(createItemDom(item, option));
    });
};
const createItemDom = (item, option) => {
    if (!item) return;
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
const setItemAnimateDelay = (container, option) => {
    if (option.position !== 'right' && option.position !== 'left') return;
    $(container)
        .find(`.${CLN.menu}`)
        .each((i, menu) => {
            $(menu)
                .children(`.${CLN.item}`)
                .each((index, item) => {
                    item.style.animationDelay = index * 0.1 + 's';
                });
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
