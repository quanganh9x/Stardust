function BulletFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.SHOOT]);
}

BulletFactory.prototype.getType = function () {
    return this._eventManager.getType();
};
/*
BulletFactory.prototype.getPostWorker = function () {
    return this._eventManager.getSocketPostInstance();
};

BulletFactory.prototype.getGetWorker = function () {
    return this._eventManager.getSocketGetInstance();
};
*/

BulletFactory.prototype.notify = function (event) {
  if (event.name == Tank.Event.SHOOT) {
    this.createBullet(event.tank);
    if (this.getType() == "solo" && event.tank.isPlayer()) {
        this._eventManager.logEvent('Socket.Notification.TANK_SHOOT');
    }
  }
};

BulletFactory.prototype.createBullet = function (tank) {
  var bullet = new Bullet(this._eventManager, tank);
  bullet.setPosition(this._getBulletPosition(tank));
  bullet.setDimensions(tank.getBulletSize(), tank.getBulletSize());
  bullet.setDirection(tank.getDirection());
  bullet.setSpeed(tank.getBulletSpeed());
  bullet.setType(tank.getBulletType());
  
  if (tank.isPlayer()) {
    SoundManager.play("bullet_shot");
  }
  return bullet;
};

BulletFactory.prototype._getBulletPosition = function (tank) {
  var x, y;
  var direction = tank.getDirection();
  
  if (direction == Sprite.Direction.RIGHT) {
    x = tank.getRight() - 1;
    y = tank.getTop() + tank.getHeight() / 2 - tank.getBulletSize() / 2;
  }
  else if (direction == Sprite.Direction.LEFT) {
    x = tank.getLeft() + 1;
    y = tank.getTop() + tank.getHeight() / 2 - tank.getBulletSize() / 2;
  }
  else if (direction == Sprite.Direction.UP) {
    x = tank.getLeft() + tank.getWidth() / 2 - tank.getBulletSize() / 2;
    y = tank.getTop() + 1;
  }
  else if (direction == Sprite.Direction.DOWN) {
    x = tank.getLeft() + tank.getWidth() / 2 - tank.getBulletSize() / 2;
    y = tank.getBottom() - 1;
  }
  
  return new Point(x, y);
};
