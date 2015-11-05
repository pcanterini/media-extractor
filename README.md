# Media Extractor

This is a very simple and quick personal project for a specific use case where I needed .rar files extracted from a watched folder automatically.

## Usage

### Installing
1. `git clone git@github.com:pcanterini/media-extractor.git`
1. `cd media-extractor && npm install`
1. `npm install forever -g`
1. `Make sure to edit index.js with source and destination for files`

### Running
1. `forever start index.js` inside the cloned folder

### Stopping
1. `forever stop index.js` inside the cloned folder