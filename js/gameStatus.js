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
        if (bulletTraject.hitBorder() || bulletTraject.hitObstacles() == 1) {
            myGameArea.clear(bulletTraject.x, bulletTraject.y, define._sizebullet, define._sizebullet);
            loaded.Bullet = false;
        }
        else bulletTraject.draw(myGameArea.ctx);
    }
};
gameStatus.prototype.updateBrokenBlocks = function (ctx) {
    myGameArea.draw("main");
    ctx.fillStyle = "black";
    for (i=0;i<rendered.getBrokenTiles().length;i++) {
                ctx.fillRect(rendered.getBrokenTiles()[i].x, rendered.getBrokenTiles()[i].y, rendered.getBrokenTiles()[i].m, rendered.getBrokenTiles()[i].n);
    }
};