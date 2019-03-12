/* eslint-disable */

function kite_url(r) {
    r.return(200, "Hello world!");
    var v = r.variables;
    r.log("Trying to access " + v.id + "'s " + v.name + " container");
    r.headersOut['x-cooldebug'] = 'fuckyou'
    v.kite_url = 'fuckyou'
    r.finish()
}

function hello(r) {
    var v = r.variables;
    r.log("Trying to access " + v.id + "'s " + v.name + " container");
    
    var url = 'http://' + v.id + '-' + v.name + '/' + v.path;
    r.headersOut['x-debug-path'] = url;
    r.subrequest(url, r.variables.args, function done(res) {
        r.return(res.status, res.responseBody);
    });
}