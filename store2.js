 var express = require('express');
    var session = require('express-session');
   // var MongoDBStore = require('connect-mongodb-session')(session);
    var MyFileStore = require('connect-mongo')(session)//�����������ҵ��Ҫ������ΪSession ID
  //connect-mongo������ֻ���ڹ���session��ʱ����options�д���mongodb�Ĳ������ɣ�
    const mongoose = require('mongoose')
    

    var app = express();


    var store = new MyFileStore(
      {
        mongooseConnection: mongoose.connection,
       collection: 'Session ID'
      
      });
 
    // Catch errors 
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
 
    app.use(require('express-session')({
      secret: 'This is a secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
      },
      store: store,
      // Boilerplate options, see: 
      // * https://www.npmjs.com/package/express-session#resave 
      // * https://www.npmjs.com/package/express-session#saveuninitialized 
      resave: true,
      saveUninitialized: true
    }));
 
    app.get('/', function(req, res) {
      res.send('Hello ' + JSON.stringify(req.session));
    });
 
    server = app.listen(3000);
    console.log ('it works!')