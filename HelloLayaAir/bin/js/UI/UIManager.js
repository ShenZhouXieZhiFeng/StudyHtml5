var eUIEnum;
(function (eUIEnum) {
    eUIEnum[eUIEnum["Game_BattleUI"] = 0] = "Game_BattleUI";
})(eUIEnum || (eUIEnum = {}));
// UI管理器
var UIManager = /** @class */ (function () {
    function UIManager() {
        this.canTouchTag = [];
        this._CacheUIs = new laya.utils.Dictionary();
        this._CacheUIs = new laya.utils.Dictionary();
    }
    Object.defineProperty(UIManager, "Instance", {
        get: function () {
            if (UIManager._Instance == null) {
                UIManager._Instance = new UIManager();
            }
            return UIManager._Instance;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.Release = function () {
        this._CacheUIs.clear();
    };
    UIManager.prototype.GetUIByID = function (uiID) {
        if (this._CacheUIs.get(uiID)) {
            return this._CacheUIs.get(uiID);
        }
        else {
            var ui2Get = this.cretateUI(uiID);
            if (ui2Get != null)
                this._CacheUIs.set(uiID, ui2Get);
            return ui2Get;
        }
    };
    // 显示一个UI
    UIManager.prototype.Show = function (uiID) {
        var ui2Show = null;
        if (this._CacheUIs.get(uiID)) {
            ui2Show = this._CacheUIs.get(uiID);
        }
        else {
            ui2Show = this.cretateUI(uiID);
            if (ui2Show != null)
                this._CacheUIs.set(uiID, ui2Show);
        }
        if (ui2Show != null) {
            ui2Show.OnShow();
        }
        return ui2Show;
    };
    // 隐藏一个UI
    UIManager.prototype.Hide = function (uiID, isDestroy) {
        if (this._CacheUIs.get(uiID)) {
            this._CacheUIs.get(uiID).OnHide();
        }
    };
    // 刷新UI
    UIManager.prototype.UpdateUI = function (uiID, args) {
        if (this._CacheUIs.get(uiID)) {
            this._CacheUIs.get(uiID).OnUpdate(args);
        }
    };
    UIManager.prototype.cretateUI = function (uiID) {
        switch (uiID) {
            case eUIEnum.Game_BattleUI:
                return new GameUI();
        }
        return null;
    };
    return UIManager;
}());
//# sourceMappingURL=UIManager.js.map