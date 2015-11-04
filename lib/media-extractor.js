/*!
 * media-extractor
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

var path = require('path');
var util = require('util');

/**
 * Module exports.
 */

module.exports = mediaExtractor;

/**
 * Extracts rar files from watched folder to destination.
 *
 * @param {Object} options
 * @public
 */

function mediaExtractor(options) {
  var opts = options || {};

  console.log('extrator init with options:', opts);

}