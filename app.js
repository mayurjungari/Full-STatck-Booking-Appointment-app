const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { Appointment, sequelize } = require('./models/book'); // Assuming you have a model defined

// Import your route files
const AppointmentRoute = require('./Route/Appointment');
const GetDataRoute = require('./Route/getdata');
const PostDataRoute = require('./Route/postdata');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Define a route to serve your HTML page
app.use(AppointmentRoute);

// Define a new route to fetch data from the database
app.use(GetDataRoute);
// app.use(PostDataRoute);

app.use(cors());

// Add this route to handle POST requests to create new bookings
app.post('/book/postdata', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newBooking = await Appointment.create({
      Name: name,
      Email: email,
      Phone: phone,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//------------------------
app.delete('/book/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Use Sequelize to delete the appointment by ID
        const deletedAppointment = await Appointment.destroy({
            where: {
                id: id
            }
        });
        if (deletedAppointment) {
            res.status(204).send(); // Successfully deleted
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });
