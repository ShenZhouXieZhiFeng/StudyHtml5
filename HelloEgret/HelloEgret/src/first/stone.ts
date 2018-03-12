interface labelVal
{
	label:string;
}

function printLabel(obj:labelVal)
{
	console.log(obj.label);
}

interface squareConfig
{
	color?:string;
	width?:number;
	fun();
}

function multReturn(con:squareConfig):{color:string;area:number}
{
	let res = {color:'white',area:100};
	return res;
}

class interClass implements squareConfig
{
	public constructor()
	{

	}	

	public fun()
	{

	}
}

interface Shape
{
	color:string;
}
interface Square extends Shape
{
	sideLength:number;
}
let sobj1 = <Square>{};

class c1
{
	v1 :number;
	public constructor(v:number){this.v1 = v;}
}
class c2 extends c1
{
	v2:number;
	public constructor(v:number,vv:number)
	{
		super(v);
		this.v2 = vv;
	}
	//类中的函数默认是public
	func()
	{
		console.log("default");
	}
}

let c2obj = new c2(1,2);
c2obj.func();

let myAdd :(baseVal:number,increment:number)=>number =
	function(x:number,y:number):number{return x+y;}

class stone {

	name:string;

	public constructor(name:string) {
		this.name = name;
		// this.print();
		// this.test1();
		// this.test2();
		// this.test3();
		// let names :string[] = ['hello','world'];
		// this.test5(1,'hello','world');
		this.test8();
	}

	public print() : void
	{
		console.log("your name is :" + this.name);
	}

	//let var
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

	//类型
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
		
		//结构数组
		let ll1:number[] = [1,2];
		let [first,second] = ll1;
		// console.log(first);
		let [a,b,c] = [1,2,3];
		console.log(a);
	}

	//接口
	public test3():void
	{
		let obj = {label:"stone"};
		printLabel(obj);
	}

	public test4(point:{x:number;y:number}):void
	{
		console.log(point.x);
		console.log(point.y);
	}

	public test5(age:number,...restOfName:string[])
	{
		for(let i = 0; i < restOfName.length; i ++)
		{
			console.log(restOfName[i]);
		}
	}

	test6(x:{suit:string;card:number}[]):number;
	test6(x:number):{suit:string;card:number};
	test6(x):any
	{
		if(typeof x == 'object')
		{
			console.log('object');
		}else if(typeof x == 'number')
		{
			console.log("number");
		}

	}

	//泛型,使用any也能使函数能够接收不同类型的参数，但是在传入参数的时候就丢失了传入参数的类型
	test7_1(arg:any):any
	{
		return arg;
	}
	//保持返回值的类型与传入值保持一致
	test7<T>(arg:T):T
	{
		return arg;
	}

	test8()
	{
		//枚举
		// enum Enum{
		// 	A,B
		// }
		// let a = Enum.A;
		// let nameOfA = Enum[Enum.A];
		// console.log(nameOfA);

		//迭代器
		let ll : number[] = [1,2,3,4,5,6];
		for(let v of ll)
		{
			console.log(v);
		}

		
	}
	
	public cl(a1:any):void{
		console.log(a1);
	}

}