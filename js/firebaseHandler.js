function firebaseHandler(data) {
    this._firebaseData = data;
    this._players = 2;
    this._status = 1;
    this._userId = "quanganh9x";
    this._guestId = "test";
    this._written = false;
}

/*
types: x, y, d, life (tank)


 */

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
    if (this._userId != "" && this._guestId != "") {
        this._status = 1;
        var mode = document.getElementById("mode");
        mode.innerHTML = "<b><color='red'>Online</color></b>";
    }
};
// use for joining 2 players
firebaseHandler.prototype.writeData = function (type) {
    var db = this._firebaseData.ref("players/" + this._userId + "/" + type);
    if (this.status == 1) {
        switch (type) {
            case "tank":
                db.set({
                    life: myGamePiece.life,
                    x: myGamePiece.x,
                    y: myGamePiece.y,
                    d: myGamePiece.direction
                });
                break;
            case "bullet":
                var trajectdb = db + "/" + "traject";
                trajectdb.set({
                    sx: bulletTraject.speedX,
                    sy: bulletTraject.speedY
                });
                db.set({
                    x: bulletTraject.x,
                    y: bulletTraject.y,
                    d: bulletTraject.direction
                });
                db.set({
                    fired: "yes"
                });
                setTimeout(function () {
                    db.set({
                        fired: "no"
                    });}, bulletWait);
                break;
        }
    }
};
firebaseHandler.prototype.fetchData = function (type, value, retVal) {
    var val;
    var db = this._firebaseData.ref("players/" + this._guestId + "/" + type);
    if (this.status == 1) {
        switch (type) {
            case "tank":
                var tankdb = db + "/" + retVal; /// x, y, d, life
                tankdb.on('value', function (snapshot) {
                    val = snapshot.val();
                    return val;
                });
                return 0;
                break;
            case "bullet":
                switch (value) {
                    case "shotdata":
                        var bulletdb = db + "/" + retVal; /// x, y, d
                        bulletdb.on('value', function (snapshot) {
                            val = snapshot.val();
                            return val;
                        });
                        break;
                    case "traject":
                        var trajectdb = db + "/" + value + "/" + retVal; // sx, sy
                        trajectdb.on('value', function (snapshot) {
                            val = snapshot.val();
                            return val;
                        });
                        break;
                    case "shotstatus":
                        var bulletdb = db + "/" + "fired"; //// fired
                        bulletdb.on('value', function (snapshot) {
                            val = snapshot.val();
                            return val;
                        });
                        break;
                }
                break;
        }
    }
};

firebaseHandler.prototype.readBulletStatus = function () {
    var data;
    if (this._status == 1) {
        var saveStatus = this._firebaseData.ref('players/' + this._guestId + '/bullet/fired');
        saveStatus.on('value', function(snapshot) {
            data = snapshot.val();
        });
    }
    return data;
};