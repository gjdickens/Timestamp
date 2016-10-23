var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 8080;

// Set Up Routes
var router = express.Router();

// Middleware for all requests
router.use(function(req, res, next) {
  next();
});



//landing page route

app.use('/', express.static(path.join(__dirname, 'public')));
//API routes
router.get('/', function(req, res) {
  res.json({ message: 'hello world!'});
});

//take in data input
router.route('/:date_input')


  .get(function(req, res) {
      var unixDate = new Date(req.params.date_input * 1000);
      var naturalDate = new Date(req.params.date_input);
      var trueDate = null;
      var unixDateOutput = null;
      var naturalDateOutput = null;

      if (naturalDate.getMonth()) { trueDate = naturalDate }
      else if (unixDate.getMonth()) { trueDate = unixDate }

      if (trueDate !== null) {
        unixDateOutput = Date.parse(trueDate) / 1000;
        naturalDateOutput = trueDate.toDateString();
      }
      
      res.json({natural: naturalDateOutput, unix: unixDateOutput });
  });

// Register Routes
app.use('/api', router);

app.listen(port);
console.log('Listening on ' + port);
