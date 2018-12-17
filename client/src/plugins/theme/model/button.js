import CLN from '../theme.scss';

const TEMPLATE = {
    1: ``
};

export default {
    1: {
        set: ctn => {
            ctn.classList.add(CLN['ctn']);
            ctn.dataset.themeButton = true;
            ctn.dataset.themeModel = 1;
            ctn.dataset.themed = true;
        },
        destroy: ctn => {
            $(ctn).removeClass(CLN['ctn']);
            delete ctn.dataset.theme;
            delete ctn.dataset.model;
            delete ctn.dataset.theme;
        }
    }
};
