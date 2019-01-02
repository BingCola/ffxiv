import CLN from '../theme.scss';

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
    </svg>`
};

const createDom = (ctn, option = {}, model) => {
    let dom = document.createElement('div');
    dom.className = CLN['ctn'];
    dom.dataset.themeBorder = true;
    dom.dataset.themeModel = model;
    dom.innerHTML = TEMPLATE[model];
    if (option.hover) dom.dataset.hover = 'true';
    ctn.dataset.themed = true;
    return dom;
};

const destroy = ctn => {
    $(ctn)
        .find(`.${CLN.ctn}`)
        .remove();
};
export default {
    1: {
        set: function(ctn, option = {}) {
            let dom = createDom(ctn, option, 1);
            if (option.orientation) {
                dom.dataset.orientation = option.orientation;
            }
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
            let dom = createDom(ctn, option, 2);
            if (option.orientation) {
                dom.dataset.orientation = option.orientation;
            }
            ctn.appendChild(dom);
        },
        destroy
    }
};
