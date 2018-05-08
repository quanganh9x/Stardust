/*
Web Workers implemented by quanganh9x
Works best on Firefox (Gecko) and Chrome (Chromium)
Basic support for Safari of macOS > 10.9 Mavericks and iOS > 8.0, recommend highest WebKit version available
Stop thinking abt playing this game on IE < 6 and Firefox < 22
 */

importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-database.js');
importScripts('FirebaseConfig.js');
importScripts('FirebaseGet.js');
'use strict';
let s, f, r, p, e;

onmessage = function (m) {
    let event = m.data[0];
    switch (event) {
        case 'Socket.Event.SPAWN_ENEMY':
            console.log("spawn enemy success");
            s = new SocketGet();
            r = m.data[1][0];
            p = m.data[1][1];
            e = m.data[1][2];
            f = new FirebaseGet(r, 'quanganh9x', p, e);
            f.fireGet();
            break;
        case 'Socket.Event.GET_ENEMY':
            postMessage(s.getEnemyPosition());
            //postMessage(s.testGetEnemyPosition());
            break;
        case 'Socket.Event.SHOT':
            f.doneEvent("bullet");
            break;
    }
};



function SocketGet() {
}

SocketGet.prototype.getEnemyPosition = function () {
    let ret = f.getTank() === undefined ? [0,0,"down"] : f.getTank();
    return ret;
};

SocketGet.prototype.getEnemyEvent = function () {

};
/*
SocketGet.prototype.testGetEnemyPosition = function () {
    let data = [
        Math.floor(Math.random()*(400-10+1)+10),
        Math.floor(Math.random()*(400-10+1)+10),
        "down"
    ];
    return data;
};*/

