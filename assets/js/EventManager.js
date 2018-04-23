function EventManager() {
  this._subscribers = {};
}

EventManager.prototype.addSubscriber = function (subscriber, events) {
  for (var i in events) {
    if (!this._subscribers[events[i]]) {
      this._subscribers[events[i]] = [];
    }
    this._subscribers[events[i]].push(subscriber);
  }
};

EventManager.prototype.removeSubscriber = function (subscriber) {
  for (var i in this._subscribers) {
    for (var j in this._subscribers[i]) {
      if (this._subscribers[i][j] === subscriber) {
        this._subscribers[i].splice(j, 1);
      }
    }
  }
};

EventManager.prototype.removeAllSubscribers = function () {
  this._subscribers = {};
};

EventManager.prototype.fireEvent = function (event) {
  var subscribers = this._subscribers[event.name];
  for (var i in subscribers) {
    subscribers[i].notify(event);
  }
};

EventManager.prototype.initSocketInstance = function () {
    this._socket = new Socket();
};

EventManager.prototype.getSocketGetInstance = function () {
    return this._socket.getGetWorker();
};

EventManager.prototype.getSocketPostInstance = function () {
    return this._socket.getPostWorker();
};

EventManager.prototype.setType = function (type) {
    this._type = type;
    this.initSocketInstance();
    console.log("Attached type & workers - multiplayer mode");
};

EventManager.prototype.getType = function () {
    return this._type;
};

