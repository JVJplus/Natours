const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to port: ${port}...`);
});

app.use(express.json());

/* Routing */
app.get('/', (req, res) => {
  res.send('This is the homeopage');
});

const toursPath=path.join(__dirname, 'dev-data', 'data', 'tours-simple.json');
const tours = JSON.parse(
  fs.readFileSync(toursPath)
);

// Get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

// Get specific id tour
app.get('/api/v1/tour(s)?/:id',(req,res)=>{
  const id = req.params.id * 1;

  if (id > tours.length || id<0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data:{ tour }
  });
})

// Update a tour
app.patch('/api/v1/tour(s)?/:id',(req,res)=>{
  const id = req.params.id * 1;

  if (id > tours.length || id<0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data:'<updated data here>'
  });
})

// Delete a tour
app.delete('/api/v1/tour(s)?/:id',(req,res)=>{
  const id = req.params.id * 1;

  if (id > tours.length || id<0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data:null
  });
})


// Add a tour
app.post('/api/v1/tours',(req,res)=>{
  console.log(req.body);
  let newId=tours[tours.length-1].id+1;
  let newTour=Object.assign({"id":newId},req.body);
  tours.push(newTour);

  fs.writeFile(toursPath,JSON.stringify(tours),err=>{
    res.status(201).json({ 
      status:'success',
      data:{ tour:newTour}
    });
  });
})