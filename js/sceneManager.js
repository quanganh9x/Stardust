function sceneManager() {
}

sceneManager.prototype.init = function () {
    this._myGameArea = document.createElement("canvas");
    this._myGameArea.width = define.unit*16;
    this._myGameArea.height = define.unit*14;
    this.ctx = this._myGameArea.getContext("2d");
    document.body.insertBefore(this._myGameArea, document.body.childNodes[1]);
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

sceneManager.prototype.draw = function(type) {
    switch (type) {
        case "main":
            this.ctx.drawImage(cache.renderedCanvas(), 0, 0);
            for
            break;
        case "loading":
            var progress = imgRender.getLoadingProgress();
            var hash = "Y2FjaGVkPTE=";
            this._welcomeArea.ctx.fillText("Loading: "+progress+"% completed",0, 0);
            console.log(this._welcomeArea.ctx);
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
            var game = new gameStatus();
            var multi = new Multiplayer();
            multi.p2.updatePlayer();
            game.updateGameArea();
            game.updateBullet();
        } );
    }, 1000 / FPS);
};