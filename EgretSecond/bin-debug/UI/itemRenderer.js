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
var itemRenderer = (function (_super) {
    __extends(itemRenderer, _super);
    function itemRenderer() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.skinName = "resource/ui/item.exml";
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClick, _this);
        return _this;
    }
    itemRenderer.prototype.dataChanged = function () {
        this.lab1.text = this.data.label1;
        this.lab2.text = this.data.label2;
    };
    itemRenderer.prototype.onBtnClick = function (e) {
        danyaoTest.arr[1].label1 = "change" + this.count++;
    };
    return itemRenderer;
}(eui.ItemRenderer));
__reflect(itemRenderer.prototype, "itemRenderer");
//# sourceMappingURL=itemRenderer.js.map