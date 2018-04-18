function SceneManager(eventManager) {
  this._eventManager = eventManager;
  this._scene = null;
}

SceneManager.prototype.setScene = function (scene) {
  this._scene = scene;
};

SceneManager.prototype.getScene = function () {
  return this._scene;
};

SceneManager.prototype.toLoadingScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new LoadingScene(this);
};

SceneManager.prototype.toMainMenuScene = function (arrived) {
  this._eventManager.removeAllSubscribers();
  this._scene = new MainMenuScene(this);
  
  if (arrived) {
    this._scene.nextMenuItem();
    this._scene.arrived();
  }
};

SceneManager.prototype.initWorker = function () {
    var w;
    if(typeof(Worker) !== "undefined") {
        if (typeof(w) == "undefined") {
            w = new Connection("assets/js/Socket.js").get();
            if (w !== undefined) {
                this._eventManager.setWorker(w);
                return w;
            }
        } else {
            console.log("Web Worker is not supported. FPS will be limited at 30. Otherwise PvP is not available :(");
            alert("Update your browser to enjoy the game at the fulliest! Current status: PvP -> unavailable, PvE -> available");
        }
    }
    return false;
};

SceneManager.prototype.toGameScene = function (stage, player) {
  this._eventManager.removeAllSubscribers();
  this._scene = new GameScene(this, stage, player);
};

SceneManager.prototype.toPvPGameScene = function (type, stage, player) {
    this._eventManager.removeAllSubscribers();
    console.log(type);
    if (type == "solo") {
        var w = this.initWorker();
        if (w) {
            this._scene = new MultiGameScene(this, type, 4, player);
        } else console.log("fuck, connection lost");
    } else alert("Constructing...");
};

SceneManager.prototype.toConstructionScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new Construction(this);
};

SceneManager.prototype.toStageStatisticsScene = function (stage, player, gameOver) {
  this._eventManager.removeAllSubscribers();
  this._scene = new StageStatisticsScene(this, stage, player, gameOver);
};

SceneManager.prototype.toGameOverScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new GameOverScene(this);
};

SceneManager.prototype.update = function () {
  this._scene.update();
};

SceneManager.prototype.draw = function (ctx) {
  this._scene.draw(ctx);
};

SceneManager.prototype.getEventManager = function () {
  return this._eventManager;
};
