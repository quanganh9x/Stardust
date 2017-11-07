function sceneManager() {
}

sceneManager.prototype.init = function () {
    this._myGameArea = document.createElement("canvas");
    this._myGameArea.width = define.unit*16;
    this._myGameArea.height = define.unit*14;
    this.ctx = this._myGameArea.getContext("2d");
    document.getElementById("gamezone").insertBefore(this._myGameArea, document.getElementById("gamezone").firstChild);
    this.draw("main");
};

sceneManager.prototype.welcome = function () {
    this._welcomeArea = document.createElement("canvas");
    this._welcomeArea.width = define.unit*16;
    this._welcomeArea.height = define.unit*14;
    this._welcomeArea.ctx = this._welcomeArea.getContext("2d");
    document.body.insertBefore(this._welcomeArea, document.body.childNodes[1]);
    this.draw("loading");
};

sceneManager.prototype.win = function () {

};

sceneManager.prototype.lose = function () {

};

sceneManager.prototype.draw = function(type) {
    var setThis = this;
    switch (type) {
        case "main":
            this.ctx.drawImage(cache.renderedCanvas(), 0, 0);
            break;
        case "loading":
            var progress = imgRender.getLoadingProgress();
            var hash = "Y2FjaGVkPTE=";
            setInterval(function () {
                setThis._welcomeArea.ctx.fillText("Loading: " + progress + "% completed", 0, 0);
            }, 1000 / FPS);
            document.cookie = hash;
            break;
    }
};

sceneManager.prototype.clear = function (x, y, m, n) {
    this.ctx.clearRect(x, y, m, n);
};

sceneManager.prototype.loop = function () {
    setInterval(function() {
        requestAnimationFrame(function() {
            game.updateBrokenBlocks(myGameArea.ctx);
            multi.p2.updatePlayer();
            multi.p2.updateBullet();
            game.updateGameArea();
            game.updateBullet();
        } );
    }, 1000 / FPS);
};