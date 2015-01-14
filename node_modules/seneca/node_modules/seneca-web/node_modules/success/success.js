/* Copyright (c) 2014 Richard Rodger, MIT License */
"use strict";


var assert = require('assert')


module.exports = function( failure, success ) {
  if( null == success ) {
    success = failure
    failure = function( err ) { console.log(err) }
  }
  assert( 'function' == typeof failure )
  assert( 'function' == typeof success )

  return function( err ) {
    if( null != err ) return failure(err);
    return success.apply( this, Array.prototype.slice.call(arguments,1))
  }
}
