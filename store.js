
var express = require('express')
var cookieParser = require ('cookie-parser')
var parseurl = require('parseurl')
var session = require('express-session')
var MyFileStore = require('connect-mongo')(session)//�����������ҵ��Ҫ������ΪSession ID
//connect-mongo������ֻ���ڹ���session��ʱ����options�д���mongodb�Ĳ������ɣ�
const mongoose = require('mongoose')

//var MyFileStore = require('session-file-store')(session)//����session-file-storeģ��



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