const express = require('express');
const path = require('path');
const router = express.Router();


const helper = require('./../helper/helper');



const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/image_upload', helper.upload.single('image'), async function (req, res) {
	
	const imagePath = path.join(__dirname, './../public/images');
	const fileUpload = new helper.Resize(imagePath);
	  if (!req.file) {
	    res.status(401).json({error: 'Please provide an image'});
	  }
	const filename = await fileUpload.save(req.file.buffer);
	// return res.status(200).json({ name: filename });
	await res.redirect('/image_result/'+filename);
	return res.status(200);
});
router.get('/image_result/:id',async function (req, res) {
	console.log(req.params.id)
	await res.redirect('http://0.0.0.0:8000/'+req.params.id);
	// return res.status(200);
});



module.exports = router;