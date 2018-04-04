/*
* name;
*/
class GameStateManager
{
    private constructor()
    {
        GameStateManager._instance = this;
    }

    private _preState:any = null;
    /**  
     * 上一个状态 
     */
    public get PreState():any
    {
        return this._preState;
    }

    private _curState:any = null;
    /**  
     * 当前状态 
     */
    public get CurState():any
    {
        return this._curState;
    }

    private _states = {};

    private static _instance:GameStateManager = null;
    public static get Instance():GameStateManager
    {
        if(this._instance == null)
            this._instance = new GameStateManager();
        return this._instance;
    }

    public PushState(newState:any,...args:any[])
    {
        if (!this._states[newState.name]) 
        {
            this._states[newState.name] = new newState();
        }

        if(this._curState)
        {
            //当前状态如果是newState,不会继续执行
            if(this._curState == newState)
                return;
            if (!this._states[this._curState.name]) 
            {
                this._states[ this._curState.name] = new this._curState();
            }
            (this._states[ this._curState.name] as GameStateBase).OnExit();
            this._preState = this._curState;    
        }

        this._curState = newState;

        (this._states[newState.name] as GameStateBase).OnEnter(...args); 
    }

    public PushCurStateAgain(...args:any[]):void
    {
        if(this._curState)
        {
            (this._states[this._curState.name] as GameStateBase).OnExit();
            (this._states[this._curState.name] as GameStateBase).OnEnter(...args); 
        }
    }
}