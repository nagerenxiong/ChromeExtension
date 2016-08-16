var jsonp = (function() {
    var prefix = '_helper_for_sg_';
    var id = 1;
    return function(cb) {
        var _id = prefix + (++id);
            window[_id] = function() {
            cb.apply(null, arguments);
            delete window[_id];
        };
        return _id;
    };
})();
// 向 background 发送消息.
function sendMessage(message) {
    sogouExplorer.extension.sendRequest(message);
}