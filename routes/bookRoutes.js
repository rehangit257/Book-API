const express = require("express")
const authController = require('./../controllers/authController');
const bookController = require('./../controllers/bookController');
const router = express.Router()


router.post('/addBook', authController.protect, bookController.createBook)

router
    .route('/')
    .get(authController.protect, bookController.getAllBooks)
    router.route('/deleteBook/:id').delete(authController.protect, bookController.deleteBook)
    router.route('/updateBook/:id').patch(authController.protect, bookController.updateBook)
module.exports = router

