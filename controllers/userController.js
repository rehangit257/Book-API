
const User = require('./../models/userModel');
const catchAsync = require('./../utilis/catchAsync');
const AppError=require("./../utilis/appError")
const multer=require("multer")

const multerStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/img/users')
  },
  filename:(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1]
    cb(null,`user-${Date.now()}.${ext}`)
  }
})

multerFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }
  else{
    cb(new AppError('Not an image!!Please upload images only.',400),false)
  }
}
const upload=multer({
  storage:multerStorage,
  fileFilter:multerFilter
})
exports.uploadUserPhoto=upload.single('photo')


const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el]
  });
  return newObj;
}


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  });

  exports.deleteMe=catchAsync(async (req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})
    res.status(204).json({
      status:"success",
      data:null
    })
  })

  exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error id user POSTs password data
    console.log('upadte me')

    console.log('req.file')
    console.log(req.file)
    console.log('req.body')
    console.log(req.body)
    if (req.body.password || req.body.confirmPassword) {
        return next(new AppError('This route is not for password update. Please use /updateMyPassword.', 400));
    }

    // 2) Filtered out unwanted fields names that are not allowed to updated
    const filteredBody = filteredObj(req.body, 'name', 'email');
    if(req.file)
    filteredBody.photo=req.file.filename
    console.log('before upadte me')
    console.log(req.user.id)
    console.log(req.user.id)
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})