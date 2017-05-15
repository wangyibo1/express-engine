
var express = require('express')
var cookieParser = require ('cookie-parser')
var parseurl = require('parseurl')
var session = require('express-session')
var MyFileStore = require('connect-mongo')(session)//定义变量，作业中要求命名为Session ID
//connect-mongo，我们只需在挂载session的时候在options中传入mongodb的参数即可，
const mongoose = require('mongoose')

//var MyFileStore = require('session-file-store')(session)//引入session-file-store模块



var app = express()
 
app.use(cookieParser());
app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: true,
  store: new MyFileStore({ 
   mongooseConnection: mongoose.connection,
   collection: 'Session ID'
})


}))

app.use(function (req, res, next) {
  var views = req.session.views
 
  if (!views) {
    views = req.session.views = {}
  }
 
  // get the url pathname 
  var pathname = parseurl(req).pathname
 
  // count the views 
  views[pathname] = (views[pathname] || 0) + 1
 
  next()
})
 
app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})
 
app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3000);
console.log("running on http://123/206.69.15/");