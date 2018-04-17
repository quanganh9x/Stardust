function LoadingScene(sceneManager) {
  this._sceneManager = sceneManager;
  this._loadingProgress = 0;
}


LoadingScene.prototype.update = function () {
  var self = this;
  var wait = [500, 1000, 2000];
  this._loadingProgress = ImageManager.getLoadingProgress();
  if (this._loadingProgress == 100) {
      self._sceneManager.toMainMenuScene(false);
      document.getElementById("sptext").innerText = "";
      document.getElementById("play").innerText = "START";
  }
};

LoadingScene.prototype.draw = function (ctx) {
  document.getElementById("sptext").innerText = this._loadingProgress+" % completed";
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  //ctx.fillStyle = "#ffffff";
  //ctx.fillText("CACHING: " + ("" + this._loadingProgress).lpad(" ", 3) + "% COMPLETED", 0, 100);
};
