function Bullet(x, y, direction) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = direction;
    this.mapBlocks = rendered.getBlocks(1);
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
    if (this.hitObstacles() == 0) {
        this.x = components.newPosX();
        this.y = components.newPosY();
        this.hitBorder();
    } else return;
};

Bullet.prototype.hitObstacles = function () {
    var left = this.x;
    var up = this.y;
    var down = this.y + define._sizebullet;
    var right = this.x + define._sizebullet;
    for (var i=0;i<this.mapBlocks.length;i++) {
        switch (this.direction) {
            case "up":
                if ((up < this.mapBlocks[i].d && up > this.mapBlocks[i].u ) && (left < this.mapBlocks[i].r - define._smooth && right > this.mapBlocks[i].l + define._smooth) && rendered.getActive(i)) {
                    rendered.deActive(i);
                    this.disappear(this.mapBlocks[i].l, this.mapBlocks[i].u, myGameArea.ctx, this.direction);
                    return 1;
                }
                break;
            case "down":
                if ((down > this.mapBlocks[i].u && down < this.mapBlocks[i].d) && (left < this.mapBlocks[i].r - define._smooth && right > this.mapBlocks[i].l + define._smooth) && rendered.getActive(i)) {
                    rendered.deActive(i);
                    this.disappear(this.mapBlocks[i].l, this.mapBlocks[i].u, myGameArea.ctx, this.direction);
                    return 1;
                }
                break;
            case "left":
                if ((left < this.mapBlocks[i].r + 1 && left > this.mapBlocks[i].l) && (up < this.mapBlocks[i].d - define._smooth && down > this.mapBlocks[i].u + define._smooth) && rendered.getActive(i)) {
                    rendered.deActive(i);
                    this.disappear(this.mapBlocks[i].l, this.mapBlocks[i].u, myGameArea.ctx, this.direction);
                    return 1;
                }
                break;
            case "right":
                if ((right > this.mapBlocks[i].l - 1 && right < this.mapBlocks[i].r) && (up < this.mapBlocks[i].d - define._smooth && down > this.mapBlocks[i].u + define._smooth) && rendered.getActive(i)) {
                    rendered.deActive(i);
                    this.disappear(this.mapBlocks[i].l, this.mapBlocks[i].u, myGameArea.ctx, this.direction);
                    return 1;
                }
                break;
        }
    }
    return 0;
};

Bullet.prototype.disappear = function (x, y, ctx, dir) {
    ctx.fillStyle = "black";
    switch (dir) {
        case "up":
            ctx.fillRect(x, y + define._sizeblock / 2, define._sizeblock, define._sizeblock / 2);
            break;
        case "down":
            ctx.fillRect(x, y, define._sizeblock, define._sizeblock / 2);
            break;
        case "left":
            ctx.fillRect(x + define._sizeblock / 2, y, define._sizeblock / 2, define._sizeblock);
            break;
        case "right":
            ctx.fillRect(x, y, define._sizeblock / 2, define._sizeblock);
            break;
    }
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