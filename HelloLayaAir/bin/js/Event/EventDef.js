/*
* 事件枚举
* 将需要通知的事件key保存为枚举类型
*/
var EventDef;
(function (EventDef) {
    EventDef[EventDef["EVET_FIRE"] = 0] = "EVET_FIRE";
    EventDef[EventDef["EVENT_CROUCH"] = 1] = "EVENT_CROUCH";
    EventDef[EventDef["EVENT_HIT_ENERMY"] = 2] = "EVENT_HIT_ENERMY";
    // EVENT_DETECTED_ENERMY = 3,
    // EVENT_UNDETECTED_ENERMY = 4,
    EventDef[EventDef["EVENT_START_FIRE"] = 5] = "EVENT_START_FIRE";
    EventDef[EventDef["EVEMT_STOP_FIRE"] = 6] = "EVEMT_STOP_FIRE";
    EventDef[EventDef["EVENT_CHANGE_CAMERA_MODE"] = 7] = "EVENT_CHANGE_CAMERA_MODE";
    EventDef[EventDef["EVENT_ROTATE_CAMERA_FREE"] = 9] = "EVENT_ROTATE_CAMERA_FREE";
    EventDef[EventDef["EVENT_CHARACTER_MOVE"] = 10] = "EVENT_CHARACTER_MOVE";
    EventDef[EventDef["EVENT_RIGHT_SCREEN_TOUCH"] = 11] = "EVENT_RIGHT_SCREEN_TOUCH";
    EventDef[EventDef["EVENT_JOY_STICK_TOUCH"] = 12] = "EVENT_JOY_STICK_TOUCH";
    EventDef[EventDef["EVENT_AIM_CLICK"] = 13] = "EVENT_AIM_CLICK";
    EventDef[EventDef["EVENT_AIM_STATE_CHANGE"] = 14] = "EVENT_AIM_STATE_CHANGE";
    EventDef[EventDef["EVENT_ROOM_LIST_CHANGE"] = 15] = "EVENT_ROOM_LIST_CHANGE";
    EventDef[EventDef["EVENT_JOIN_ROOM"] = 16] = "EVENT_JOIN_ROOM";
    EventDef[EventDef["EVENT_UPDATE_ROOM"] = 17] = "EVENT_UPDATE_ROOM";
    EventDef[EventDef["EVENT_CAMERA_LATE_UPDATE"] = 18] = "EVENT_CAMERA_LATE_UPDATE";
    EventDef[EventDef["EVENT_CLIENT_STATE"] = 19] = "EVENT_CLIENT_STATE";
    EventDef[EventDef["EVENT_KILLING_INFO"] = 20] = "EVENT_KILLING_INFO";
})(EventDef || (EventDef = {}));
//# sourceMappingURL=EventDef.js.map