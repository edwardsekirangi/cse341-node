//get database connection 
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//get all users
const getAllUsers = async (req, res) => {
    try {
            //The constant variable that connects to the database
            const result = await mongodb.getDb().db().collection("users").find();
        
            //converting the result to an array and sending it as a json response
            result.toArray().then((users) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(users);
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {

            //First we get the user id from the request parameters and convert it to an ObjectId
            const userId = new ObjectId(req.params.id);
            //The constant variable that connects to the database
            const result = await mongodb.getDb().db().collection("users").find({_id: userId});
        
            //converting the result to an array and sending it as a json response
            result.toArray().then((users) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(users[0]);
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//exporting the functions to be used in other files
module.exports = {
    getAllUsers,
    getSingle
};