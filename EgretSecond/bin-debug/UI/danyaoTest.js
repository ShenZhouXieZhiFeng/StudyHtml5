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
var danyaoTest = (function (_super) {
    __extends(danyaoTest, _super);
    function danyaoTest() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    danyaoTest.prototype.createView = function () {
        this.skinName = "resource/ui/test.exml";
        for (var i = 1; i < 10; i++) {
            danyaoTest.arr.push({ id: i, label1: "stone1" + i, label2: "stone2" + i });
        }
        var coll = new eui.ArrayCollection(danyaoTest.arr);
        this.dg_content.dataProvider = coll;
        // this.list_content.itemRendererSkinName = "resource/ui/item.exml";
        this.dg_content.itemRenderer = itemRenderer;
    };
    danyaoTest.arr = [];
    return danyaoTest;
}(eui.Component));
__reflect(danyaoTest.prototype, "danyaoTest");
//# sourceMappingURL=danyaoTest.js.map