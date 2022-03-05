var http = require('http');
var formidale = require('formidable');
var fs = require('fs');



http.createServer(function(req,res){

    //FileUpload Route - Parse and Store uploaded file
    if(req.url == '/fileupload'){
        var form = new formidale.IncomingForm();
        form.parse(req,function(err,fields,files){
            //Copy file
            fs.copyFileSync(files.fileupload.filepath,"./"+files.fileupload.originalFilename);
            // Delete the file
            fs.unlink(files.fileupload.filepath, function (err) {
                if (err) throw err;
                console.log('Temp File deleted!');
            });
            res.write('File uploaded');
            return res.end();
        });
    }

    //Default Route - Send File Upload Form
    else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<label for="file">Choose File</label><br>');
        res.write('<input id="file" type="file" name="fileupload"><br>');
        res.write('<button type="submit">Upload</button>');
        res.write('</form>');
        return res.end();
    }
	
}).listen(8080);

