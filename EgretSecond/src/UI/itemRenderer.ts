class itemRenderer extends eui.ItemRenderer{

	public lab1:eui.Label;
	public lab2:eui.Label;
	public btn:eui.Button;

	public constructor() {
		super();
		this.skinName = "resource/ui/item.exml";
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
	}

	protected dataChanged():void
	{
		this.lab1.text = this.data.label1;
		this.lab2.text = this.data.label2;
	}

	private count:number = 0;

	private onBtnClick(e:egret.Event):void
	{
		danyaoTest.arr[1].label1 = "change" + this.count++;
	}

}