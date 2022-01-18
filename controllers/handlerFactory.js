const catchAsync=require("./../utilis/catchAsync")
const AppError=require("./../utilis/appError")

exports.deleteOne =Model=> catchAsync(async (req, res, next) => {
  console.log("Update ID")
    console.log("Update ID")
    console.log(req.params.id)
    const doc = await Model.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });


  exports.updateOne=Model=>catchAsync(async (req, res, next) => {
    console.log("Update ID")
    console.log("Update ID")
    console.log(req.params.id)

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data:doc
      }
    });
  });


  exports.getAll = Model=>catchAsync(async (req, res, next) => {
    const docs = await Model.find();
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs
      }
    });
  });
