/*!
 * media-extractor
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

// var path = require('path');
var util = require('util');
var fsmonitor = require('fsmonitor');
var Unrar = require('node-unrar');

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

  if (!options.source || !options.destination) {
    console.log('error: invalid options');
    return;
  };

  var source = options.source[0]; // Only one destination for now
  var destination = options.destination;

  watch(source, destination);

}

/**
 * Extracts rar files.
 *
 * @private
 */

var extractFile = function(src, dest, filePath) {

    // requires Unrar to be instaled in the system (just a wrapper)
    var extractor = new Unrar(src);

    console.log('Files added, extracting:', src, 'to:', dest);

    extractor.extract(dest, null, function (err) {

        if (err) {
            console.log('error:', err);
        }

        console.log(src, 'extracted.');

    });

};

/**
 * Watch specified folders.
 *
 * @private
 */

 var watch = function(source, destination) {

  console.log('watching:', source);

  var monitor = fsmonitor.watch(source, {
      // include rar files
      matches: function(relpath) {
          return relpath.match(/\.rar$/i) !== null;
      },
      // exclude directories
      excludes: function(relpath) {
          return false;
      }
  });

  // Listener

  monitor.on('change', function(changes) {

      var file;
      var filePath;
      var extractPath;

      if (changes.addedFiles.length) {

          filePath = source + changes.addedFolders[0] + '/';
          file = source + changes.addedFiles[0];
          extractPath = destination + changes.addedFolders[0] + '/';
          console.log('added:', file);

          extractFile(file, extractPath, filePath);

      }

  });

 };
