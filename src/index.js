var fsmonitor = require('fsmonitor');
var Unrar = require('node-unrar');
var util = require('util');
var exec = require('child_process').exec;

// Basic Settings
var rootFolder = '/Users/pcanterini/Desktop/extractor_app/';
var watchFolder = rootFolder + 'downloads/';
var extractToFolder = rootFolder + 'extracted/';
var deleteAfterExtracted = false;

var extractFile = function (src, dest, filePath) {

    // requires Unrar to be instaled in the system (just a wrapper)
    var extractor = new Unrar(src);

    console.log('Files added, extracting:', src, 'to:', dest);

    extractor.extract(dest, null, function (err) {

        if (err) {
            console.log('error:', err);
        }

        if (deleteAfterExtracted) {
            exec('rm -rf '+ filePath , function puts(error, stdout, stderr) { util.puts(stdout) });
        }

        console.log(src, 'extracted.');

    });

}

var monitor = fsmonitor.watch(watchFolder, {
    // include files
    matches: function(relpath) {
        return relpath.match(/\.rar$/i) !== null;
    },
    // exclude directories
    excludes: function(relpath) {
        return false;
    }
});

monitor.on('change', function(changes) {

    var file;
    var filePath;
    var extractPath;
    
    if (changes.addedFiles.length) {
        filePath = watchFolder + changes.addedFolders[0] + '/';
        file = watchFolder + changes.addedFiles[0];
        extractPath = extractToFolder + changes.addedFolders[0] + '/';
        console.log('added:', file);
        extractFile(file, extractPath, filePath);
    }

    if (changes.removedFiles.length) {
        file = watchFolder + changes.removedFiles[0];
        console.log('removed:', file);
    }

});

