import button from './model/button';
import border from './model/border.js';
import CLN from './theme.scss';

const THEME = {
    border,
    button
};
const set = (theme, ...args) => {
    theme = getTheme(theme);
    if (!theme) return;
    theme.set(...args);
    return CMPT;
};

const destory = (param, ...args) => {
    theme = getTheme(param);
    if (!theme) return;
    theme.destory(...args);
    return CMPT;
};
const getTheme = query => {
    let theme = THEME;
    let arr = query.split('.');
    for (let i = 0; i < arr.length; i++) {
        if (theme[arr[i]]) {
            theme = theme[arr[i]];
        } else {
            return;
        }
    }
    return theme;
};
let CMPT = {
    CLN,
    set,
    destory
};
export default CMPT;
