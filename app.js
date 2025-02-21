const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const connectToDatabase = require('./Config/DbConfig')

const authRouter = require('./Auth/Routes/userRoute');
const shopRouter = require('./Shops/Router/ShopRouter');
const  setupSwagger = require('./swaggerDocs/swaggerConfig');
// Define a route for the root URL
connectToDatabase();
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Define the port
const port = 3001;
app.use('/api/auth', authRouter)
app.use('/api/shop',shopRouter)
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  setupSwagger(app);
});
