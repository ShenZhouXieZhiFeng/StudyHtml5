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
var ControlUI = /** @class */ (function (_super) {
    __extends(ControlUI, _super);
    function ControlUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.atlasResource = [{
                url: 'res/atlas/ControlUI.atlas', type: Laya.Loader.ATLAS
            }];
        _this.dragDirection = new Laya.Vector2();
        _this.fireScleRate = 100; //ms
        _this.lastFireTime = 0;
        _this.crossHairScaleAmount = 1.5;
        _this.rightFireBtnPress = false;
        _this.leftFireBtnPress = false;
        _this.lineAlpha = 0;
        _this.lineScaleY = 0;
        _this.rightScreenTouchDelta = new Laya.Vector2();
        _this.LastUpdateFrame = 0;
        _this.bRightScreenPress = false;
        _this.preTouchPos = new Laya.Vector2();
        _this.pcStopMoveInput = false;
        _this.curScale = 0;
        _this.origVector = new Laya.Vector3();
        _this.dirVector = new Laya.Vector3();
        _this.ray = new Laya.Ray(_this.origVector, _this.dirVector);
        _this.hitInfo = new Laya.RaycastHit();
        return _this;
    }
    ControlUI.prototype.OnUiLoaded = function () {
        _super.prototype.OnUiLoaded.call(this);
        this.view = new ui.ControlUI();
        Laya.stage.addChild(this.view);
        this.view.visible = true;
        this.controlUi = this.view;
        this.joyStickImg = this.controlUi.JoyStick;
        this.joyStickOriginPos = new Laya.Vector2(this.joyStickImg.x, this.joyStickImg.y);
        this.dragVector = new Laya.Vector2(0, 0);
        this.dragDirection = new Laya.Vector2(0, 0);
        this.circleImg = this.controlUi.circle;
        this.bottomLeftLine = this.controlUi.bottomLeftLine;
        this.bottomRightLine = this.controlUi.bottomRightLine;
        this.topLeftLine = this.controlUi.upLeftLine;
        this.topRightLine = this.controlUi.upRightLine;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.DragJoyStickUpdate);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.DragJoyStickUpdate);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.StopDragJoyStickUpdate);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMouseUp);
        this.controlUi.fireBtn.on(Laya.Event.MOUSE_DOWN, this, this.rightFireBtnClick);
        this.controlUi.FireLeftBtn.on(Laya.Event.MOUSE_DOWN, this, this.leftFireBtnDown);
        this.controlUi.fireLeftBtnBG.on(Laya.Event.MOUSE_DOWN, this, this.leftFireBtnDown);
        // this.controlUi.FireLeftBtn.on(Laya.Event.MOUSE_UP,this,this.leftFireBtnUp);
        // this.controlUi.fireLeftBtnBG.on(Laya.Event.MOUSE_UP,this,this.leftFireBtnUp);
        this.controlUi.crouchBtn.on(Laya.Event.CLICK, this, this.onCrouchBtnClick);
        Laya.timer.frameLoop(1, this, this.FrameUpdate);
        EventDispatcher.Register(EventDef.EVENT_AIM_STATE_CHANGE, this.OnAimStateChange, this);
        EventDispatcher.Register(EventDef.EVENT_KILLING_INFO, this.onKillingInfo, this);
        EventDispatcher.Register(EventDef.EVENT_CLIENT_STATE, this.onClientStateChange, this);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.rightScreenAreaMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.rightScreenAreaMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.rightScreenAreaMouseMove);
        this.controlUi.AimBtn.on(Laya.Event.CLICK, this, this.OnAimBtnClick);
        this.controlUi.ScopeReddot.visible = false;
        // this.controlUi.FireLeftBtn.visible = false;
        // this.controlUi.fireLeftBtnBG.visible = false;
        this.controlUi.killInfoLabel.alpha = 0;
        this.controlUi.killer.alpha = 0;
        this.controlUi.killed.alpha = 0;
        this.controlUi.StateLabel.visible = false;
        this.controlUi.ScreenMask.visible = false;
        this.controlUi.Tips.visible = false;
    };
    ControlUI.prototype.rightScreenAreaMouseDown = function (e) {
        // if(e.touches == null)
        //     return;
        if (e.stageX > Laya.stage.width / 2) {
            this.bRightScreenPress = true;
            this.preTouchPos.x = Laya.stage.mouseX;
            this.preTouchPos.y = Laya.stage.mouseY;
        }
    };
    ControlUI.prototype.rightScreenAreaMouseUp = function (e) {
        if (e.stageX > Laya.stage.width / 2) {
            this.bRightScreenPress = false;
        }
    };
    ControlUI.prototype.rightScreenAreaMouseMove = function (e) {
        if (!this.bRightScreenPress)
            return;
        if (e.stageX > Laya.stage.width / 2) {
            this.rightScreenTouchDelta.x = (Laya.stage.mouseX - this.preTouchPos.x);
            this.rightScreenTouchDelta.y = (Laya.stage.mouseY - this.preTouchPos.y);
            EventDispatcher.Fire(EventDef.EVENT_RIGHT_SCREEN_TOUCH, this.rightScreenTouchDelta);
            this.preTouchPos.x = Laya.stage.mouseX;
            this.preTouchPos.y = Laya.stage.mouseY;
        }
    };
    ControlUI.prototype.DragJoyStickUpdate = function (e) {
        if (e.stageX > Laya.stage.width / 2 || e.touches == null || e.target == this.controlUi.FireLeftBtn || e.target == this.controlUi.fireLeftBtnBG)
            return;
        this.dragVector.x = Laya.stage.mouseX - this.joyStickOriginPos.x;
        this.dragVector.y = Laya.stage.mouseY - this.joyStickOriginPos.y;
        Utility.ClampVector2InMagnitude(this.dragVector, 150, this.dragVector);
        this.joyStickImg.pos(this.joyStickOriginPos.x + this.dragVector.x, this.joyStickOriginPos.y + this.dragVector.y);
        //拖动方向和力度(0-1)
        Utility.Vector2Normalize(this.dragVector, this.dragDirection);
        this.dragStrength = Utility.Vector2Magnitude(this.dragVector) / 150;
        EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH, this.dragDirection, this.dragStrength);
    };
    ControlUI.prototype.StopDragJoyStickUpdate = function (e) {
        if (e.stageX > Laya.stage.width / 2 || e.touches == null)
            return;
        this.joyStickImg.pos(this.joyStickOriginPos.x, this.joyStickOriginPos.y);
        EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH, new Laya.Vector2(0, 0), 0);
    };
    ControlUI.prototype.OnMouseUp = function (e) {
        if (e.stageX > Laya.stage.width / 2) {
            this.rightFireBtnPress = false;
            if (this.leftFireBtnPress == false)
                EventDispatcher.Fire(EventDef.EVEMT_STOP_FIRE);
        }
        if (e.stageX < Laya.stage.width / 2) {
            this.leftFireBtnPress = false;
            if (this.rightFireBtnPress == false)
                EventDispatcher.Fire(EventDef.EVEMT_STOP_FIRE);
        }
    };
    ControlUI.prototype.rightFireBtnClick = function (e) {
        EventDispatcher.Fire(EventDef.EVET_FIRE);
        EventDispatcher.Fire(EventDef.EVENT_START_FIRE);
        this.rightFireBtnPress = true;
    };
    ControlUI.prototype.leftFireBtnDown = function (e) {
        EventDispatcher.Fire(EventDef.EVET_FIRE);
        EventDispatcher.Fire(EventDef.EVENT_START_FIRE);
        this.leftFireBtnPress = true;
    };
    ControlUI.prototype.onCrouchBtnClick = function () {
        EventDispatcher.Fire(EventDef.EVENT_CROUCH);
    };
    ControlUI.prototype.FrameUpdate = function () {
        this.circleImgUpdate();
        this.HandleKeyboard();
        if (CharacterManager.LocalPlayer != undefined) {
            var isDead = CharacterManager.LocalPlayer.IsDead();
            Laya.stage.mouseEnabled = !isDead;
            this.controlUi.ScreenMask.visible = isDead;
            this.controlUi.ScreenMask.mouseEnabled = isDead;
            this.controlUi.Tips.visible = isDead;
        }
    };
    ControlUI.prototype.HandleKeyboard = function () {
        if (Laya.Browser.onPC) {
            var touch = new Laya.Vector2(0, 0);
            var hasInput = false;
            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A)) {
                touch.x = -1;
                hasInput = true;
            }
            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D)) {
                touch.x = 1;
                hasInput = true;
            }
            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W)) {
                touch.y = -1;
                hasInput = true;
            }
            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S)) {
                touch.y = 1;
                hasInput = true;
            }
            if (hasInput) {
                EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH, touch, 1);
                this.pcStopMoveInput = false;
            }
            else {
                if (!this.pcStopMoveInput) {
                    EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH, new Laya.Vector2(0, 0), 0);
                    this.pcStopMoveInput = true;
                }
            }
        }
    };
    ControlUI.prototype.circleImgUpdate = function () {
        if (this.leftFireBtnPress || this.rightFireBtnPress) {
            this.OnFire();
        }
        var lerpAmount = Laya.timer.delta / 100;
        this.curScale = this.circleImg.scaleX;
        this.curScale = Laya.MathUtil.lerp(this.curScale, 1, lerpAmount);
        this.circleImg.scale(this.curScale, this.curScale);
        this.lineScaleY = Laya.MathUtil.lerp(this.lineScaleY, 2, lerpAmount * 3);
        this.lineAlpha = Laya.MathUtil.lerp(this.lineAlpha, 0, lerpAmount * 2);
        this.bottomLeftLine.alpha = this.lineAlpha;
        this.bottomLeftLine.scale(1, this.lineScaleY);
        this.bottomRightLine.alpha = this.lineAlpha;
        this.bottomRightLine.scale(1, this.lineScaleY);
        this.topLeftLine.alpha = this.lineAlpha;
        this.topLeftLine.scale(1, this.lineScaleY);
        this.topRightLine.alpha = this.lineAlpha;
        this.topRightLine.scale(1, this.lineScaleY);
    };
    ControlUI.prototype.OnFire = function () {
        if (Laya.timer.currTimer > this.lastFireTime + this.fireScleRate) {
            this.RayCast();
            this.circleImg.scale(1.5, 1.5);
            this.lastFireTime = Laya.timer.currTimer;
            Laya.SoundManager.playSound("res/Sound/M4A1_A.mp3", 1);
            this.OnHit();
        }
    };
    ControlUI.prototype.RayCast = function () {
        this.ray.origin = SceneManager.currentSceneCamera.position;
        this.ray.direction = SceneManager.currentSceneCamera.forward;
        Laya.Physics.rayCast(this.ray, this.hitInfo, 100);
        if (this.hitInfo.sprite3D != null) {
            this.onDetectedEnermy(this.hitInfo.sprite3D, this.hitInfo.position);
        }
        else {
            this.onUnDetectedEnermy();
        }
    };
    ControlUI.prototype.OnAimBtnClick = function () {
        EventDispatcher.Fire(EventDef.EVENT_AIM_CLICK);
    };
    ControlUI.prototype.OnHit = function () {
        if (this.detectedEnermy != null) {
            if (CharacterManager.LocalPlayer != undefined && CharacterManager.LocalPlayer.IsDead())
                return;
            if (this.detectedEnermy.HP <= 0)
                return;
            var causerID = ClientApp.LocalActor.actorNr;
            var victimID = this.detectedEnermy.Actor.actorNr;
            this.detectedEnermy.OnHit(causerID, this.detectedEnermy.cacheHitPos);
            var data = {
                "causerID": ClientApp.LocalActor.actorNr,
                "victimID": victimID,
                "hitPos": this.detectedEnermy.cacheHitPos
            };
            ClientApp.RaiseEventToOthers(NetEventDef.Hit, data);
            this.lineAlpha = 1;
            this.lineScaleY = 0;
        }
    };
    ControlUI.prototype.OnAimStateChange = function (isAim) {
        this.controlUi.ScopeReddot.visible = isAim;
    };
    ControlUI.prototype.onDetectedEnermy = function (enermy, pos) {
        var parent = Utility.GetParent(enermy);
        this.detectedEnermy = parent.getComponentByType(RemoteCharacterControl);
        if (this.detectedEnermy != null)
            this.detectedEnermy.cacheHitPos = pos;
    };
    ControlUI.prototype.onUnDetectedEnermy = function () {
        this.detectedEnermy = null;
    };
    ControlUI.prototype.onKillingInfo = function (killer, killed) {
        this.controlUi.killer.text = killer;
        this.controlUi.killed.text = killed;
        this.controlUi.killInfoLabel.alpha = 1;
        this.controlUi.killer.alpha = 1;
        this.controlUi.killed.alpha = 1;
        Laya.timer.once(2000, this, this.delayFadeOut, null, true);
    };
    ControlUI.prototype.delayFadeOut = function () {
        Laya.timer.frameLoop(1, this, this.tweenKillingInfo, null, true);
    };
    ControlUI.prototype.tweenKillingInfo = function () {
        var delta = Laya.timer.delta / 3000;
        this.controlUi.killInfoLabel.alpha -= delta;
        this.controlUi.killer.alpha -= delta;
        this.controlUi.killed.alpha -= delta;
        if (this.controlUi.killInfoLabel.alpha <= 0) {
            this.controlUi.killInfoLabel.alpha = 0;
            this.controlUi.killer.alpha = 0;
            this.controlUi.killed.alpha = 0;
            Laya.timer.clear(this, this.tweenKillingInfo);
        }
    };
    ControlUI.prototype.onClientStateChange = function (state) {
        if (state == Photon.LoadBalancing.LoadBalancingClient.State.Disconnected ||
            state == Photon.LoadBalancing.LoadBalancingClient.State.Error) {
            this.controlUi.StateLabel.visible = true;
        }
    };
    return ControlUI;
}(UIBase));
//# sourceMappingURL=ControlUI.js.map