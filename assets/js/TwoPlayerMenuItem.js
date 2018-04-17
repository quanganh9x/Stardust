function SoloMenuItem(sceneManager) {
    MainMenuItem.call(this, sceneManager);
    this.setName("Solo (1v1)");
}

SoloMenuItem.subclass(MainMenuItem);

SoloMenuItem.prototype.execute = function () {
    this._sceneManager.toGameScene();
};
