const tours = '';

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

// HTTP Methods
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour }
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

exports.addTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
};
