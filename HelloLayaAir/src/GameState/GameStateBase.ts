/*
* name;
*/
abstract class GameStateBase
{
    // 进入状态，一般用作打开界面，成功返回true
    public abstract OnEnter(...args:any[]):boolean;

    // 离开状态，一般用作关闭界面
    public abstract OnExit():void;
}