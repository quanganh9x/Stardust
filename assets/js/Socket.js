function Socket() {
    //this._database = new Firebase();
    this.init();
}

Socket.prototype.init = function () {
    this.setGetWorker(new Worker("assets/js/SocketGet.js"));
    this.setPostWorker(new Worker("assets/js/SocketPost.js"));
};

Socket.prototype.setGetWorker = function (w) {
    this._getWorker = w;
};

Socket.prototype.setPostWorker = function (w) {
    this._postWorker = w;
};

Socket.prototype.getGetWorker = function () {
    return this._getWorker;
};

Socket.prototype.getPostWorker = function () {
    return this._postWorker;
};