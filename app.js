var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});