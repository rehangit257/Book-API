const express = require("express")
const Book = require('./../models/bookModel')
const Author = require('./../models/authorModel')
const authController = require('./../controllers/authController');
const authorController = require('./../controllers/authorController');
const router = express.Router()


router.post('/createAuthor', authController.protect, authorController.createAuthor)

router
    .route('/')
    .get(authController.protect, authorController.getAllAuthors)

    // router
    // .route('/updateAuthor')
    // .patch(authController.protect, authorController.updateAuthor)

    router.route('/deleteAuthor/:id').delete(authController.protect, authorController.deleteAuthor)
    router.route('/updateAuthor/:id').patch(authController.protect, authorController.updateAuthor)
module.exports = router

