const express = require('express');
const db = require('./Config/Config');
const cors = require('cors');
const app = express();
app.use(express.json()); 
app.use(cors({ origin: '*' })); // cross origin resource sharing to allow access the server from any domain

const userRoute = require("./Routes/user.routes");
const restaurantRoute = require('./Routes/restaurant.routes');
const categoryRestaurantRoute = require('./Routes/restaurantCategory.routes');
const guesthouseRoute = require('./Routes/guesthouse.routes');
const categoryGuesthouseRoute = require('./Routes/guesthouseCategory.routes')
const bookingRoute = require('./Routes/booking.routes');
const activitiesRoute = require('./Routes/activity.route');

app.use('/api/restaurants', restaurantRoute);
app.use(`/api/users`, userRoute); 
app.use(`/api/restaurantscategory`, categoryRestaurantRoute);
app.use('/api/guesthouses', guesthouseRoute);
app.use('/api/guesthousescategory', categoryGuesthouseRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/activities', activitiesRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});