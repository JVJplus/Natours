const fs = require('fs');
const path = require('path');

const toursPath = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);
const tours = JSON.parse(fs.readFileSync(toursPath));


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: '<updated data here>',
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.addTour = (req, res) => {
  console.log(req.body);
  let newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(toursPath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  });
};
