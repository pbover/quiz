var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('pboverquiz2015'));

//Dos Minutos para expiración de cookie de session
//Esta cookie se modifica para cada petición http/s (ver en Helper dinámico)
var tiempoExpiracion = 120000;
//app.use(session({cookie: { maxAge: tiempoExpiracion,expires: new Date(Date.now() + tiempoExpiracion)}}));
app.use(session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


//Helper dinamico para tratamiento de session
app.use(function(req, res, next) {
  //Tratamiento de las cookies de sessión
  //En cada petición http/s se modifica el tiempo de expiración a partir
  //de la hora actual +2 minutos
  //En caso que la sesión expire se hará logout de manera automatica al expirar cookie
  //en el navegador
  if(req.session.user)
  {
    req.session.cookie.expires = new Date(Date.now() + tiempoExpiracion);
    req.session.cookie.maxAge = tiempoExpiracion;
    console.log(" ");
    console.log(" ");
    console.log("_________________NUEVA PETICIÓN - NUEVO TIMEOUT ___________________");
    console.log("- Nueva modificación de tiempo de expriación de sesión");
    console.log("  · Expira = " + req.session.cookie.expires);
    console.log("  · MaxAge = " + req.session.cookie.expires);
    console.log("___________________________________________________________________");
    console.log(" ");
    console.log(" ");
  }
  next();
});


//Helper dinamico
app.use(function(req, res, next) {
  // si no existe lo inicializa
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout|\/user/)) {
    req.session.redir = req.path;
  }
  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,errors:[]
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},errors:[]
  });
});


module.exports = app;
