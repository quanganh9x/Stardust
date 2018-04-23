let s;
onmessage = function (m) {
    if (m.data[0] == 'Socket.Event.SPAWN_PLAYER') {
        console.log("spawn success");
        s = new SocketPost();
    } else if (m.data[0] == 'Socket.Event.POST_PLAYER') {
        s.setData(JSON.parse(m.data[1]));
        s.post();
    }
};



function SocketPost() {
}

SocketPost.prototype.setData = function (data) {
    this._tank = data;
};
SocketPost.prototype.getData = function () {
    let data = {
        x: this._tank._x,
        y: this._tank._y,
        direction: this._tank._direction
    };
    return JSON.stringify(data);
};

SocketPost.prototype.post = function () {
    console.log(this.getData());
};

