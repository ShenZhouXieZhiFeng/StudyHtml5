interface itemData
{
	id:number;
	label1:string;
	label2:string;
}

class danyaoTest extends eui.Component {

	public dg_content: eui.DataGroup;
	public static arr:itemData[] = [];

	public constructor() {
		super();
		this.createView();
	}

	private createView():void
	{
		this.skinName = "resource/ui/test.exml";
		for(let i:number = 1; i < 10; i ++)
		{
			danyaoTest.arr.push({id: i,label1: "stone1" + i,label2: "stone2" + i});
		}
		let coll:eui.ArrayCollection = new eui.ArrayCollection(danyaoTest.arr);
		this.dg_content.dataProvider = coll;

		// this.list_content.itemRendererSkinName = "resource/ui/item.exml";
		this.dg_content.itemRenderer = itemRenderer;
	}
}