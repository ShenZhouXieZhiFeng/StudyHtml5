var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
function printLabel(obj) {
    console.log(obj.label);
}
function multReturn(con) {
    var res = { color: 'white', area: 100 };
    return res;
}
var interClass = (function () {
    function interClass() {
    }
    interClass.prototype.fun = function () {
    };
    return interClass;
}());
__reflect(interClass.prototype, "interClass", ["squareConfig"]);
var sobj1 = {};
var c1 = (function () {
    function c1(v) {
        this.v1 = v;
    }
    return c1;
}());
__reflect(c1.prototype, "c1");
var c2 = (function (_super) {
    __extends(c2, _super);
    function c2(v, vv) {
        var _this = _super.call(this, v) || this;
        _this.v2 = vv;
        return _this;
    }
    //类中的函数默认是public
    c2.prototype.func = function () {
        console.log("default");
    };
    return c2;
}(c1));
__reflect(c2.prototype, "c2");
var c2obj = new c2(1, 2);
c2obj.func();
var myAdd = function (x, y) { return x + y; };
var stone = (function () {
    function stone(name) {
        this.name = name;
        // this.print();
        // this.test1();
        // this.test2();
        // this.test3();
        // let names :string[] = ['hello','world'];
        // this.test5(1,'hello','world');
        this.test8();
    }
    stone.prototype.print = function () {
        console.log("your name is :" + this.name);
    };
    //let var
    stone.prototype.test1 = function () {
        var v1 = 10;
        var v2 = 30;
        {
            var v1_1 = 20;
            var v2 = 40;
        }
        console.log(v1);
        console.log(v2);
    };
    //类型
    stone.prototype.test2 = function () {
        //基本数据类型
        var b1 = false;
        var i1 = 10;
        var s1 = "stone";
        var s2 = "name is " + s1;
        // console.log(s2);
        // console.log(s1.length);
        //数组
        var l1 = [1, 2, 3];
        var l2 = ['3', '4', '5'];
        var l3 = [1, 2, 3]; //非制定类型的形式，不推荐
        // console.log(l3[1]);
        var l4 = [1, 2, 3];
        // console.log(typeof(l4));
        // console.log(l4.length);
        //元组Tuple
        var t1;
        t1 = [10, 'stone1', 11];
        // console.log(t1[2]);
        t1 = [20, 'stone2', 21]; //覆盖
        // console.log(t1[0]);
        // console.log(t1[1]);
        // console.log(t1[3]);
        t1[4] = 1;
        //枚举 
        var color;
        (function (color) {
            color[color["red"] = 0] = "red";
            color[color["green"] = 1] = "green";
            color[color["blue"] = 2] = "blue";
        })(color || (color = {}));
        ;
        var c1 = color.blue;
        // console.log(c1.toString());
        // console.log(typeof(c1));
        //any
        var a1 = 1;
        a1 = "stone";
        // a1 = false;
        this.cl(a1);
        //void never 无值与永不存在的值
        //类型断言,强制类型转换
        var vv1 = 11;
        var vv2 = vv1; //1
        var vv3 = vv1; //2
        //const 常量，声明后不可更改
        //结构数组
        var ll1 = [1, 2];
        var first = ll1[0], second = ll1[1];
        // console.log(first);
        var _a = [1, 2, 3], a = _a[0], b = _a[1], c = _a[2];
        console.log(a);
    };
    //接口
    stone.prototype.test3 = function () {
        var obj = { label: "stone" };
        printLabel(obj);
    };
    stone.prototype.test4 = function (point) {
        console.log(point.x);
        console.log(point.y);
    };
    stone.prototype.test5 = function (age) {
        var restOfName = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restOfName[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < restOfName.length; i++) {
            console.log(restOfName[i]);
        }
    };
    stone.prototype.test6 = function (x) {
        if (typeof x == 'object') {
            console.log('object');
        }
        else if (typeof x == 'number') {
            console.log("number");
        }
    };
    //泛型,使用any也能使函数能够接收不同类型的参数，但是在传入参数的时候就丢失了传入参数的类型
    stone.prototype.test7_1 = function (arg) {
        return arg;
    };
    //保持返回值的类型与传入值保持一致
    stone.prototype.test7 = function (arg) {
        return arg;
    };
    stone.prototype.test8 = function () {
        //枚举
        // enum Enum{
        // 	A,B
        // }
        // let a = Enum.A;
        // let nameOfA = Enum[Enum.A];
        // console.log(nameOfA);
        //迭代器
        var ll = [1, 2, 3, 4, 5, 6];
        for (var _i = 0, ll_1 = ll; _i < ll_1.length; _i++) {
            var v = ll_1[_i];
            console.log(v);
        }
    };
    stone.prototype.cl = function (a1) {
        console.log(a1);
    };
    return stone;
}());
__reflect(stone.prototype, "stone");
//# sourceMappingURL=stone.js.map