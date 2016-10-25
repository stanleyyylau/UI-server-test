var express = require('express');
// var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;


// serve static files from /public
app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'pug');

// parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res, next){
  res.render('index');
})

app.get('/zhongbao', function(req, res, next){
  res.render('zhongbao');
})

app.get('/zhongbao.html', function(req, res, next){
  res.render('zhongbao');
})

app.get('/enterprise_service', function(req, res, next){
  res.render('enterprise_service');
})

app.get('/enterprise_service.html', function(req, res, next){
  res.render('enterprise_service');
})

app.get('/immigrate', function(req, res, next){
  res.render('immigrate');
})

app.get('/immigrate.html', function(req, res, next){
  res.render('immigrate');
})

app.get('/about_taoli', function(req, res, next){
  res.render('about_taoli');
})

app.get('/about_taoli.html', function(req, res, next){
  res.render('about_taoli');
})

app.get('/common_qa', function(req, res, next){
  res.render('common_qa');
})


app.get('/common_qa.html', function(req, res, next){
  res.render('common_qa');
})

app.get('/common_qa_service', function(req, res, next){
  res.render('common_qa_service');
})

app.get('/common_qa_service.html', function(req, res, next){
  res.render('common_qa_service');
})

app.get('/common_qa_how_to_send_order', function(req, res, next){
  res.render('common_qa_how_to_send_order');
})

app.get('/common_qa_how_to_send_order.html', function(req, res, next){
  res.render('common_qa_how_to_send_order');
})

app.get('/master_list', function(req, res, next){
  res.render('master_list');
})

app.get('/master_list.html', function(req, res, next){
  res.render('master_list');
})

app.get('/find', function(req, res, next){
  var totalItems = 80,
        pageSize = 8,
        pageCount = 80/8,
        currentPage = 1,
        items = [],
        itemsArrays = [],
        itemsList = [];

  //genreate list of students
  for (var i = 1; i < totalItems; i++) {
      items.push({name: 'Some Item  ' + i});
  }

  //split list into groups
  while (items.length > 0) {
      itemsArrays.push(items.splice(0, pageSize));
  }

  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
      console.log()
      currentPage = +req.query.page;
      console.log(itemsArrays)
      if( currentPage < 1 || currentPage > 10){
        currentPage = 1;
      }
  }

  //show list of students from group
   itemsList = itemsArrays[+currentPage - 1];
   res.render('find', {
       items: itemsList,
       pageSize: pageSize,
       totalItems: totalItems,
       pageCount: pageCount,
       currentPage: currentPage
     });
})

app.get('/find.html', function(req, res, next){
  res.render('find');
})

app.get('/about_taoli', function(req, res, next){
  res.render('about_taoli');
})

app.get('/about_taoli.html', function(req, res, next){
  res.render('about_taoli');
})

app.get('/statement', function(req, res, next){
  res.render('statement');
})

app.get('/statement.html', function(req, res, next){
  res.render('statement');
})

app.get('/contact', function(req, res, next){
  res.render('contact');
})

app.get('/contact.html', function(req, res, next){
  res.render('contact');
})

app.get('/media_report', function(req, res, next){
  res.render('media_report');
})

app.get('/media_report.html', function(req, res, next){
  res.render('media_report');
})


app.use(function(req, res){
  res.status(404);
  res.send("<h1>404 Error</h1>");
})
// app.use(function(err, req, res, next){
//   res.status(401);
//   res.send('No token provided');
// })

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
