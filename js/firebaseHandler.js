function firebaseHandler(data) {
    this._firebaseData = data;
    this._players = 2;
    this._status = 0;
    this._userId = "";
    this._guestId = "";
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
    var db = "players/" + this._userId + "/" + type;
    var setThis = this;
    if (this.status() == 1) {
        switch (type) {
            case "tank":
                this._firebaseData.ref(db).set({
                    life: myGamePiece.life,
                    x: myGamePiece.x,
                    y: myGamePiece.y,
                    d: myGamePiece.direction
                });
                break;
            case "bullet":
                var trajectdb = db + "/" + "traject";
                this._firebaseData.ref(db).set({
                    x: bulletTraject.x,
                    y: bulletTraject.y,
                    d: bulletTraject.direction,
                    fired: "yes"
                });
                this._firebaseData.ref(trajectdb).set({
                    sx: bulletTraject.speedX,
                    sy: bulletTraject.speedY
                });
                setTimeout(function () {
                    setThis._firebaseData.ref(db).set({
                        fired: "no"
                    });}, bulletWait);
                break;
        }
    }
};
firebaseHandler.prototype.fetchData = function (type, value, retVal) {
    var current;
    var db = "players/" + this._guestId + "/" + type;
    if (this.status() == 1) {
        switch (type) {
            case "tank":
                var tankdb = db + "/" + retVal; /// x, y, d, life
                this._firebaseData.ref(tankdb).on('value', function (snapshot) {
                    current = snapshot.val();
                });
                break;
            case "bullet":
                switch (value) {
                    case "shotdata":
                        var bulletdb = db + "/" + retVal; /// x, y, d
                        this._firebaseData.ref(bulletdb).on('value', function (snapshot) {
                            current = snapshot.val();
                        });
                        break;
                    case "traject":
                        var trajectdb = db + "/" + value + "/" + retVal; // sx, sy
                        this._firebaseData.ref(trajectdb).on('value', function (snapshot) {
                            current = snapshot.val();
                        });
                        break;
                    case "shotstatus":
                        var bulletdb = db + "/" + "fired"; //// fired
                        this._firebaseData.ref(bulletdb).on('value', function (snapshot) {
                            current = snapshot.val();
                        });
                        break;
                }
                break;
        }
    }
    if (current) return current;
};