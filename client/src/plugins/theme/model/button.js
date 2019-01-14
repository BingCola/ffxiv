import CLN from '../theme.scss';
import Theme from '../theme.js';
const TEMPLATE = {
    1: ``,
    2: ``
};
const theme = 'button';
const setDom = (dom, option = {}, model) => {
    dom.classList.add(CLN['ctn']);
    dom.setAttribute(`themed-${theme}`, '');
    dom.setAttribute(`themed-${theme}-${model}`, '');
    dom.setAttribute('themed', '');
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
        set: ctn => {
            setDom(ctn, {}, 1);
        },
        destroy: clear
    },
    2: {
        set: ctn => {
            $(ctn)
                .children()
                .addClass(`${CLN.content}`);
            Theme.set('border.2', ctn, { hover: true }).set('button.1', ctn);
            setDom(ctn, {}, 2);
        },
        destroy: destroy
    }
};
