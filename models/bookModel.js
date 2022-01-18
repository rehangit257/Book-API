const mongoose=require("mongoose")
const bookSchema=new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Book title must required"]
    },
    numOfPages:{
        type:Number,
        required:[true,"No. of Pages must required"]
    },
    price:{
        type:Number,
        required:[true,"Book Pages must required"]
    },
    description:{
        type:String,
    },
    author:[{
        type:mongoose.Schema.ObjectId,
        ref:'Author',
        required:[true,'Books must have a authors']
    }]
})

bookSchema.pre(/^find/,function(next){
    this.populate({
        path:'author',select:'-__v -book -dateOfBirth -profile'
    })
    next()
})

const Book=new mongoose.model('Book',bookSchema)

module.exports=Book