/*
Web Workers implemented by quanganh9x
Works best on Firefox (Gecko) and Chrome (Chromium)
Basic support for Safari of macOS > 10.9 Mavericks and iOS > 8.0, recommend highest WebKit version available
Stop thinking abt playing this game on IE < 6 and Firefox < 22
 */
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-database.js');
importScripts('FirebaseConfig.js');
importScripts('FirebasePost.js');
'use strict';
let s, f, r, p, e;

onmessage = function (m) {
    let event = m.data[0];
    if (event.includes("Socket.Notification")) {
        s.postEvent(event);
        return;
    }
    switch (event) {
        case 'Socket.Event.SPAWN_PLAYER':
            console.log("spawn success");
            s = new SocketPost();
            r = m.data[1][0];
            p = m.data[1][1];
            e = m.data[1][2];
            f = new FirebasePost(r, 'quanganh9x', p, e);
            f.wipe();
            break;
        case 'Socket.Event.POST_PLAYER':
            s.setData(JSON.parse(m.data[1]));
            s.post();
            break;
        case 'Socket.Event.LOG_TRANSFER':
            s.postLog(m.data[1]);
            break;
    }
};



function SocketPost() {
}

SocketPost.prototype.setData = function (data) {
    this._data = data;
};
SocketPost.prototype.getElement = function (e) {
    return this._data[e];
};
SocketPost.prototype.getData = function () {
    let data = [];
    let dataKeys = ["x", "y", "direction"]; //,"upgradeLevel","hitLimit", "bulletsLimit","normalSpeed"];
    for (let i=0; i<dataKeys.length; i++) {
        data.push(this.getElement(dataKeys[i]));
    }
    return data;
};

SocketPost.prototype.post = function () {
    f.firePost(this.getData());
};

SocketPost.prototype.postEvent = function (event) {
    f.fireEvent(event);
};

SocketPost.prototype.postLog = function (data) {
    f.logEvent(data);
};