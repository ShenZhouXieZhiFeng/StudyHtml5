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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameBattleViewUI = /** @class */ (function (_super) {
        __extends(GameBattleViewUI, _super);
        function GameBattleViewUI() {
            return _super.call(this) || this;
        }
        GameBattleViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameBattleViewUI.uiView);
        };
        GameBattleViewUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "skin": "GameBattle/scene01.png", "height": 1920 } }] };
        return GameBattleViewUI;
    }(View));
    ui.GameBattleViewUI = GameBattleViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map