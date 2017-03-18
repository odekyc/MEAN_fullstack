var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var redisStore=require('connect-redis')(session);
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var debug = require('debug')('my-application');
var redis = require('redis');
var csrf=require('csurf');
var helmet = require('helmet');
var client = redis.createClient({host : 'localhost', port : 6379});
var  validator = require('express-validator');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/logincredentials", function(err, db) {
  if(!err) {
    alert("We are connected");
  }
});

client.on('ready',function() {
 console.log("Redis is ready");
});

client.on('error',function() {
 console.log("Error in Redis");
});


app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'jfjgfhjhgjfgjhfghjfghj',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf());
app.use(helmet());
app.use(validator());



app.use(function (request, response, next) {   response.locals.csrftoken = request.csrfToken();   next(); });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.use('/', index);
app.get('/', function(req, res){
    console.log('Session ID:', req.sessionID);

    if(req.session.counter){
      req.session.counter=req.session.counter+1;
    }
    else{
      req.session.counter=1;
    }
    res.send('Counter: '+req.session.counter);
});

app.post('/', function(request, response){   
  request.assert('accountnum', 'Account Number is required').notEmpty();   
  request.assert('password', 'Password is required').notEmpty();  
    var errors = request.validationErrors();   
  if (errors)     
    response.render('index', {errors: errors});   
  else     response.render('index.html', {email: request.password}); 

});




var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
