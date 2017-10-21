function Bullet(x, y, direction) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = direction;
}

Bullet.prototype.init = function () {
    loaded.Bullet = true;
    switch (this.direction) {
        case "up":
            this.x = this.x + (define._sizetank/2) - (define._sizebullet/2);
            this.y = this.y - define._sizebullet;
            this.speedY = -7;
            break;
        case "down":
            this.x = this.x + (define._sizetank/2) - (define._sizebullet/2);
            this.y = this.y + define._sizetank;
            this.speedY = 7;
            break;
        case "left":
            this.x = this.x - define._sizebullet;
            this.y = this.y + (define._sizetank/2) - (define._sizebullet/2);
            this.speedX = -7;
            break;
        case "right":
            this.x = this.x + define._sizetank;
            this.y = this.y + (define._sizetank/2) - (define._sizebullet/2);
            this.speedX = 7;
            break;
    }
    firebasePort.writeBulletData();
};

Bullet.prototype.newPos = function () {
    var components = new coreComponents(this.x, this.y, this.speedX, this.speedY);
    this.x = components.newPosX();
    this.y = components.newPosY();
    this.hitBorder();
};

Bullet.prototype.hitBorder = function () {
    var heightBorder = myGameArea._myGameArea.height - define._sizebullet - 16;
    var widthBorder = myGameArea._myGameArea.width - define._sizebullet - 32*2;
    if (this.x < 32 || this.x > widthBorder || this.y < 16 || this.y > heightBorder) return true;
    return false;
};
Bullet.prototype.draw = function (ctx) {
    ctx.drawImage(imgRender.getImage(this.direction, "bullet"), this.x, this.y, define._sizebullet, define._sizebullet);
};