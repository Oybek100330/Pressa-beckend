
const controller = require('../controllers/post.js')
const router = require('express').Router()
const multer = require('multer')
const videoUpload = multer()

router.get('/', controller.GET)
router.get('/:postId', controller.GET)


module.exports = router