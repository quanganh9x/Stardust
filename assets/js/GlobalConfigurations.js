GlobalConfigurations = {};

GlobalConfigurations.PLAYER = "cookie";
GlobalConfigurations.ENEMY = "cookie";
GlobalConfigurations.STARTING_POINT = new Point(96,400);
GlobalConfigurations.USE_STARTING_POINT = false;
GlobalConfigurations.ROOM_CODE = 69;
GlobalConfigurations.STAGE = 4;
GlobalConfigurations.EVENT_LOG = [];

function setDebugP1() {
    GlobalConfigurations.ENEMY = "cookie2";
}

function setDebugP2() {
    GlobalConfigurations.PLAYER = "cookie2";
    GlobalConfigurations.USE_STARTING_POINT = true;
}