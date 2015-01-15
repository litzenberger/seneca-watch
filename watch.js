/* Copyright (c) 2015 Ron Litzenberger, MIT License */
"use strict";
var _  = require('underscore');

module.exports = function (options) {
  var seneca = this;
  var plugin = 'watch';
  var so = seneca.options();
  var pin = seneca.pin({role:plugin, cmd:'*' });
  var stats_total={};

  /*
  * Setup option defaults
  */
	options = seneca.util.deepextend(
    {
      watch: {
        interval: so.watch.interval ? so.watch.interval :  60000,
        act: so.watch.act ? so.watch.act : 'all',
      }
    },
    options);
  
    /* 
    * setup watching methods
    */

    seneca.add({role:plugin,cmd:'stats'},stats);

    function stats(args,done)
    {
      done(null,stats_total);

    }


  	/*
  	*  watcher running 
  	*/
    var watcher = function () {
      seneca.log.debug("watching");
      seneca.act('role:seneca,stats:true', function(err,stats){
       if(err)
         {
            seneca.log.error(err);
            // TODO
            //seneca.act({role:'watch',notify:'error'});
            //stats.add()
            return;
          }
          else{
            var mem   = process.memoryUsage()
            stats_total.start=stats.start;
            stats_total.act=stats.act;
            console.log('stats start  ' +stats_total.start);
            console.log(stats_total.act);
            if(options.watch.act==='all')
            {
              console.log(JSON.stringify(stats.actmap));
            }
            else
            {
              console.log(JSON.stringify(stats.actmap[options.watch.act]));
            }
            //console.log( stats.time.rate, fr(stats.time.allrate), ctxt.total, fr(ctxt.total/ctxt.count), (fr(100 * mem.heapUsed / mem.heapTotal))/100, fr(mem.heapTotal/(1024*1024)) )
            console.log((100 * mem.heapUsed) / (mem.heapTotal/100))

            return;
          }
    
      
    })

    	setTimeout(watcher,options.watch.interval);
		}

	watcher();

	return {
		name: plugin
	}
}
