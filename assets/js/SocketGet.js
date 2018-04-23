let s;

onmessage = function (m) {
    if (m.data[0] == 'Socket.Event.SPAWN_ENEMY') {
        console.log("spawn enemy success");
    } else if (m.data[0] == 'Socket.Event.GET_ENEMY') {
        if (s == undefined) s = new SocketGet();
        postMessage(s.getEnemyPosition());
    }
};



function SocketGet() {
}

SocketGet.prototype.getEnemyPosition = function () {
    let data = {
        x: Math.floor(Math.random()*(200-10+1)+10),
        y: Math.floor(Math.random()*(200-10+1)+10),
        direction: "down"
    };
    return JSON.stringify(data);
};

