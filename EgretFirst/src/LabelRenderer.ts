class LabelRenderer extends eui.ItemRenderer {

	private labelDis:eui.Label;

	public constructor() {
		super();
		this.touchChildren = true;
		this.labelDis = new eui.Label();
		this.addChild(this.labelDis);
	}

	protected dataChanged():void
	{
		this.labelDis.text = this.data.label;
	}
}