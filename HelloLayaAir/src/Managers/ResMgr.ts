interface IResConfigItem
{
    url:string;
    type:string;
    clas:string;
}

/*
* name;
*/
class ResMgr{

    // 通过JSON配置加载资源
    public static LoadRes(resConfgJsonURL:any,onLoaded?:Laya.Handler,onProgress?:Laya.Handler)
    {
        Laya.loader.load([{url:resConfgJsonURL,type:Laya.Loader.JSON}],Laya.Handler.create(this,this.OnResConfigJsonLoaded,[resConfgJsonURL,onLoaded,onProgress]));
    }

    private static OnResConfigJsonLoaded(resCfgJsonURL, onResLoaded,OnResProgress)
    {
        let resConfigJson = Laya.loader.getRes(resCfgJsonURL);
        let resConfig = resConfigJson as IResConfigItem[];

        let urls = [];

        for(let i = 0;i < resConfig.length;++i)
        {
            let t_url = resConfig[i].url;

            let url = {url:t_url,type:resConfig[i].type};

            urls.push(url);
        }

        Laya.loader.load(urls,onResLoaded,OnResProgress);
    }
}