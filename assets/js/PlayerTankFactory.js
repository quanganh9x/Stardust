function PlayerTankFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [TankExplosion.Event.DESTROYED]);
  this._appearPosition = new Point(0, 0);
  this._active = true;
}

PlayerTankFactory.Event = {};
PlayerTankFactory.Event.PLAYER_TANK_CREATED = 'PlayerTankFactory.Event.PLAYER_TANK_CREATED';

PlayerTankFactory.prototype.notify = function (event) {
  if (!this._active) {
    return;
  }
  if (this._tankExplosionDestroyed(event)) {
      this.create();
  }
};

PlayerTankFactory.prototype.setAppearPosition = function (position) {
  this._appearPosition = position;
};

PlayerTankFactory.prototype.getType = function () {
    return this._eventManager.getType();
};

PlayerTankFactory.prototype.getWorker = function () {
    return this._eventManager.getSocketPostInstance();
};

PlayerTankFactory.prototype.create = function () {
    var tank = new Tank(this._eventManager);
    tank.setPosition(this._appearPosition);
    tank.setState(new TankStateAppearing(tank));
    if (this.getType() == "solo") {
        tank.setMulti();
        this.getWorker().postMessage(['Socket.Event.SPAWN_PLAYER', [GlobalConfigurations.ROOM_CODE, GlobalConfigurations.PLAYER, GlobalConfigurations.ENEMY]]);
        var data = {
            x: tank._x,
            y: tank._y,
            direction: "up",
            upgradeLevel: tank._upgradeLevel,
            hitLimit: tank._hitLimit,
            bulletsLimit: tank._bulletsLimit,
            normalSpeed: tank._normalSpeed
        };
        this.getWorker().postMessage(['Socket.Event.POST_PLAYER', JSON.stringify(data)]);
        this._eventManager.logEvent('Socket.Notification.TANK_READY');
    }
    this._eventManager.fireEvent({'name': PlayerTankFactory.Event.PLAYER_TANK_CREATED, 'tank': tank});

    return tank;
};

PlayerTankFactory.prototype.setActive = function (active) {
  this._active = active;
};

PlayerTankFactory.prototype._tankExplosionDestroyed = function (event) {
  if (event.name != TankExplosion.Event.DESTROYED) {
    return false;
  }
  var tank = event.explosion.getTank();
  if (!tank.isPlayer()) {
    return false;
  }
  if (this.getType() == "solo") this._eventManager.logEvent("Socket.Notification.IAM_LOSE");
  return true;
};
