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
var GameStateBattle = /** @class */ (function (_super) {
    __extends(GameStateBattle, _super);
    function GameStateBattle() {
        return _super.call(this) || this;
    }
    GameStateBattle.prototype.OnEnter = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Debug.Log("Enter State Battle");
        ResMgr.LoadRes("res/ResConfig/BattleRes.json", Laya.Handler.create(this, this.OnBattleResLoaded));
        return true;
    };
    GameStateBattle.prototype.OnBattleResLoaded = function () {
        UIManager.Instance.Show(eUIEnum.Game_BattleUI);
    };
    GameStateBattle.prototype.OnExit = function () {
        UIManager.Instance.Hide(eUIEnum.Game_BattleUI);
    };
    return GameStateBattle;
}(GameStateBase));
//# sourceMappingURL=GameStateBattle.js.map