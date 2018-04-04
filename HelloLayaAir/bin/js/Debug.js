var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.Log = function (log) {
        if (Debug.isDebugEnable) {
            console.log(log);
        }
    };
    Debug.Warn = function (warn) {
        if (Debug.isWarnEnable) {
            console.warn(warn);
        }
    };
    Debug.Error = function (err) {
        if (Debug.isErrorEnable) {
            console.error(err);
        }
    };
    Debug.LogVector3 = function (str, vector) {
        console.log(str + " Vector3(" + vector.x + "," + vector.y + "," + vector.z + ")");
    };
    Debug.isDebugEnable = true;
    Debug.isWarnEnable = true;
    Debug.isErrorEnable = true;
    return Debug;
}());
//# sourceMappingURL=Debug.js.map