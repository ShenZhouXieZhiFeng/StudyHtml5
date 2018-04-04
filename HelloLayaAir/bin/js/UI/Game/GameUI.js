var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.GameBattleView = new ui.GameBattleViewUI();
        Laya.stage.addChild(_this.GameBattleView);
        return _this;
    }
    GameUI.prototype.OnShow = function () {
        // this.GameBattleView.visible = true;
    };
    GameUI.prototype.OnHide = function () {
        // this.GameBattleView.visible = false;
    };
    return GameUI;
}(UIBase));
//# sourceMappingURL=GameUI.js.map