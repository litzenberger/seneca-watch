/* Copyright (c) 2015 Ron Litzenberger, MIT License */
"use strict";

var _  = require('underscore');

module.exports = function( options ) {
	var seneca = this;
  var plugin = 'watch';

	var so = seneca.options();


	options = seneca.util.deepextend(
    {
      watch: {
        interval:  so.watch.interval ? so.watch.interval :  60000,
        obj : so.watch.obj ? so.watch.obj:[]
      }
    },
    options);
  
  	/*
  	/
  	/watcher running 
  	*/
	var watcher = function () {
		 seneca.log.debug("watching");
         seneca.act(options.watch.obj[0],function(err,results){
      		if(err)
      		{
        		seneca.log.error(err);
            // TODO
        		//seneca.act({role:'watch',notify:'error'});
        		//stats.add()
        		return;
      		}
      		else{
          		seneca.log.debug(JSON.stringify(results));
          		//stats.add();
		      	return;
      		}
	  	});
    	setTimeout(watcher,options.watch.interval);
		}
	watcher();

	return {
		name: plugin
	}
}
