
enum eUIEnum {
    Game_BattleUI,
    
}

// UI管理器
class UIManager {
    private constructor() 
    {
        this._CacheUIs = new laya.utils.Dictionary();
    }
    
    private canTouchTag = [];
    private static _Instance:UIManager;

    public static get Instance(): UIManager 
    {
        if (UIManager._Instance == null) 
        {
            UIManager._Instance = new UIManager();
        }
        return UIManager._Instance;
    }

    private _CacheUIs:laya.utils.Dictionary= new laya.utils.Dictionary();

    public Release() {
        this._CacheUIs.clear();
    }

    public GetUIByID(uiID: eUIEnum): UIBase {
        if (this._CacheUIs.get(uiID)) {
            return this._CacheUIs.get(uiID);
        }
        else
        {
            let ui2Get = this.cretateUI(uiID);

            if(ui2Get != null)
                this._CacheUIs.set(uiID,ui2Get);
            return ui2Get;
        }
    }

    // 显示一个UI
    public Show(uiID: eUIEnum): UIBase {
        let ui2Show :UIBase = null;

        if (this._CacheUIs.get(uiID)) {
            ui2Show = this._CacheUIs.get(uiID);
        }
        else {
            ui2Show = this.cretateUI(uiID);

            if(ui2Show != null)
                this._CacheUIs.set(uiID,ui2Show);
        }

        if (ui2Show != null) {
            ui2Show.OnShow();
        }
        return ui2Show;
    }

    // 隐藏一个UI
    public Hide(uiID: eUIEnum, isDestroy?: boolean) {
        if (this._CacheUIs.get(uiID)) {
            this._CacheUIs.get(uiID).OnHide();
        }
    }

    // 刷新UI
    public UpdateUI(uiID: eUIEnum, args?: any[]) {
        if (this._CacheUIs.get(uiID)) {
            this._CacheUIs.get(uiID).OnUpdate(args);
        }
    }

    private cretateUI(uiID: eUIEnum): UIBase {
        switch (uiID) {
            case eUIEnum.Game_BattleUI:
                return new GameUI();
           
        }
        return null;
    }
}