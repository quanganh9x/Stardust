function Connection(url) {
    this.url = url;
    this.testConnection();
}

Connection.prototype.testConnection = function () {
    var check = true;
    if (check) {
        this._w = new Worker(this.url);
    } else console.log("connection dropped");
};

Connection.prototype.get = function () {
    return this._w;
};