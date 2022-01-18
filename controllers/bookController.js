const catchAsync = require('./../utilis/catchAsync');
const Book = require('./../models/bookModel');
const factory=require("./handlerFactory")


//Create Book
exports.createBook = catchAsync(async (req, res, next) => {
    const newBook = await Book.create({

        title: req.body.title,
        numOfPages: req.body.numOfPages,
        price:req.body.price,
        description:req.body.description,
        author:req.body.author
        

    })
    res.status(201).json({
        status: 'success',
        data: {
            newBook
        }
      })
});


exports.getAllBooks = factory.getAll(Book)
// catchAsync(async (req, res, next) => {
//     const authors = await Author.find();
  
//     // SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       results: authors.length,
//       data: {
//         authors
//       }
//     });
//   });


  exports.updateBook = factory.updateOne(Book)
  exports.deleteBook=factory.deleteOne(Book)

// //Display Books
// exports.getAllBooks = catchAsync(async (req, res, next) => {
//     const books = await Book.find();
  
//     // SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       results: books.length,
//       data: {
//         books
//       }
//     });
//   });