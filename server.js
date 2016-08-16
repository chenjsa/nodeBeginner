/**
 * Created by chenjunsheng on 16/5/3.
 */

'use strict';

import http from 'http';
import url from 'url';

export function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
