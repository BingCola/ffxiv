import CLN from '../theme.scss';

const TEMPLATE = {
    1: `
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    <span class="${CLN.part}"></span>
    `
};
export default {
    1: {
        set: (ctn, option = {}) => {
            let dom = document.createElement('div');
            dom.className = CLN['ctn'];
            dom.dataset.themeBorder = true;
            dom.dataset.themeModel = 1;
            dom.innerHTML = TEMPLATE['1'];
            if (option.orientation) {
                dom.dataset.orientation = option.orientation;
            }
            ctn.dataset.themed = true;
            ctn.appendChild(dom);
        },
        destroy: ctn => {
            $(ctn)
                .find(`.${CLN.ctn}`)
                .remove();
        }
    }
};
