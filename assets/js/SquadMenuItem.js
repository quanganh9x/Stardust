function SquadMenuItem(sceneManager) {
    MainMenuItem.call(this, sceneManager);
    this.setName("4v4 PvP (constructing)");
}

SquadMenuItem.subclass(MainMenuItem);

SquadMenuItem.prototype.execute = function () {
    this._sceneManager.toPvPGameScene("squad");
};
