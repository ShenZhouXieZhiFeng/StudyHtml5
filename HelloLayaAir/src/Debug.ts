class Debug {
    private static isDebugEnable: boolean = true;
    private static isWarnEnable: boolean = true;
    private static isErrorEnable: boolean = true;

    public static Log(log) {
        if (Debug.isDebugEnable) {
            console.log(log);
        }
    }

    public static Warn(warn) {
        if (Debug.isWarnEnable) {
            console.warn(warn);
        }
    }

    public static Error(err) {
        if (Debug.isErrorEnable) {
            console.error(err);
        }
    }

    public static LogVector3(str:string,vector:Laya.Vector3)
    {
        console.log(str + " Vector3(" + vector.x + "," + vector.y + "," + vector.z + ")");
    }
}