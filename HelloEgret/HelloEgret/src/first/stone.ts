class stone {

	name:string;

	public constructor(name:string) {
		this.name = name;
		// this.print();
		// this.test1();
		this.test2();
		// this.test3();
	}

	public print() : void
	{
		console.log("your name is :" + this.name);
	}

	public test1() : void
	{
		let v1 = 10;
		var v2 = 30;
		{
			let v1 = 20;
			var v2 = 40;
		}
		console.log(v1);
		console.log(v2);
	}

	public test2():void
	{
		//基本数据类型
		let b1 :boolean = false;
		let i1 :number = 10;
		let s1 :string = "stone";
		let s2 :string = `name is ${s1}`
		// console.log(s2);
		// console.log(s1.length);

		//数组
		let l1 : number[] = [1,2,3];
		let l2 :string[] = ['3','4','5'];
		let l3 = [1,2,3];//非制定类型的形式，不推荐
		// console.log(l3[1]);
		let l4 : Array<number> = [1,2,3];
		// console.log(typeof(l4));
		// console.log(l4.length);

		//元组Tuple
		let t1 :[number,string,number];
		t1 = [10,'stone1',11];
		// console.log(t1[2]);
		t1 = [20,'stone2',21];//覆盖
		// console.log(t1[0]);
		// console.log(t1[1]);
		// console.log(t1[3]);
		t1[4] = 1;

		//枚举 
		enum color{red,green,blue};
		let c1 : color = color.blue;
		// console.log(c1.toString());
		// console.log(typeof(c1));

		//any
		let a1 :any = 1;
		a1 = "stone";
		// a1 = false;
		this.cl(a1);

		//void never 无值与永不存在的值

		//类型断言,强制类型转换
		let vv1 : number = 11;
		let vv2 : number = <number>vv1;//1
		let vv3 : number = vv1 as number;//2

		//const 常量，声明后不可更改
		
	}

	public test3():void
	{
		let fun;
		fun = function(age:number)
		{
			// this.cl(age);// 无法调用
			console.log(age);
		}
		fun(0);
	}

	public test4():void
	{


	}

	public cl(a1:any):void{
		console.log(a1);
	}

}