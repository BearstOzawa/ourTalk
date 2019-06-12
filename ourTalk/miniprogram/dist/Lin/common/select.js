function getCtx(selector) {
    var pages = getCurrentPages();
    var ctx = pages[pages.length - 1];
    var componentCtx = ctx.selectComponent(selector);
    if (!componentCtx) {
        console.error("无法找到对应的组件，请按文档说明使用组件");
        return null;
    }
    return componentCtx;
}

// 调用showToast
function selectToast(options) {
    var _options$selector = options.selector, selector = _options$selector === undefined ? "#toast" : _options$selector;
    var ctx = getCtx(selector);
    ctx.handleShow(options);
}

// 调用showMessage
function selectMessage(options) {
    var _options$selector2 = options.selector, selector = _options$selector2 === undefined ? "#message" : _options$selector2;
    var ctx = getCtx(selector);
    ctx.handleShow(options);
}

module.exports = {
    $Toast: selectToast,
    $Message: selectMessage
};