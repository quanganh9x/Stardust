function MultiEnemyFactoryView(enemyFactory) {
    this._enemyFactory = enemyFactory;
}

MultiEnemyFactoryView.prototype.draw = function (ctx) {
    ctx.drawImage(ImageManager.getImage('enemy'), 465, 34);
};

