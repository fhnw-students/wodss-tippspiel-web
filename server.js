var history = require('connect-history-api-fallback');
var express = require('express');
var secure = require('express-force-https');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(secure);
app.use(history());
app.use(serveStatic(path.join(__dirname, '/dist')));

app.listen(app.get('port'));

console.log("Static file server running at\n  => http://localhost:" + app.get('port') + "/\nCTRL + C to shutdown");
