function Tank(x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.direction = "up";
    this.hasAlreadyShot = false;
    this.life = 3;
    this.Event = {};
}

Tank.prototype.event = function () {

};

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
        firebasePort.writeShotStatus("fired");
        var setThis = this; // hotfix for settimeout() function
        setTimeout(function () {
            setThis.hasAlreadyShot = false;
            firebasePort.writeShotStatus("clear");
        }, 2000);
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
    this.x = components.newPosX();
    this.y = components.newPosY();
    this.hitBorder();
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