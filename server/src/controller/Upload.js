const multer = require('multer');
const fs = require('fs-extra');
const upload = multer({limits: {fileSize: 5000000 }, dest:'./uploads/'});
const { Images } = require("../Models.js");

const UploadController = function(app, baseUrl)
{
    app.post(`${baseUrl}/uploadimg`, upload.single("file"), (req, res) => {
        console.log(`Upload image ${req.file.originalname}.`);
        let newImg = fs.readFileSync(req.file.path);
        let encImg = newImg.toString('base64');

        const img = new Images({ 
            contentType: req.file.mimeType,
            size: req.file.size,
            img: Buffer(encImg, 'base64') 
        });

        img.save();
        res.send( { status: "success", _id: img._id } );
    });

    app.get(`${baseUrl}/img/:uid`, (req, res) => {
        Images.findOne({ "_id": req.params.uid }, (err, results) => {
            if(err) {
                res.send("Image Not Found!");
                return;
            }

            res.setHeader('content-type', "image/jpeg");
            res.end(results.img);
        });
    });
}

module.exports = UploadController;