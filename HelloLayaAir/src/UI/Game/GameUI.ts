/*
* name;
*/
class GameUI extends UIBase
{
    constructor()
    {
        super();

        this.GameBattleView = new ui.GameBattleViewUI()
        Laya.stage.addChild(this.GameBattleView);
    }

    private GameBattleView:ui.GameBattleViewUI;

    public OnShow():void
    {
        this.GameBattleView.visible = true;
    }

    public OnHide():void
    {
        this.GameBattleView.visible = false;
    }

}