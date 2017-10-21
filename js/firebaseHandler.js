function firebaseHandler(data) {
    this._firebaseData = data;
    this._players = 2;
    this._status = 1;
    this._userId = "quanganh9x";
    this._guestId = "test";
    this._written = false;
}

firebaseHandler.prototype.config = function () {
    return this._config;
};

firebaseHandler.prototype.status = function () {
    return this._status;
};

firebaseHandler.prototype.written = function () {
    return this._written;
};

// user management
firebaseHandler.prototype.getUser = function () {
    this._userId = document.getElementById("user1").value;
    this._guestId = document.getElementById("user2").value;
    if (this._userId != "" && this._guestId != "") this._status = 1;
};
firebaseHandler.prototype.xssProtector = function () {

};

firebaseHandler.prototype.ddosProtector = function () {

};
// use for joining 2 players
firebaseHandler.prototype.writeData = function (type) {
    if (this._status == 1) {
        switch (type) {
            case "tank":
                this._firebaseData.ref("players/" + this._userId + "/tank").set({
                    life: myGamePiece.life,
                    x: myGamePiece.x,
                    y: myGamePiece.y,
                    d: myGamePiece.direction
                });
                break;
            case "bullet":
                this._firebaseData.ref("players/" + this._userId + "/bullet").set({
                    x: bulletTraject.x,
                    y: bulletTraject.y,
                    d: bulletTraject.direction
                });
                break;
        }
    }
};
firebaseHandler.prototype.writeBulletData = function () {
    if (this._status == 1) {
        this._firebaseData.ref("players/" + this._userId + "/bullet/traject").set({
            sx: bulletTraject.speedX,
            sy: bulletTraject.speedY
        });
        this._written = true;
    }
};
firebaseHandler.prototype.writeShotStatus = function (type) {
    switch (type) {
        case "fired":
            this._firebaseData.ref("players/" + this._userId + "/bullet").set({
                fired: "yes"
            });
            break;
        case "clear":
            this._firebaseData.ref("players/" + this._userId + "/bullet").set({
                fired: "no"
            });
            break;
    }
};
firebaseHandler.prototype.readTankData = function () {
    var dataGuest = [];
    if (this._written == true) {
        var saveLife = this._firebaseData.ref('players/' + guestId + '/tank/life');
        saveLife.on('value', function(snapshot) {
            dataGuest[3] = snapshot.val();
        });
        var saveX = this._firebaseData.ref('players/' + guestId + '/tank/x');
        saveX.on('value', function(snapshot) {
            dataGuest[0] = snapshot.val();
        });
        var saveY = this._firebaseData.ref('players/' + guestId + '/tank/y');
        saveY.on('value', function(snapshot) {
            dataGuest[1] = snapshot.val();
        });
        var saveDir = this._firebaseData.ref('players/' + guestId + '/tank/d');
        saveDir.on('value', function(snapshot) {
            dataGuest[2] = snapshot.val();
        });
    }
    return dataGuest;
};

firebaseHandler.prototype.readBulletData = function () {
    var dataGuest = [];
    if (this._status == 1) {
        var saveSpeedX = this._firebaseData.ref('players/' + guestId + '/bullet/traject/sx');
        saveSpeedX.on('value', function(snapshot) {
            dataGuest[3] = snapshot.val();
        });
        var saveSpeedY = this._firebaseData.ref('players/' + guestId + '/bullet/traject/sy');
        saveSpeedY.on('value', function(snapshot) {
            dataGuest[4] = snapshot.val();
        });
        var saveX = this._firebaseData.ref('players/' + guestId + '/bullet/x');
        saveX.on('value', function(snapshot) {
            dataGuest[0] = snapshot.val();
        });
        var saveY = this._firebaseData.ref('players/' + guestId + '/bullet/y');
        saveY.on('value', function(snapshot) {
            dataGuest[1] = snapshot.val();
        });
        var saveDir = this._firebaseData.ref('players/' + guestId + '/bullet/d');
        saveDir.on('value', function(snapshot) {
            dataGuest[2] = snapshot.val();
        });
    }
    return dataGuest;
};

firebaseHandler.prototype.readBulletStatus = function () {
    var data;
    var saveStatus = this._firebaseData.ref('players/' + guestId + '/bullet/fired');
    saveStatus.on('value', function(snapshot) {
        data = snapshot.val();
    });
    return data;
};