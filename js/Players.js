function Multiplayer() {
    this.p2 = new Player02();
}

function Player02() {
}

Player02.prototype.updatePlayer = function () {
    if (loaded.Tank2) myGameArea.clear(myGamePiece2.x, myGamePiece2.y, define._sizetank, define._sizetank);
    if (firebasePort.status() == 1) {
        myGamePiece2 = new Tank(firebasePort.fetchData("tank", "", "x"), firebasePort.fetchData("tank", "", "y"));
        myGamePiece2.direction = firebasePort.fetchData("tank", "", "d");
        myGamePiece2.draw(myGameArea.ctx);
        loaded.Tank2 = true;
    }
};

Player02.prototype.updateBullet = function () {
    if (loaded.Bullet2) {
        bulletTraject2.newPos();
        if (bulletTraject2.hitBorder() || bulletTraject2.hitObstacles() == 1) {
            myGameArea.clear(bulletTraject2.x, bulletTraject2.y, define._sizebullet, define._sizebullet);
            loaded.Bullet2 = false;
        }
        else bulletTraject2.draw(myGameArea.ctx);
    }
    if (firebasePort.status() == 1 && firebasePort.fetchData("bullet", "shotstatus", "fired") == "yes") {
        bulletTraject2 = new Bullet(firebasePort.fetchData("bullet", "shotdata", "x"), firebasePort.fetchData("bullet", "shotdata", "y"), firebasePort.fetchData("bullet", "shotdata", "d"));
        console.log(firebasePort.fetchData("bullet", "shotdata", "x"));
        console.log(firebasePort.fetchData("bullet", "shotdata", "y"));
        console.log(firebasePort.fetchData("bullet", "shotdata", "d"));
        bulletTraject2.speedX = firebasePort.fetchData("bullet", "traject", "sx");
        bulletTraject2.speedY = firebasePort.fetchData("bullet", "traject", "sy");
        loaded.Bullet2 = true;
        bulletTraject2.draw(myGameArea.ctx);
    }
};