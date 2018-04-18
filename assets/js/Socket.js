var s = new Socket();
Socket.Event = {};
Socket.Event.SPAWN = 'Socket.Event.SPAWN';
Socket.Event.RESPAWN = 'Socket.Event.RESPAWN';
Socket.Event.POST_PLAYER = 'Socket.Event.POST_PLAYER';
Socket.Event.GET_ENEMY = 'Socket.Event.GET_ENEMY';

onmessage = function (m) {
    if (m.data[0] == Socket.Event.SPAWN) {
        console.log("spawn success");
    } else if (m.data[0] ==  Socket.Event.POST_PLAYER) {
        s.setTank(JSON.parse(m.data[1]));
        s.post();
    }
};



function Socket() {
}

Socket.prototype.setTank = function (tank) {
    this._tank = tank;
};
Socket.prototype.getTankX = function () {
    return this._tank.x;
};
Socket.prototype.getTankY = function () {
    return this._tank.y;
};
Socket.prototype.getTankDirection = function () {
    return this._tank.direction;
};


Socket.prototype.post = function () {

};


