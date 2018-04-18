function DuoMenuItem(sceneManager) {
    MainMenuItem.call(this, sceneManager);
    this.setName("2v2 Ranked Duo (constructing)");
}

DuoMenuItem.subclass(MainMenuItem);

DuoMenuItem.prototype.execute = function () {
    this._sceneManager.toGameScene();
};
