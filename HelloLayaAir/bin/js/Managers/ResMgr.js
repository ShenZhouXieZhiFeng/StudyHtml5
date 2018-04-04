/*
* name;
*/
var ResMgr = /** @class */ (function () {
    function ResMgr() {
    }
    // 通过JSON配置加载资源
    ResMgr.LoadRes = function (resConfgJsonURL, onLoaded, onProgress) {
        Laya.loader.load([{ url: resConfgJsonURL, type: Laya.Loader.JSON }], Laya.Handler.create(this, this.OnResConfigJsonLoaded, [resConfgJsonURL, onLoaded, onProgress]));
    };
    ResMgr.OnResConfigJsonLoaded = function (resCfgJsonURL, onResLoaded, OnResProgress) {
        var resConfigJson = Laya.loader.getRes(resCfgJsonURL);
        var resConfig = resConfigJson;
        var urls = [];
        for (var i = 0; i < resConfig.length; ++i) {
            var t_url = resConfig[i].url;
            var url = { url: t_url, type: resConfig[i].type };
            urls.push(url);
        }
        Laya.loader.load(urls, onResLoaded, OnResProgress);
    };
    return ResMgr;
}());
//# sourceMappingURL=ResMgr.js.map