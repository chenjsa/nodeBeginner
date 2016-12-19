/**
 * Created by chenjunsheng on 16/8/14.
 */
'use strict';

import querystring from 'querystring';
import fs from 'fs';
import formidable from 'formidable';

export function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
            '<body>'+
                '<form action="/upload" enctype="multipart/form-data" '+ 'method="post">'+
                    '<input type="file" name="upload">'+
                    '<input type="submit" value="Upload file" />'+
                '</form>'+
            '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

export function upload(response, request) {
    let form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, function(error, fields, files) {
        console.log("Parsing done");
        fs.rename(files.upload.path, "/tmp/test.png", () => {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("received image:<br/>");
            response.write("<img src='/show' />");
            response.end();
        });
    });
}

export function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
