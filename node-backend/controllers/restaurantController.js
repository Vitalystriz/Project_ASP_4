const restaurantModel = require('../models/restaurant')

const getAllRestaurants = (req, res) => {
  const data = restaurantModel.getAllRestaurants();
  res.status(200).json(data);
}

const createRestaurant = (req, res) => {
    const { name, type, description, address } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    
    const newRestaurant = restaurantModel.createRestaurant(name, type, description, address);
    res.status(201).json(newRestaurant);
};

const getRestaurantByID = (req, res) => {
const id = req.params.id;
const restaurant = restaurantModel.getRestaurantByID(id);
if (!restaurant) return res.status(404).json({ error: "Restaurant was not found" });
 res.status(200).json(restaurant);

}
const updateRestaurantByID = (req, res) => {
const id = req.params.id;
const { name, type, description, address } = req.body;    

const updatedRestaurant = restaurantModel.updateRestaurantByID(id, name, type, description, address);
    
if (!updatedRestaurant) return res.status(404).json({ error: "Restaurant was not found" });
res.status(200).json(updatedRestaurant);

}

const deleteRestaurantByID = (req, res) => {
const id = req.params.id;
const deletedRestaurant = restaurantModel.deleteRestaurantByID(id);
 
if (!deletedRestaurant) return res.status(404).json({ error: "Restaurant not found" });
res.status(204).send(); 
};








module.exports = { getAllRestaurants, createRestaurant, getRestaurantByID, updateRestaurantByID, deleteRestaurantByID }
