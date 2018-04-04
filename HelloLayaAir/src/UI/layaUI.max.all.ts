
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameBattleViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":1080,"height":1920},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1080,"skin":"GameBattle/scene01.png","height":1920}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameBattleViewUI.uiView);

        }

    }
}
