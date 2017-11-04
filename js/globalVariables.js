var define = {
    unit: 32,
    tile: 16,
    _sizeblock: 16,
    _sizetank: 32,
    _sizebullet: 8,
    _smooth: 1
};

var loaded = {
    Tank: false,
    Tank2: false,
    Bullet: false,
    Bullet2: false
};

var bulletWait = 1500; // 2s / shot. Will implement a modifier in later version
var bulletSpeed = 3;
var FPS = 60;

var myGamePiece, myGamePiece2;
var bulletTraject, bulletTraject2;
