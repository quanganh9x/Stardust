onmessage = function (m) {
    if (m.data[0] == "system")
        if (m.data[1] == "testConnection") {
            if (test()) postMessage(true);
            else postMessage(false);
        }
};

function test() {
    return true;
}
function Socket() {

}
