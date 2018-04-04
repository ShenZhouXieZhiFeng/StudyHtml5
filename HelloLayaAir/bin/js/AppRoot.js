// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(1080, 1920);
        GameStateManager.Instance.PushState(GameStateBattle);
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=AppRoot.js.map