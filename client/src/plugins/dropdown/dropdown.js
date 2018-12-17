import style from './dropdown.scss';

const CLN = style;

const init = (container, option) => {
    container.classList.add(`${CLN.ctn}`);
    setElement(container, option);
    if (option.toggle == 'click') {
        $(container)
            .find(`.${CLN.content}`)
            .click(() => {
                expand(container);
            });
        container.dataset.toggle = 'click';
    } else {
        container.dataset.toggle = 'hover';
    }
    attachEvent(container, option);
};

const setElement = (container, option) => {
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
        $container.find(`.${CLN.content}`).innerHTML = e.currentTarget.innerHTML;
        option.event.onItemClick && option.event.onItemClick(e.currentTarget);
    });
};
export default { init, expand, CLN };
