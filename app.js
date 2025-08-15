const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const connectToDatabase = require('./Config/DbConfig')
const mongoose = require('mongoose');
const User = require('./Auth/Model/UserModel')
const cron = require('node-cron')
app.use(cors())

const authRouter = require('./Auth/Routes/userRoute');
const shopRouter = require('./Shops/Router/ShopRouter');
const SlotRouter = require('./SlotManagement/SlotRouter/SlotRouter')
const BookingRouter = require('./Booking/Router/BookingRouter')
const setupSwagger = require('./swaggerDocs/swaggerConfig');
const checkExpiredPremium = require('./Shops/ShopScheduler/Scheduler');

// Define a route for the root URL
connectToDatabase();

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the port
const port = 3002;

app.use('/api/auth', authRouter)
app.use('/api/shop', shopRouter)
app.use('/api/slot', SlotRouter)
app.use('/api/booking', BookingRouter)

// Fixed cron job - runs every 10 minutes
const scheduledJob = cron.schedule('0 0 */1 * *', async () => {
  console.log("Running expired premium check:", new Date().toISOString());
  try {
    // Check if the checkExpiredPremium function exists and is callable
    if (typeof checkExpiredPremium !== 'function') {
      console.error("checkExpiredPremium is not a function");
      return;
    }
    
    const result = await checkExpiredPremium();
    console.log("Expired premium check completed successfully", result);
  } catch (error) {
    console.error("Error in scheduled job:", error.message);
    console.error("Stack trace:", error.stack);
  }
}, {
  scheduled: true, // Ensure the job is scheduled
  timezone: "UTC" // Set timezone explicitly
});

// Optional: Start the job manually if needed
// scheduledJob.start();

console.log("Cron job scheduled successfully - will run every 10 minutes");

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  setupSwagger(app);
  
  // Optional: Run the check once immediately when server starts
  console.log("Running initial premium check...");
  checkExpiredPremium().catch(error => {
    console.error("Error in initial premium check:", error);
  });
});