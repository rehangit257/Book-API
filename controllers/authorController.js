
const catchAsync = require('./../utilis/catchAsync');
const Author = require('./../models/authorModel');
const factory=require("./handlerFactory")


//Create Author
exports.createAuthor = catchAsync(async (req, res, next) => {
    const newAuthor = await Author.create({

        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        profile:req.body.profile,
        book:req.body.book
        

    })
    res.status(201).json({
        status: 'success',
        data: {
            newAuthor
        }
      })
});


//Display Authors
exports.getAllAuthors = factory.getAll(Author)
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


  exports.updateAuthor = factory.updateOne(Author)
  exports.deleteAuthor=factory.deleteOne(Author)

// exports.updateAuthor=catchAsync(async (req,res,next)=>{
//     if (!req.body.book) {
//         return next(new AppError('Please provide author books!', 400));
//       }
//       updatedAuthor = Author.find( { name: req.body.name } )
// //   const updatedAuthor = await Author.findByIdAndUpdate(req.user.id, {
// //     // new: true,
// //     // runValidators: true

    
// //   });
// console.log("Value")
// console.log("Value")
// console.log("Value")
// console.log("Value")
// console.log("Value")
//   console.log(updatedAuthor)
// // updatedAuthor.book=book.add(req.body.book)
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedAuthor
//     }

//   });
//   next()
// })


