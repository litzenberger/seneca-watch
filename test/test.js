var seneca = require('seneca')()
	.use('options', 'options.mine.js')
	.use('../watch.js');
/*
*	test watch stats
*/


seneca.ready(function(){
console.log("runing..........")
})