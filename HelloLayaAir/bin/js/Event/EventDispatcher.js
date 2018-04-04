/**
* 观察者
*/
var Observer = /** @class */ (function () {
    function Observer(callback, context) {
        /** 回调函数 */
        this.callback = null;
        /** 上下文 */
        this.context = null;
        var self = this;
        self.callback = callback;
        self.context = context;
    }
    /**
     * 发送通知
     * @param args 不定参数
     */
    Observer.prototype.notify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        (_a = self.callback).call.apply(_a, [self.context].concat(args));
        var _a;
    };
    /**
     * 上下文比较
     * @param context 上下文
     */
    Observer.prototype.compar = function (context) {
        return context == this.context;
    };
    return Observer;
}());
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
    }
    /**
     * 注册事件
     * @param nameKey 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    EventDispatcher.Register = function (nameKey, callback, context) {
        var observers = EventDispatcher.listeners[nameKey];
        if (!observers) {
            EventDispatcher.listeners[nameKey] = [];
        }
        EventDispatcher.listeners[nameKey].push(new Observer(callback, context));
    };
    /**
     * 移除事件
     * @param nameKey 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    EventDispatcher.UnRegister = function (nameKey, callback, context) {
        var observers = EventDispatcher.listeners[nameKey];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete EventDispatcher.listeners[nameKey];
        }
    };
    /**
     * 发送事件
     * @param nameKey 事件名称
     */
    EventDispatcher.Fire = function (nameKey) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var observers = EventDispatcher.listeners[nameKey];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer = observers[i];
            observer.notify.apply(observer, args);
        }
    };
    /** 监听数组 */
    EventDispatcher.listeners = {};
    return EventDispatcher;
}());
//# sourceMappingURL=EventDispatcher.js.map