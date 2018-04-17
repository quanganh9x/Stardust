function Socket() {

}

Socket.prototype.init = function(type, mode, data) {
    this._type = type;
    this._mode = mode;
    this._data = data;
    database.goOnline();
};

Socket.prototype.define = function (user) {
    this.user = user;
};
Socket.prototype.check = function(path) {
    if (data !== 'undefined') return true;
    return false;
};

Socket.prototype.write = function () {

};