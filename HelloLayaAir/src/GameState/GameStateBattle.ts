/*
* name;
*/
class GameStateBattle extends GameStateBase
{
    constructor()
    {
        super();
    }

    public OnEnter(...args:any[]):boolean
    {
        Debug.Log("Enter State Battle");
        
        ResMgr.LoadRes("res/ResConfig/BattleRes.json",Laya.Handler.create(this,this.OnBattleResLoaded));

        return true;
    }

    OnBattleResLoaded()
    {
        UIManager.Instance.Show(eUIEnum.Game_BattleUI);
    }

    public OnExit():void
    {
        UIManager.Instance.Hide(eUIEnum.Game_BattleUI);
    }
}