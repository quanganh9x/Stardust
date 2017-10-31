function Multiplayer() {
    this.p2 = new Player02();
}

function Player02() {
}

Player02.prototype.updatePlayer = function () {
    if (!loaded.Tank2 && firebasePort.status() == 1) {
        myGamePiece2 = new Tank(firebasePort.fetchData("tank", "", "x"), firebasePort.fetchData("tank", "", "y"));
        myGamePiece2.direction = firebasePort.fetchData("tank", "", "d");
    } else {
        myGameArea.clear(myGamePiece2.x, myGamePiece2.y, define._sizetank, define._sizetank);
        myGamePiece2.draw(myGameArea.ctx);
    }
};

Player02.prototype.updateBullet = function () {
    if (firebasePort.fetchData("bullet", "shotstatus", "fired") == "true") {
        if (!loaded.Bullet2) {
            bulletTraject2 = new Bullet(firebasePort.fetchData("bullet", "shotdata", "x"), firebasePort.fetchData("bullet", "shotdata", "y"));
            bulletTraject2.direction = firebasePort.fetchData("bullet", "shotdata", "d");
        } else {
            myGameArea.clear(bulletTraject2.x, bulletTraject2.y, define._sizebullet, define._sizebullet);
            bulletTraject2.draw(myGameArea.ctx);
        }
    }
};