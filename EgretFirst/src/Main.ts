class Main extends eui.UILayer {

    protected createChildren(): void {

        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        // this.runGame().catch(e => {
        //     console.log(e);
        // })
        this.myRunGame().catch(e=>{
            console.log(e);
        })
    }

    ////练习代码
    private async myRunGame()
    {
        await this.loadResource();//加载在default.res.json文件中配置的资源信息
        this.myCreateScene();//配置场景
    }

    private myCreateScene():void
    {
        //加载背景图片
        let bg : egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(bg);//添加到容器中
        //设置图片的宽高，以及坐标
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stage.height;
        bg.x = 0;
        bg.y = 0;
        //设置点击事件
        // bg.touchEnabled = true;//启用该部件的点击
        // //设定相应的点击事件与函数
        // bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBgTouchTap,this);
        // bg.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBgTouchMove,this);
        // bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBgTouchBegin,this);
        // bg.addEventListener(egret.TouchEvent.TOUCH_END,this.onBgTouchEnd,this);
        // //定时器
        // let timer:egret.Timer = new egret.Timer(1000,10);
        // timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerComplete,this);
        // timer.addEventListener(egret.TimerEvent.TIMER,(e:egret.TimerEvent)=>{
        //     console.log(e.data);
        // },this);
        // timer.start();
        this.myTest01();
    }

    myTest01():void
    {
        // let shp:egret.Shape = new egret.Shape();
        // shp.graphics.beginFill(0xf0000,1);
        // shp.graphics.drawRect(0,0,100,200);
        // shp.graphics.endFill();
        // this.addChild(shp);

        // let infoText:egret.TextField;
        // infoText = new egret.TextField();
        // infoText.text = "stone";
        // this.addChild(infoText);
        // infoText.text = "change";

        //HTTP
        // let req = new egret.HttpRequest();
        // req.response = egret.HttpResponseType.TEXT;
        // req.open("http://httpbin.org/get",egret.HttpMethod.GET);
        // req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // req.send();
        // req.addEventListener(egret.Event.COMPLETE,(e:egret.Event):void=>{
        //     let req = <egret.HttpRequest>e.currentTarget;
        //     console.log("post data :",req.response);
        // },this);
        // req.addEventListener(egret.IOErrorEvent.IO_ERROR,(e:egret.IOErrorEvent):void=>{
        //     console.log("HTTP IO_ERROR");
        // },this);

        //回调
        // this.callBackTest((x:string)=>{
        //     console.log("这是回调的输出" + x);
        // });

        // egret.startTick(this.tickFunc,this);

        // console.log(egret.Capabilities.os);

        // let map : {[k:string]:number} = 
        // {
        //     '1' : 1,
        //     '2' : 2
        // }

        
    }

    tickFunc(t:number):boolean
    {
        console.log(egret.getTimer());
        return false;
    }

    callBackTest(cb:Function):void{
        cb(1);
    }

    onTimerComplete(e:egret.TimerEvent):void
    {
        console.log("onTimerComplete");
    }

    //轻触事件
    onBgTouchTap(e:egret.TouchEvent):void
    {
        console.log("onBgTouchTap");
        console.log(e.stageX + e.stageY);
    }

    //移动
    onBgTouchMove(e:egret.TouchEvent):void
    {
        console.log("onBgTouchMove");
    }

    //触摸开始
    onBgTouchBegin(e:egret.TouchEvent):void
    {
        console.log("onBgTouchBegin");
    }

    //触摸结束
    onBgTouchEnd(e:egret.TouchEvent):void
    {
        console.log("onBgTouchEnd");
    }

    ////官方示例代码
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();//获得一个加载条
            this.stage.addChild(loadingView);   //将加载条添加到显示容器上
            await RES.loadConfig("resource/default.res.json", "resource/");//读取加载资源
            await this.loadTheme();//加载主题
            await RES.loadGroup("preload", 0, loadingView);//加载一组资源
            this.stage.removeChild(loadingView);//将进度条从容器中移除
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
