importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');
importScripts('Firebase.js');


firebase.initializeApp(config);
let s, f;

onmessage = function (m) {
    if (m.data[0] == 'Socket.Event.SPAWN_PLAYER') {
        console.log("spawn success");
        s = new SocketPost();
        f = new Firebase("pikachu", firebase.database());
        console.log("rocket is on its way!")
    } else if (m.data[0] == 'Socket.Event.POST_PLAYER') {
        s.setData(JSON.parse(m.data[1]));
        s.startPost();
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
        d: this._tank._direction
    };
    return data;
};

SocketPost.prototype.startPost = function () {
    f.firePost("tank", this.getData());
};
