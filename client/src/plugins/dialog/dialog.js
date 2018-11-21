import style from './dialog.js';
const CLN = style;
const TEMPLATE = {
    CTN: `
    <div class="c-overlay"></div>
    <div class="${CLN.panel}"></div>
    `,
    INFO: `
    <div class="${CLN.body}">
        <div class="${CLN.icon} iconfont icon-alert"></div>
        <div class="${CLN.content}">{content}</div>
    </div>
    <div class="${CLN.footer}">
        <div class="${CLN.btnTool}" data-action="confirm">确认</div>
    </div>
    `,
    CONFIRM: `
    <div class="${CLN.body}">
        <div class="${CLN.icon} iconfont icon-alert"></div>
        <div class="${CLN.content}">{content}</div>
    </div>
    <div class="${CLN.footer}">
        <div class="${CLN.btnTool}" data-action="cancel">取消</div>
        <div class="${CLN.btnTool}" data-action="confirm">确认</div>
    </div>`,
    PROMPT: `
    <div class="${CLN.body}">
        <div class="${CLN.content}">
            <div class="${CLN.ttl}">{title}</div>
            <input type="text" value="{value}" class="${CLN.input}">
        </div>
    </div>
    <div class="${CLN.footer}">
        <div class="${CLN.btnTool}" data-action="cancel">取消</div>
        <div class="${CLN.btnTool}" data-action="confirm">确认</div>
    </div>`
};

const info = (option, container) => {
    let $promise = $.Deferred();
    let content = '';
    let theme = 'info';
    if (typeof option == 'string') {
        content = option;
    } else if (option.content) {
        content = option.content;
        if (option.theme) theme = option.theme;
    }
    show(TEMPLATE.INFO.fill({ content }), container);
    dom.dataset.model = 'info';
    dom.dataset.theme = theme;
    return $promise.promise();
};
const success = (option, container) => {
    if (typeof option == 'string') {
        option = {
            content: option
        };
    }
    option.theme = 'success';
    info(option, container);
};
const warning = (option, container) => {
    if (typeof option == 'string') {
        option = {
            content: option
        };
    }
    option.theme = 'warning';
    info(option, container);
};
const danger = (option, container) => {
    if (typeof option == 'string') {
        option = {
            content: option
        };
    }
    option.theme = 'warning';
    info(option, container);
};
const confirm = (option, container) => {
    let $promise = $.Deferred();
    let content = '';
    if (typeof option == 'string') {
        content = option;
    } else if (option.content) {
        content = option.content;
    }
    let dom = show(TEMPLATE.ALERT.fill({ content }), container);
    dom.dataset.model = 'confirm';
    $(dom)
        .find('[data-action="confirm"]')
        .on('click', () => {
            $promise.resolve();
        });
    $(dom)
        .find('[data-action="cancel"]')
        .on('click', () => {
            $promise.reject();
        });
    return $promise.promise();
};
const prompt = (option, container) => {
    let $promise = $.Deferred();
    let title = '';
    let content = '';
    let value = '';
    if (typeof option == 'string') {
        title = option;
    } else if (!option.content) {
        option.title && (title = option.title);
        option.value && (value = option.value);
    } else {
        content = option.content;
    }
    let dom;
    if (content) {
        dom = show(TEMPLATE.ALERT.fill({ title, value }), container);
        dom.innerHTML = content;
    } else {
        dom = show(TEMPLATE.ALERT.fill({ title, value }), container);
    }
    dom.dataset.model = 'prompt';
    $(dom)
        .find('[data-action="confirm"]')
        .on('click', () => {
            $promise.resolveWith(null, []);
        });
    $(dom)
        .find('[data-action="cancel"]')
        .on('click', () => {
            $promise.reject();
        });
    return $promise.promise();
};

const show = (template, container) => {
    let dom = document.createElement('div');
    dom.innerHTML = CKN.ctn;
    dom.querySelector(`.${CLN.panel}`).innerHTML = template;
    $(dom)
        .find('[data-action="cancel"]')
        .on('click', () => {
            $(dom).remove();
        });
    $(dom)
        .find('.c-overlay')
        .on('click', () => {
            $(dom).remove();
        });
    if (!container) container = document.body;
    container.appendChild(dom);
    return dom;
};
export default { info, success, warning, danger, confirm, prompt };
