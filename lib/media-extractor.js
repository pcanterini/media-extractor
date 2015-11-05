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
    console.log('Error: invalid options');
    return;
  };

  var source = options.source[0]; // Only one source for now
  var destination = options.destination;

  watch(source, destination);

}

/**
 * Extracts rar files.
 *
 * @private
 */

var extractFile = function(src, dest) {

    // requires Unrar to be instaled in the system (just a wrapper)
    var extractor = new Unrar(src);

    console.log('Extracting:', src, 'to:', dest);

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

  console.log('Watching:', source);

  var monitor = fsmonitor.watch(source, {
      // include rar files
      matches: function(relpath) {
          return relpath.match(/\.rar$/i) !== null;
      },
      // exclude
      excludes: function(relpath) {
          return false;
      }
  });

  // Listener

  monitor.on('change', function(changes) {

      var addedFiles = changes.addedFiles;

      addedFiles.forEach(function(file) {

        console.log('File added: ', file);

        // TODO: add support for deeper folder structure
        var folder = file.indexOf('/') === -1 ? '' : file.split('/')[0];
        var filePath;
        var folderPath;
        var extractPath;

        filePath = source + file;
        extractPath = destination + folder + '/';

        extractFile(filePath, extractPath);

      });

  });

 };
