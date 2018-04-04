class ControlUI extends UIBase {
    public atlasResource = [{
        url: 'res/atlas/ControlUI.atlas', type: Laya.Loader.ATLAS
    }];

    controlUi: ui.ControlUI;
    joyStickImg: Laya.Image;
    joyStickOriginPos:Laya.Vector2;
    dragVector:Laya.Vector2;

    dragDirection:Laya.Vector2 = new Laya.Vector2();
    dragStrength:number;
    circleImg:Laya.Image;
    fireScleRate = 100;//ms
    lastFireTime = 0;
    crossHairScaleAmount = 1.5;

    rightFireBtnPress = false;
    leftFireBtnPress = false;

    bottomLeftLine:Laya.Image;
    bottomRightLine:Laya.Image;
    topLeftLine:Laya.Image;
    topRightLine:Laya.Image;

    lineAlpha = 0;
    lineScaleY = 0;

    OnUiLoaded(): void {
        super.OnUiLoaded();

        this.view = new ui.ControlUI();
        Laya.stage.addChild(this.view);
        this.view.visible = true;

        this.controlUi = this.view as ui.ControlUI;
        this.joyStickImg = this.controlUi.JoyStick;
        this.joyStickOriginPos = new Laya.Vector2(this.joyStickImg.x,this.joyStickImg.y);
        this.dragVector = new Laya.Vector2(0,0);
        this.dragDirection = new Laya.Vector2(0,0);
        this.circleImg = this.controlUi.circle;

        this.bottomLeftLine = this.controlUi.bottomLeftLine;
        this.bottomRightLine = this.controlUi.bottomRightLine;
        this.topLeftLine = this.controlUi.upLeftLine;
        this.topRightLine = this.controlUi.upRightLine;

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.DragJoyStickUpdate)
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.DragJoyStickUpdate);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.StopDragJoyStickUpdate);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMouseUp);

        this.controlUi.fireBtn.on(Laya.Event.MOUSE_DOWN,this,this.rightFireBtnClick);

        this.controlUi.FireLeftBtn.on(Laya.Event.MOUSE_DOWN,this,this.leftFireBtnDown);
        this.controlUi.fireLeftBtnBG.on(Laya.Event.MOUSE_DOWN,this,this.leftFireBtnDown);
        // this.controlUi.FireLeftBtn.on(Laya.Event.MOUSE_UP,this,this.leftFireBtnUp);
        // this.controlUi.fireLeftBtnBG.on(Laya.Event.MOUSE_UP,this,this.leftFireBtnUp);

        this.controlUi.crouchBtn.on(Laya.Event.CLICK,this,this.onCrouchBtnClick);

        Laya.timer.frameLoop(1,this,this.FrameUpdate);

        EventDispatcher.Register(EventDef.EVENT_AIM_STATE_CHANGE,this.OnAimStateChange,this);
        EventDispatcher.Register(EventDef.EVENT_KILLING_INFO,this.onKillingInfo,this);
        EventDispatcher.Register(EventDef.EVENT_CLIENT_STATE,this.onClientStateChange,this);

        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.rightScreenAreaMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.rightScreenAreaMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.rightScreenAreaMouseMove);
        
        this.controlUi.AimBtn.on(Laya.Event.CLICK,this,this.OnAimBtnClick);

        this.controlUi.ScopeReddot.visible = false;
        // this.controlUi.FireLeftBtn.visible = false;
        // this.controlUi.fireLeftBtnBG.visible = false;
        this.controlUi.killInfoLabel.alpha = 0;
        this.controlUi.killer.alpha = 0;
        this.controlUi.killed.alpha = 0;
        this.controlUi.StateLabel.visible = false;
        this.controlUi.ScreenMask.visible = false;
        this.controlUi.Tips.visible = false;
    }

    rightScreenTouchDelta:Laya.Vector2 = new Laya.Vector2();
    LastUpdateFrame = 0;
    bRightScreenPress = false;
    preTouchPos = new Laya.Vector2();

    rightScreenAreaMouseDown(e:Laya.Event)
    {
        // if(e.touches == null)
        //     return;
            
        if(e.stageX > Laya.stage.width / 2)
        {
            this.bRightScreenPress = true;

            this.preTouchPos.x = Laya.stage.mouseX;
            this.preTouchPos.y = Laya.stage.mouseY;
        }
    }

    rightScreenAreaMouseUp(e:Laya.Event)
    {
        if(e.stageX > Laya.stage.width / 2)
        {
            this.bRightScreenPress = false;
        }
    }

    rightScreenAreaMouseMove(e:Laya.Event)
    {
        if(!this.bRightScreenPress)
            return;

        if(e.stageX > Laya.stage.width / 2)
        {
            this.rightScreenTouchDelta.x = (Laya.stage.mouseX - this.preTouchPos.x);
            this.rightScreenTouchDelta.y = (Laya.stage.mouseY - this.preTouchPos.y);
            
            EventDispatcher.Fire(EventDef.EVENT_RIGHT_SCREEN_TOUCH,this.rightScreenTouchDelta);

            this.preTouchPos.x = Laya.stage.mouseX;
            this.preTouchPos.y = Laya.stage.mouseY;
        }
    }

    DragJoyStickUpdate(e:Laya.Event) {
        
        if(e.stageX > Laya.stage.width / 2 || e.touches == null || e.target == this.controlUi.FireLeftBtn || e.target == this.controlUi.fireLeftBtnBG)
            return;

        this.dragVector.x = Laya.stage.mouseX - this.joyStickOriginPos.x;
        this.dragVector.y = Laya.stage.mouseY - this.joyStickOriginPos.y;

        Utility.ClampVector2InMagnitude(this.dragVector,150,this.dragVector);
        this.joyStickImg.pos(this.joyStickOriginPos.x + this.dragVector.x,this.joyStickOriginPos.y + this.dragVector.y);

        //拖动方向和力度(0-1)
        Utility.Vector2Normalize(this.dragVector,this.dragDirection);
        this.dragStrength = Utility.Vector2Magnitude(this.dragVector) / 150;

        EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH,this.dragDirection,this.dragStrength);
    }

    StopDragJoyStickUpdate(e:Laya.Event) {
        if(e.stageX > Laya.stage.width / 2 || e.touches == null)
            return;
        this.joyStickImg.pos(this.joyStickOriginPos.x,this.joyStickOriginPos.y);
        EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH,new Laya.Vector2(0,0),0);
    }

    OnMouseUp(e:Laya.Event)
    {
        if(e.stageX > Laya.stage.width / 2)
        {
            this.rightFireBtnPress = false;

            if(this.leftFireBtnPress == false)
                EventDispatcher.Fire(EventDef.EVEMT_STOP_FIRE);
        }

        
        if(e.stageX < Laya.stage.width / 2)
        {
            this.leftFireBtnPress = false;

            if(this.rightFireBtnPress == false)
                EventDispatcher.Fire(EventDef.EVEMT_STOP_FIRE);
        }
    }

    rightFireBtnClick(e:Laya.Event)
    {
        EventDispatcher.Fire(EventDef.EVET_FIRE);
        EventDispatcher.Fire(EventDef.EVENT_START_FIRE);
        this.rightFireBtnPress = true;
    }

    leftFireBtnDown(e:Laya.Event)
    {
        EventDispatcher.Fire(EventDef.EVET_FIRE);
        EventDispatcher.Fire(EventDef.EVENT_START_FIRE);
        this.leftFireBtnPress = true;
    }


    onCrouchBtnClick()
    {
        EventDispatcher.Fire(EventDef.EVENT_CROUCH);
    }

    FrameUpdate()
    {
        this.circleImgUpdate();
        this.HandleKeyboard();

        if(CharacterManager.LocalPlayer != undefined)
        {
            let isDead = CharacterManager.LocalPlayer.IsDead();
            Laya.stage.mouseEnabled = !isDead;
            this.controlUi.ScreenMask.visible = isDead;
            this.controlUi.ScreenMask.mouseEnabled = isDead;
            this.controlUi.Tips.visible = isDead;
        }
    }

    pcStopMoveInput = false;

    HandleKeyboard()
    {
        if(Laya.Browser.onPC)
        {
            let touch = new Laya.Vector2(0,0);
            let hasInput = false;
            if(Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A))
            {
                touch.x = -1;
                hasInput = true;
            }
            if(Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D))
            {
                touch.x = 1;
                hasInput = true;
            }
            if(Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W))
            {
                touch.y = -1;
                hasInput = true;
            }
            if(Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S))
            {
                touch.y = 1;
                hasInput = true;
            }
            if(hasInput)
            {
                EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH,touch,1);
                this.pcStopMoveInput = false;
            }
            else
            {
                if(!this.pcStopMoveInput)
                {
                    EventDispatcher.Fire(EventDef.EVENT_JOY_STICK_TOUCH,new Laya.Vector2(0,0),0);
                    this.pcStopMoveInput = true;
                }
            }
        }
    }

    curScale = 0;

    circleImgUpdate()
    {
        if(this.leftFireBtnPress || this.rightFireBtnPress)
        {
            this.OnFire();
        }

        let lerpAmount = Laya.timer.delta / 100;
        this.curScale = this.circleImg.scaleX;
        this.curScale = Laya.MathUtil.lerp(this.curScale,1,lerpAmount);
        this.circleImg.scale(this.curScale,this.curScale);

        this.lineScaleY = Laya.MathUtil.lerp(this.lineScaleY,2,lerpAmount * 3);
        this.lineAlpha = Laya.MathUtil.lerp(this.lineAlpha,0,lerpAmount * 2);

        this.bottomLeftLine.alpha = this.lineAlpha;
        this.bottomLeftLine.scale(1,this.lineScaleY);

        this.bottomRightLine.alpha = this.lineAlpha;
        this.bottomRightLine.scale(1,this.lineScaleY);

        this.topLeftLine.alpha = this.lineAlpha;
        this.topLeftLine.scale(1,this.lineScaleY);

        this.topRightLine.alpha = this.lineAlpha;
        this.topRightLine.scale(1,this.lineScaleY);
    }

    OnFire()
    {
        if(Laya.timer.currTimer > this.lastFireTime + this.fireScleRate)
        {
            this.RayCast();
            this.circleImg.scale(1.5,1.5);
            this.lastFireTime = Laya.timer.currTimer;
            Laya.SoundManager.playSound("res/Sound/M4A1_A.mp3",1);
            this.OnHit();
        }
    }

    private origVector = new Laya.Vector3();
    private dirVector = new Laya.Vector3();
    private ray = new Laya.Ray(this.origVector,this.dirVector);
    private hitInfo = new Laya.RaycastHit();

    public RayCast()
    {
        this.ray.origin = SceneManager.currentSceneCamera.position;
        this.ray.direction = SceneManager.currentSceneCamera.forward;

        Laya.Physics.rayCast(this.ray,this.hitInfo,100);
        
        if(this.hitInfo.sprite3D != null)
        {
            this.onDetectedEnermy(this.hitInfo.sprite3D,this.hitInfo.position);
        }
        else
        {
            this.onUnDetectedEnermy();
        }
    }

    OnAimBtnClick()
    {
        EventDispatcher.Fire(EventDef.EVENT_AIM_CLICK);
    }

    OnHit()
    {
        if(this.detectedEnermy != null)
        {
            if(CharacterManager.LocalPlayer != undefined && CharacterManager.LocalPlayer.IsDead())
                return;
            if(this.detectedEnermy.HP <= 0)
                return;
            
            let causerID = ClientApp.LocalActor.actorNr;
            let victimID = this.detectedEnermy.Actor.actorNr;

            this.detectedEnermy.OnHit(causerID,this.detectedEnermy.cacheHitPos);

            let data = {
                "causerID":ClientApp.LocalActor.actorNr,
                "victimID":victimID,
                "hitPos":this.detectedEnermy.cacheHitPos
            };

            ClientApp.RaiseEventToOthers(NetEventDef.Hit,data);

            this.lineAlpha = 1;
            this.lineScaleY = 0;
        }
    }

    OnAimStateChange(isAim:boolean)
    {
        this.controlUi.ScopeReddot.visible = isAim;
    }

    detectedEnermy:RemoteCharacterControl;

    onDetectedEnermy(enermy:Laya.Sprite3D,pos:Laya.Vector3)
    {
        let parent = Utility.GetParent(enermy);
        this.detectedEnermy = (parent as Laya.Sprite3D).getComponentByType(RemoteCharacterControl) as RemoteCharacterControl;
        if(this.detectedEnermy != null)
            this.detectedEnermy.cacheHitPos = pos;
    }

    onUnDetectedEnermy()
    {
        this.detectedEnermy = null;
    }

    onKillingInfo(killer,killed)
    {
        this.controlUi.killer.text = killer;
        this.controlUi.killed.text = killed;
        this.controlUi.killInfoLabel.alpha = 1;
        this.controlUi.killer.alpha = 1;
        this.controlUi.killed.alpha = 1;
        Laya.timer.once(2000,this,this.delayFadeOut,null,true);
    }

    delayFadeOut()
    {
        Laya.timer.frameLoop(1,this,this.tweenKillingInfo,null,true);
    }

    tweenKillingInfo()
    {
        let delta = Laya.timer.delta / 3000;
        this.controlUi.killInfoLabel.alpha -= delta;
        this.controlUi.killer.alpha -= delta;
        this.controlUi.killed.alpha -= delta;

        if(this.controlUi.killInfoLabel.alpha <= 0)
        {
            this.controlUi.killInfoLabel.alpha = 0;
            this.controlUi.killer.alpha = 0;
            this.controlUi.killed.alpha = 0;
            Laya.timer.clear(this,this.tweenKillingInfo);
        }
    }

    onClientStateChange(state)
    {
        if(state == Photon.LoadBalancing.LoadBalancingClient.State.Disconnected ||
            state == Photon.LoadBalancing.LoadBalancingClient.State.Error)
        {
            this.controlUi.StateLabel.visible = true;
        }
    }
}