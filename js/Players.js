function Multiplayer() {
    this.p2 = new Player02();
}

function Player02() {
}

Player02.prototype.updatePlayer = function () {
    myGamePiece2 = new Tank(firebasePort.readTankData()[0], firebasePort.readTankData()[1]);
    myGamePiece2.direction = firebasePort.readTankData()[2];
    myGameArea.clear(myGamePiece2.x, myGamePiece2.y, define._sizetank, define._sizetank);
    myGamePiece2.draw(myGameArea.ctx);
};

Player02.prototype.updateBullet = function () {

}