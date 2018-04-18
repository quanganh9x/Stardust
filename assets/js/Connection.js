function Connection() {
    this._url = "https://google.com";
}

Connection.Event = {};
Connection.Event.TEST_CONNECTION = 'Connection.Event.TEST_CONNECTION';

Connection.prototype.notify = function (event) {
    if (event.name == Connection.Event.TEST_CONNECTION) {
        var check = true;
        if (!check) {
            console.log("all failed");
            event.worker.terminate();
            event.worker = undefined;
        }
    }
};