function Firebase(player) {
    this._player = player;
    this._database = database;
}

Firebase.prototype.player = function () {
    return this._player;
};

Firebase.prototype.base = function () {
    return this._database;
};

Firebase.prototype.firePost = function (type, data) {
    this.base().ref(this.player() + "/" + type).set({
        d:[data.x,data.y,data.d]
    });
};

Firebase.prototype.fireGet = function (type, value) {
    var self = this;
    this.base().ref(this.player() + "/" + type + "/" + value).on('value', function (v) {
        self.setData(v.val());
    });
};

Firebase.prototype.setData = function (data) {
    this._data = data;
};

Firebase.prototype.getData = function () {
    return this._data;
};
