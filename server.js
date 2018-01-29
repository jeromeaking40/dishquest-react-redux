//DEPENDCIES
require('dotenv').config();
const EatStreet = require('eatstreet'),
 ES = new EatStreet(process.env.API_KEY),
 PORT = process.env.PORT,
 bodyParser = require('body-parser'),
 async = require('async'),
 cors = require('cors')(),
 express = require('express'),
 morgan = require('morgan'),
 app = express();

//MIDDLEWARE
app.use(cors);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}), bodyParser.json());

//SEARCH RESTAURANTS
app.get('/api/search', (req, res) => {
    let params = {
        address: 'Tampa, FL', // this is req.body.address
        term: 'coffee' // this is req.body.term
    };

    //Get all restaurants from the user search query
    ES.SearchRestaurants(params, (err, searchResponse) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        console.log(searchResponse['restaurants']);
        let allRestaurants = searchResponse['restaurants'];
        return res.json(allRestaurants);
    });
  });

//GET RESTAURANT MENU DETAILS
app.get('/api/menu', (req, res) => {
  let params = {
      apiKey: '8c8897c6da3f735fab9b56a2a4d9fc14f02431a50b0e0816', //this is req.query.apiKey
      customizations: true
  };
    // Get restaurant menu.
    ES.RestaurantMenu(params, (err, menuResponse) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        let restaurantMenu = menuResponse;
        return res.json(restaurantMenu);
    });
});

//SERVER SETUP
app.listen(PORT, (err) => {
  if (err) {
    console.error('There was an error: ', err);
    process.exit(1);
  }
  console.log(`API Server is listening on ${PORT}`);
});
