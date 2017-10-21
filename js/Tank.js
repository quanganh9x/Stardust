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
}


Tank.prototype.mapInit = function () {
    var rendered = new mapRender();
    rendered.getMap(1);
    this.mapBlocks = rendered.getBlocks(1);
};

Tank.prototype.init = function () {
    loaded.Tank = true;
    this.move();
    this.mapInit();
};

Tank.prototype.draw = function (ctx) {
    ctx.drawImage(imgRender.getImage(this.direction,"tank"), this.x, this.y, define._sizetank, define._sizetank);
};

Tank.prototype.shot = function () {
    if (!this.hasAlreadyShot) {
        this.hasAlreadyShot = true;
        firebasePort.writeShotStatus("fired");
        var setThis = this; // hotfix for settimeout() function
        setTimeout(function () {
            setThis.hasAlreadyShot = false;
        },1000);
        setTimeout(function () {
            firebasePort.writeShotStatus("clear");
        },1500);
        bulletTraject = new Bullet(this.x, this.y, this.direction);
        firebasePort.writeData("bullet");
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
    if (this.hitObstacles() == 0) {
        this.x = components.newPosX();
        this.y = components.newPosY();
        this.hitBorder();
    } else return;
};

Tank.prototype.hitObstacles = function () {
    var left = this.x;
    var up = this.y;
    var down = this.y + define._sizetank;
    var right = this.x + define._sizetank;
    for (var i=0;i<this.mapBlocks.length;i++) {
        switch (this.direction) {
            case "up":
                if ((up < this.mapBlocks[i].d && up > this.mapBlocks[i].u) && (left < this.mapBlocks[i].r - define._smooth && right > this.mapBlocks[i].l + define._smooth)) {
                    this.y = this.mapBlocks[i].d;
                    this.clearMove();
                    return 1;
                }
                break;
            case "down":
                if ((down > this.mapBlocks[i].u && down < this.mapBlocks[i].d) && (left < this.mapBlocks[i].r - define._smooth && right > this.mapBlocks[i].l + define._smooth)) {
                    this.y = this.mapBlocks[i].u - define._sizetank;
                    this.clearMove();
                    return 1;
                }
                break;
            case "left":
                if ((left < this.mapBlocks[i].r + 1 && (left + define._sizetank) >= this.mapBlocks[i].r) && (up < this.mapBlocks[i].d - define._smooth && down > this.mapBlocks[i].u + define._smooth)) {
                    this.x = this.mapBlocks[i].r;
                    this.clearMove();

                    return 1;
                }
                break;
            case "right":
                if ((right > this.mapBlocks[i].l - 1 && right < this.mapBlocks[i].r) && (up < this.mapBlocks[i].d - define._smooth && down > this.mapBlocks[i].u + define._smooth)) {
                    this.x = this.mapBlocks[i].l - define._sizetank;
                    this.clearMove();
                    return 1;
                }
                break;
        }
    }
    return 0;
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