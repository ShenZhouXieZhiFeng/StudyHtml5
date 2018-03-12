var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var stone = (function () {
    function stone(name) {
        this.name = name;
        // this.print();
        // this.test1();
        // this.test2();
        this.test3();
    }
    stone.prototype.print = function () {
        console.log("your name is :" + this.name);
    };
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
    };
    stone.prototype.test3 = function () {
        var fun;
        fun = function (age) {
            // this.cl(age);
            console.log(age);
        };
        fun(0);
    };
    stone.prototype.test4 = function () {
    };
    stone.prototype.cl = function (a1) {
        console.log(a1);
    };
    return stone;
}());
__reflect(stone.prototype, "stone");
//# sourceMappingURL=stone.js.map