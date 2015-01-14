success
=======

### Success/failure handler for Node.js callbacks

A convenience function for passing errors to a callback that helps you avoid the need to write

```JavaScript
if( error ) return callback( error );
```

all the time.

Instead, you can do this:

```JavaScript
var success = require('success')

function doStuff( err, callback ) {

  doMoreStuff( success(callback, function(result) {

    handleResult( result )
  }))  
}
```

This replaces the plain version:

```JavaScript
var success = require('success')

function doStuff( err, callback ) {

  doMoreStuff( function( err, result ) {
    if( err ) return callback(err);

    handleResult( result )
  })
}
```

If you want to be quick and dirty, omitting the failure callback will
print the error (if it occurs) to standard output.

```JavaScript
  doMoreStuff( success(function(result) {

    handleResult( result )
  }))  
```



### Support

If you're using this module, feel free to contact me on twitter if you
have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

Current Version: 0.1.0

Tested on: node 0.10.24

[![Build
Status](https://travis-ci.org/rjrodger/success.png?branch=master)](https://travis-ci.org/rjrodger/success)

