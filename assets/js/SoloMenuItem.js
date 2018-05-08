function SoloMenuItem(sceneManager) {
    MainMenuItem.call(this, sceneManager);
    this.setName("1v1 Ranked Solo");
}

SoloMenuItem.subclass(MainMenuItem);

SoloMenuItem.prototype.execute = function () {
    this._sceneManager.toPvPGameScene("solo", GlobalConfigurations.STAGE);
};
