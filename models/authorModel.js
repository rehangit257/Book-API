const mongoose=require("mongoose")


const authorSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"User name must required"]
    },
    dateOfBirth:{
        type:Date,
        required:[true,'Date-of-Birth is required']
    },
    profile:String,
    book:[{
        type:mongoose.Schema.ObjectId,
        ref:'Book',
    }]
})


authorSchema.pre(/^find/,function(next){
    this.populate({
        path:'book',select:'-description -numOfPages'
    })
    next()
})

const Author=new mongoose.model('Author',authorSchema)

module.exports=Author