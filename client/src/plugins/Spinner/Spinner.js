import style from './spinner.scss';

const CLN = style;
const TEMPLATE = {
    model_1: `<div class="${CLN.ctn}"><div class="${CLN.body}"></div><div class="${CLN.overlay}"></div></div>`,
    model_2: `<div class="${CLN.ctn}">               
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                </div> 
                `,
    model_3: `<div class="${CLN.ctn}">               
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                </div>
                `,
    model_4: `<div class="${CLN.ctn}">               
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>
                <div class="${CLN.unit}"></div>'
                </div>
                `
};
const spin = ($ctn, model) => {
    if (!($ctn instanceof jQuery)) $ctn = $($ctn);
    let template = TEMPLATE['model_' + (model ? model : 1)];
    let $dom = $(template);
    $dom[0].dataset.model = model;
    $ctn.append($dom);
};
const stop = $ctn => {
    if (!($ctn instanceof jQuery)) $ctn = $($ctn);
    $ctn.children(`.${CLN.ctn}`).remove();
};

export default { spin, stop };
