function gameStatus() {
}

gameStatus.prototype.updateGameArea = function() {
    if (!loaded.Tank) {
        myGamePiece = new Tank(50, 32 * 12.5);
        myGamePiece.init();
    }
    else {
        myGameArea.clear(myGamePiece.x, myGamePiece.y, define._sizetank, define._sizetank);
        myGamePiece.newPos();
    }
    firebasePort.writeData("tank");
    myGamePiece.draw(myGameArea.ctx);
};

gameStatus.prototype.updateBullet = function() {
    if (loaded.Bullet && myGamePiece.hasAlreadyShot) {
        myGameArea.clear(bulletTraject.x, bulletTraject.y, define._sizebullet, define._sizebullet);
        bulletTraject.newPos();
        if (bulletTraject.hitBorder()) {
            myGameArea.clear(bulletTraject.x, bulletTraject.y, define._sizebullet, define._sizebullet);
            loaded.Bullet = false;
        }
        else bulletTraject.draw(myGameArea.ctx);
    } else myGameArea.draw("main");
};