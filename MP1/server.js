const http = require('http');
const url = require('url');
const fs = require('fs');

function onRequest(request, response) {
    var path = url.parse(request.url).pathname;
    if(request.method == 'GET' && path == '/') {
        console.log(path);
        response.writeHead(200, {'Content-Type':'html'});
        response.write('Test Page');
        response.end();
    } else if(request.method == 'GET' && path != '/') {
        console.log(path);
        if(path.substring(0, 4) == '/MP1') {
            var test = path.substring(4);
            path = test;
        }
        var test2 = path.replace(/%20/gi," ");
        path = test2;
        
        fs.readFile(__dirname + path, (err, data) => {
            if(err) {
                response.writeHead(404);
                response.write('Page does not exist');
                response.end();
            } else {
                response.writeHead(200, {'Content-Type':'html'});
                response.write(data);
                response.end();
            }
        });
    } else {
        sendError(response);
    }
}

function sendError(response) {
    response.writeHead(200, {'Content-Type':'plain/text'});
    response.write('Page does not exist.');
    response.end();
}

http.createServer(onRequest).listen(4000);
console.log('Listening on port 4000...');