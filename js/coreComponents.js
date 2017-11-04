function coreComponents(x, y, speedX, speedY) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;
}

coreComponents.prototype.newPosX = function () {
    this.x += this.speedX;
    return this.x;
};
coreComponents.prototype.newPosY = function () {
    this.y += this.speedY;
    return this.y;
};

coreComponents.prototype.lose = function() {
    console.log("You lose. haha");
};