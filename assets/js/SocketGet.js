importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');
importScripts('Firebase.js');


firebase.initializeApp(config);
let s, f;

onmessage = function (m) {
    if (m.data[0] == 'Socket.Event.SPAWN_ENEMY') {
        console.log("spawn enemy success");
    } else if (m.data[0] == 'Socket.Event.GET_ENEMY') {
        if (s == undefined) {
            s = new SocketGet();
            f = new Firebase("pikachu", firebase.database());
            f.fireGet("tank","d");
        }
        postMessage(s.getEnemyPosition());
    }
};



function SocketGet() {
}

SocketGet.prototype.getEnemyPosition = function () {
    let ret = f.getData() === undefined ? [0,0,"down"] : f.getData();
    let data = {
        x: ret[0],
        y: ret[1],
        direction: ret[2]
    };
    return JSON.stringify(data);
};

SocketGet.prototype.legacyGetEnemyPosition = function () {
    let data = {
        x: Math.floor(Math.random()*(400-10+1)+10),
        y: Math.floor(Math.random()*(400-10+1)+10),
        direction: "down"
    };
    return JSON.stringify(data);
};

