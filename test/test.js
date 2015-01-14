var seneca = require('seneca')()
	.use('mongo-store',{
		name:'dbname',
  		host:'127.0.0.1',
  		port:27017
	})
seneca.use('options', 'options.mine.js');

seneca.add({plugin:'mongo-store',cmd:'connect'},function(args,done){
	var connect = seneca.make$('test');
 	connect.name  = 'test';
 	connect.save$(function(err,connect){
    	done(null, {
				sucess: true,
				results : "test.id = "+connect.id  
				});
  	})
});

seneca.use('../watch.js');

seneca.ready(function(){
console.log("runing..........")
})