function MultiEnemyFactory(eventManager) {
    this._eventManager = eventManager;
    this._eventManager.addSubscriber(this, [Points.Event.DESTROYED, TankExplosion.Event.DESTROYED]);

    this._pauseListener = new PauseListener(this._eventManager);

    this._position = new Point(19, 252);
    this._direction = "up";
}

MultiEnemyFactory.Event = {};
MultiEnemyFactory.Event.ENEMY_CREATED = 'MultiEnemyFactory.Event.ENEMY_CREATED';
MultiEnemyFactory.Event.ENEMY_DESTROYED = 'MultiEnemyFactory.Event.ENEMY_DESTROYED';

MultiEnemyFactory.prototype.setDirection = function (direction) {
    this._direction = direction;
};

MultiEnemyFactory.prototype.setPosition = function (position) {
    this._position = position;
};

MultiEnemyFactory.prototype.getPosition = function () {
    return this._position;
};

MultiEnemyFactory.prototype.getDirection = function () {
    return this._direction;
};

MultiEnemyFactory.prototype.getWorker = function () {
    return this._eventManager.getSocketGetInstance();
};

MultiEnemyFactory.prototype.update = function () {
    if (this._pauseListener.isPaused()) {
        return;
    }
    const self = this;
    this.getWorker().postMessage(['Socket.Event.GET_ENEMY']);
    this.getWorker().onmessage = function (response) {
        let data = JSON.parse(response.data);
        self.setPosition(new Point(data.x, data.y));
        self.setDirection(data.direction);
    };
    if (this.getPosition() !== undefined && this._tank == undefined) this.init();
    else this.createEnemy(this.getPosition(), this.getDirection());
};

MultiEnemyFactory.prototype.init = function () {
    this._tank = new Tank(this._eventManager);
    this._tank.setType(Tank.Type.BASIC);
    this._tank.makeEnemy();
};

MultiEnemyFactory.prototype.createEnemy = function (position, direction) {
    this._tank.setPosition(position);
    this._tank.setDirection(direction);
    //tank.setMoveFrequency(2);
    //tank.setTrackAnimationDuration(4);

    //this._eventManager.fireEvent({'name': MultiEnemyFactory.Event.ENEMY_CREATED, 'enemy': tank});

};


MultiEnemyFactory.prototype.notify = function (event) {
    if (event.name == TankExplosion.Event.DESTROYED) {
        if (event.explosion.getTank().isEnemy()) {
            this._eventManager.fireEvent({'name': MultiEnemyFactory.Event.ENEMY_DESTROYED});
        }
    }
};