const Tour = require('./../models/tourModel');

// HTTP Methods
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
    // results: tours.length,
    // data: { tours }
  });
};

exports.getTour = (req, res) => {
  // const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success'
    // data: { tour }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: '<updated data here>'
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.addTour = async (req, res) => {
  console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: newTour
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
