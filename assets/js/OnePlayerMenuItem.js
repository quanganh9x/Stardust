function OnePlayerMenuItem(sceneManager) {
  MainMenuItem.call(this, sceneManager);
  this.setName("PvE");
}

OnePlayerMenuItem.subclass(MainMenuItem);

OnePlayerMenuItem.prototype.execute = function () {
  this._sceneManager.toGameScene();
};
