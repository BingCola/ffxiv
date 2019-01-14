import CLN from '../theme.scss';

const theme = 'border';
const TEMPLATE = {
    1: `
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    `,
    2: `  
    <svg class="${CLN.svg}" xmlns="http://www.w3.org/2000/svg">
        <rect class="${CLN.rect}" />
    </svg>`,
    3: `
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    `
};

const createDom = (ctn, option = {}, model) => {
    let dom = document.createElement('div');
    dom.className = CLN['ctn'];
    dom.setAttribute(`themed-${theme}`, '');
    dom.setAttribute(`themed-${theme}-${model}`, '');
    dom.innerHTML = TEMPLATE[model];
    ctn.setAttribute('themed', '');
    return dom;
};

const clear = ctn => {
    ctn.removeAttribute(`themed-${theme}`);
    ctn.removeAttribute(`themed-${theme}-${model}`);
    ctn.removeAttribute('themed');
};
const destroy = ctn => {
    $(ctn)
        .find(`.${CLN.ctn}:not([themed])`)
        .remove();
    clear();
};
export default {
    1: {
        set: function(ctn, option = {}) {
            let dom = createDom(ctn, option, 1);
            if (option.orientation) dom.dataset.orientation = option.orientation;
            if (option.hover) dom.dataset.hover = 'true';
            ctn.appendChild(dom);
        },
        destroy: destroy
    },
    2: {
        set: function(ctn, option = {}) {
            let dom = createDom(ctn, option, 2);
            if (option.orientation) {
                dom.dataset.orientation = option.orientation;
            }
            ctn.appendChild(dom);
        },
        destroy
    },
    3: {
        set: function(ctn, option = {}) {
            let dom = createDom(ctn, option, 3);
            if (option.orientation) {
                dom.dataset.orientation = option.orientation;
            }
            ctn.appendChild(dom);
        },
        destroy
    }
};
