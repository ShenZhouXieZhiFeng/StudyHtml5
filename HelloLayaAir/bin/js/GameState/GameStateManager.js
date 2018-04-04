/*
* name;
*/
var GameStateManager = /** @class */ (function () {
    function GameStateManager() {
        this._preState = null;
        this._curState = null;
        this._states = {};
        GameStateManager._instance = this;
    }
    Object.defineProperty(GameStateManager.prototype, "PreState", {
        /**
         * 上一个状态
         */
        get: function () {
            return this._preState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameStateManager.prototype, "CurState", {
        /**
         * 当前状态
         */
        get: function () {
            return this._curState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameStateManager, "Instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new GameStateManager();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameStateManager.prototype.PushState = function (newState) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._states[newState.name]) {
            this._states[newState.name] = new newState();
        }
        if (this._curState) {
            //当前状态如果是newState,不会继续执行
            if (this._curState == newState)
                return;
            if (!this._states[this._curState.name]) {
                this._states[this._curState.name] = new this._curState();
            }
            this._states[this._curState.name].OnExit();
            this._preState = this._curState;
        }
        this._curState = newState;
        (_a = this._states[newState.name]).OnEnter.apply(_a, args);
        var _a;
    };
    GameStateManager.prototype.PushCurStateAgain = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._curState) {
            this._states[this._curState.name].OnExit();
            (_a = this._states[this._curState.name]).OnEnter.apply(_a, args);
        }
        var _a;
    };
    GameStateManager._instance = null;
    return GameStateManager;
}());
//# sourceMappingURL=GameStateManager.js.map