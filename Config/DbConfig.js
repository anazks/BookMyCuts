/* eslint-disable @typescript-eslint/naming-convention */
const mongoose = require('mongoose');

const DB_URI = process.env.DATABASE_URL;
const MAX_RETRY_ATTEMPTS = 20;
const RETRY_INTERVAL = 3000; // 3 seconds

let retryCount = 0;

async function connectToDatabase() {
  if (!DB_URI) {
    console.error('DATABASE_URL is not set in the environment variables.');
    process.exit(1);
  }

  console.log(`Connecting to: ${DB_URI}`);

  const connect = async () => {
    try {
      // Connect to the database without deprecated options
      await mongoose.connect(DB_URI);

      console.log('Connected DB name:', mongoose.connection.name);
      retryCount = 0; // Reset retry count on successful connection
    } catch (error) {
      console.error('Failed to connect to the database:', error);

      // Retry the connection if max attempts haven't been reached
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        retryCount++;
        console.log(`Retrying connection... Attempt ${retryCount}/${MAX_RETRY_ATTEMPTS}`);
        setTimeout(connect, RETRY_INTERVAL);
      } else {
        console.error(
          `Unable to connect after ${MAX_RETRY_ATTEMPTS} attempts. Stopping the application.`
        );
        process.exit(1); // Exit the application after max retry attempts
      }
    }
  };

  await connect(); // Initial connection attempt
}

module.exports = connectToDatabase;
