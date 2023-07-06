const Tour = require('./../models/tourModel');

// Route handlers
exports.gettAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'failure', message: err.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'failure', message: err.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour  = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'failure', message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'failure', message: err.message });
  }
};

exports.deleteTour =  async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
  
    res.status(204).json({
      status: 'success',
      data: {
        tour: null,
      },
    });

  } catch (err) {
    res.status(404).json({ status: 'failure', message: err.message });
  }
};
