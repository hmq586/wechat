var express = require('express');
var routesEngine = require('./jerryapp/routes/index.js'); // index.js actually
    // X, X.js, X.json and X.node see blog http://www.ruanyifeng.com/blog/2015/05/require.html
    
var app = express();

app.use('/ui5', express.static(process.cwd() + '/webapp'));
app.use('/v', express.static(process.cwd() + '/vue'));
app.use('/map', express.static(process.cwd() + '/map'));
app.use('/tile', express.static(process.cwd() + '/tileStudy'));

routesEngine(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port, process.cwd(): ' + process.cwd() );
});

   