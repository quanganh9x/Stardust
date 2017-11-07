function Tank(x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.direction = "up";
    this.hasAlreadyShot = false;
    this.life = 3;
    this.mapBlocks = [];
    this.restrictUp = 0;
    this.restrictDown = 0;
    this.restrictLeft = 0;
    this.restrictRight = 0;
    this.mapBlocks = rendered.getBlocks();
}

Tank.prototype.init = function () {
    loaded.Tank = true;
    this.move();
};

Tank.prototype.draw = function (ctx) {
    ctx.drawImage(imgRender.getImage(this.direction,"tank"), this.x, this.y, define._sizetank, define._sizetank);
};

Tank.prototype.shot = function () {
    if (!this.hasAlreadyShot) {
        this.hasAlreadyShot = true;
        var setThis = this; // hotfix for settimeout() function
        bulletTraject = new Bullet(this.x, this.y, this.direction);
        setTimeout(function () {
            setThis.hasAlreadyShot = false;
            myGameArea.clear(bulletTraject.x, bulletTraject.y, define._sizebullet, define._sizebullet);
        },bulletWait);
        bulletTraject.init();
    }
};
Tank.prototype.move = function () {
    var setThis = this;
    window.addEventListener('keydown', function(event) {
        var keyPressed = event.keyCode;
        switch (keyPressed) {
            case 37:
                setThis.left();
                break;
            case 38:
                setThis.up();
                break;
            case 39:
                setThis.right();
                break;
            case 40:
                setThis.down();
                break;
            case 32:
                setThis.shot();
                break;
        }
    }, false);
    window.addEventListener('keyup', function(event) {
        var keyReleased = event.keyCode;
        if (keyReleased <= 40 && keyReleased >= 37)
            setThis.clearMove();
    }, false);
};

Tank.prototype.newPos = function () {
    var components = new coreComponents(this.x, this.y, this.speedX, this.speedY);
    if (this.hitObstacles() == 0 || this.checkBroken(components.newPosX(), components.newPosY())) {
        this.x = components.newPosX();
        this.y = components.newPosY();
        this.hitBorder();
    } else return;
};

Tank.prototype.hitObstacles = function () {
    var obs = false;
    var left = this.x;
    var up = this.y;
    var down = this.y + define._sizetank;
    var right = this.x + define._sizetank;
    for (var i=0;i<this.mapBlocks.length;i++) {
        switch (this.direction) {
            case "up":
                if ((up < this.mapBlocks[i].d && up > this.mapBlocks[i].u) && (left < this.mapBlocks[i].r - define._smooth && right > this.mapBlocks[i].l + define._smooth) && !this.checkThrownOut(i)) {
                    if (this.checkBroken(left, up + define._sizeblock / 2 - define._smooth)) this.y = this.mapBlocks[i].d - define._sizeblock / 2;
                    else this.y = this.mapBlocks[i].d;
                    this.clearMove();
                    obs = true;
                }
                break;
            case "down":
                if ((down > this.mapBlocks[i].u && down < this.mapBlocks[i].d) && (left < this.mapBlocks[i].r - define._smooth && right > this.mapBlocks[i].l + define._smooth) && !this.checkThrownOut(i)) {
                    if (this.checkBroken(left, up - define._sizeblock / 2 + define._smooth)) this.y = this.mapBlocks[i].u - define._sizetank + define._sizeblock / 2;
                    else this.y = this.mapBlocks[i].u - define._sizetank;
                    this.clearMove();
                    obs = true;
                }
                break;
            case "left":
                if ((left < this.mapBlocks[i].r && (left + define._sizetank) >= this.mapBlocks[i].r) && (up < this.mapBlocks[i].d - define._smooth && down > this.mapBlocks[i].u + define._smooth) && !this.checkThrownOut(i)) {
                    if (this.checkBroken(left + define._sizeblock / 2 - define._smooth, up)) this.x = this.mapBlocks[i].r - define._sizeblock / 2;
                    else this.x = this.mapBlocks[i].r;
                    this.clearMove();
                    obs = true;
                }
                break;
            case "right":
                if ((right > this.mapBlocks[i].l && right < this.mapBlocks[i].r) && (up < this.mapBlocks[i].d - define._smooth && down > this.mapBlocks[i].u + define._smooth) && !this.checkThrownOut(i)) {
                    if (this.checkBroken(left - define._sizeblock / 2 + define._smooth, up)) this.x = this.mapBlocks[i].l - define._sizetank + define._sizeblock / 2;
                    else this.x = this.mapBlocks[i].l - define._sizetank;
                    this.clearMove();
                    obs = true;
                }
                break;
        }
    }
    if (obs) return 1;
    return 0;
};

Tank.prototype.checkBroken = function(x, y) {
    var brokenTiles = rendered.getBrokenTiles();
    var onBrokenTile = false;
    var left = x;
    var up = y;
    var down = y + define._sizetank;
    var right = x + define._sizetank;
    for (j=0; j<brokenTiles.length; j++) {
        var u = brokenTiles[j].y;
        var d = brokenTiles[j].y + brokenTiles[j].n;
        var l = brokenTiles[j].x;
        var r = brokenTiles[j].x + brokenTiles[j].m;
        switch (this.direction) {
            case "up":
                if ((up < d && up > u) && (left < r && right > l)) onBrokenTile = true;
                break;
            case "down":
                if ((down > u && down < d) && (left < r && right > l)) onBrokenTile = true;
                break;
            case "left":
                if ((left < r && (left + define._sizetank) >= r) && (up < d && down > u)) onBrokenTile = true;
                break;
            case "right":
                if ((right > l && right < r) && (up < d && down > u)) onBrokenTile = true;
                break;
        }
    }
    return onBrokenTile;
};

Tank.prototype.checkThrownOut = function(i) {
    if (this.mapBlocks[i].status == 1) return false;
    return true;
};

Tank.prototype.hitBorder = function () {
    var heightBorder = myGameArea._myGameArea.height - define._sizetank - 16;
    var widthBorder = myGameArea._myGameArea.width - define._sizetank - 32*2;
    if (this.y < 16) this.y = 16;
    else if (this.y > heightBorder) this.y = heightBorder;
    if (this.x < 32) this.x = 32;
    else if (this.x > widthBorder) this.x = widthBorder;
};

Tank.prototype.up = function () {
        this.speedY = -1;
        this.direction = "up";
};
Tank.prototype.down = function () {
        this.speedY = 1;
        this.direction = "down";
};
Tank.prototype.left = function () {
        this.speedX = -1;
        this.direction = "left";
};
Tank.prototype.right = function () {
        this.speedX = 1;
        this.direction = "right";
};
Tank.prototype.clearMove = function () {
    this.speedX = 0;
    this.speedY = 0;
};