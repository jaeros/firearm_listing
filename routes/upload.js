var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var path = require('path');
var router = express.Router();

router.use(busboy());

/* POST photo uploads. */
router.post('/', function(req, res) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    console.log("Uploading: " + filename);

    var pathname = path.join(__dirname, "../public/uploads/" + filename);
    fstream = fs.createWriteStream(pathname);
    file.pipe(fstream);
    fstream.on('close', function() {
      console.log("Upload finished for " + filename);

      var serverPathIndex = pathname.indexOf("/uploads");
      var serverPath = pathname.substring(serverPathIndex, pathname.length);
      console.log(serverPath);

      res.send({"pathname": serverPath});
    });
  });
});

module.exports = router;
