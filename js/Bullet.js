function Bullet(x, y, direction) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = direction;
    this.mapBlocks = rendered.getBlocks();
}


Bullet.prototype.init = function () {
    loaded.Bullet = true;
    switch (this.direction) {
        case "up":
            this.x = this.x + (define._sizetank/2) - (define._sizebullet/2);
            this.y = this.y + define._sizetank/2;
            this.speedY = -bulletSpeed;
            break;
        case "down":
            this.x = this.x + (define._sizetank/2) - (define._sizebullet/2);
            this.y = this.y - define._sizetank/2;
            this.speedY = bulletSpeed;
            break;
        case "left":
            this.x = this.x + define._sizetank/2;
            this.y = this.y + (define._sizetank/2) - (define._sizebullet/2);
            this.speedX = -bulletSpeed;
            break;
        case "right":
            this.x = this.x + define._sizetank/2;
            this.y = this.y + (define._sizetank/2) - (define._sizebullet/2);
            this.speedX = bulletSpeed;
            break;
    }
    firebasePort.writeData("bullet");
};

Bullet.prototype.newPos = function () {
    var components = new coreComponents(this.x, this.y, this.speedX, this.speedY);
    switch (this.hitObjects()) {
        case "tankcollapsed":
            console.log("boom");
            break;
        case "basecollapsed":
            console.log("boommmmm");
            break;
    }
    if (!this.hitObstacles()) {
        this.x = components.newPosX();
        this.y = components.newPosY();
        this.hitBorder();
    } else return;
};


Bullet.prototype.hitObjects = function() {
    var basex = rendered._construct.base[0].x;
    var basey = rendered._construct.base[0].y;
    var tankx = firebasePort.fetchData("tank", "", "x");
    var tanky = firebasePort.fetchData("tank", "", "y");
    if (this.x > basex && this.x + define._sizebullet < basex + define._sizetank && this.y > basey && this.y + define._sizebullet < basey + define._sizetank) return "basecollapsed";
    if (this.x > tankx && this.x + define._sizebullet < tankx + define._sizetank && this.y > tanky && this.y + define._sizebullet < tanky + define._sizetank) return "tankcollapsed";
    return false;
};

Bullet.prototype.hitObstacles = function () {
    var obs = false, broken = false;
    var left = this.x;
    var up = this.y;
    var down = this.y + define._sizebullet;
    var right = this.x + define._sizebullet;
    for (var i=0;i<this.mapBlocks.length;i++) {
        switch (this.direction) {
            case "up":
                if ((up < this.mapBlocks[i].d && up > this.mapBlocks[i].u ) && (left < this.mapBlocks[i].r && right > this.mapBlocks[i].l) && !this.checkThrownOut(i)) {
                    obs = true;
                    if (!this.checkBroken(i)) rendered.deActive(this.mapBlocks[i].l, this.mapBlocks[i].u + define._sizeblock / 2, define._sizeblock, define._sizeblock / 2, "up", i);
                    else {
                        rendered.deActive(this.mapBlocks[i].l, this.mapBlocks[i].u, define._sizeblock, define._sizeblock / 2, "down", i);
                        rendered.throwOut(i);
                    }
                }
                break;
            case "down":
                if ((down > this.mapBlocks[i].u && down < this.mapBlocks[i].d) && (left < this.mapBlocks[i].r && right > this.mapBlocks[i].l) && !this.checkThrownOut(i)) {
                    obs = true;
                    if (!this.checkBroken(i)) rendered.deActive(this.mapBlocks[i].l, this.mapBlocks[i].u, define._sizeblock, define._sizeblock / 2, "down", i);
                    else {
                        rendered.deActive(this.mapBlocks[i].l, this.mapBlocks[i].u + define._sizeblock / 2, define._sizeblock, define._sizeblock / 2, "down", i);
                        rendered.throwOut(i);
                    }
                }
                break;
            case "left":
                if ((left < this.mapBlocks[i].r && left > this.mapBlocks[i].l) && (up < this.mapBlocks[i].d && down > this.mapBlocks[i].u) && !this.checkThrownOut(i)) {
                    obs = true;
                    if (!this.checkBroken(i)) rendered.deActive(this.mapBlocks[i].l + define._sizeblock / 2, this.mapBlocks[i].u, define._sizeblock / 2, define._sizeblock, "left", i);
                    else {
                        rendered.deActive(this.mapBlocks[i].l, this.mapBlocks[i].u, define._sizeblock / 2, define._sizeblock, "left", i);
                        rendered.throwOut(i);
                    }
                }
                break;
            case "right":
                if ((right > this.mapBlocks[i].l && right < this.mapBlocks[i].r) && (up < this.mapBlocks[i].d && down > this.mapBlocks[i].u) && !this.checkThrownOut(i)) {
                    obs = true;
                    if (!this.checkBroken(i)) rendered.deActive(this.mapBlocks[i].l, this.mapBlocks[i].u, define._sizeblock / 2, define._sizeblock, "right", i);
                    else {
                        rendered.deActive(this.mapBlocks[i].l + define._sizeblock / 2, this.mapBlocks[i].u, define._sizeblock / 2, define._sizeblock, "right", i);
                        rendered.throwOut(i); // goodbye my block-friend
                    }
                }
                break;
        }
    }
    if (obs && !broken) return true;
    return false;
};

Bullet.prototype.checkBroken = function (i) {//
    var brokenTiles = rendered.getBrokenTiles();
    for (j=0;j<brokenTiles.length;j++) if (brokenTiles[j].i == i) return true;
    return false;
};

Bullet.prototype.checkThrownOut = function (i) {
    if (this.mapBlocks[i].status == 1) return false;
    return true;
};

Bullet.prototype.hitBorder = function () {
    var heightBorder = myGameArea._myGameArea.height - define._sizebullet - 16;
    var widthBorder = myGameArea._myGameArea.width - define._sizebullet - 32*2;
    if (this.x - define._sizebullet < 32 || this.x + define._sizebullet > widthBorder || this.y - define._sizebullet < 16 || this.y + define._sizebullet > heightBorder) return true;
    return false;
};
Bullet.prototype.draw = function (ctx) {
    ctx.drawImage(imgRender.getImage(this.direction, "bullet"), this.x, this.y, define._sizebullet, define._sizebullet);
};