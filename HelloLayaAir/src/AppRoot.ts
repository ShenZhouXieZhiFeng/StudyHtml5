// 程序入口
class GameMain
{
    constructor()
    {
        Laya.init(1080,1920);

        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        
        GameStateManager.Instance.PushState(GameStateBattle);
    }
}
new GameMain();