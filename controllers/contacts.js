//This is the contacts controller
//get database connection
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all users
const getAllContacts = async (req, res) => {
    try {
        //The constant variable that connects to the database
        const result = await mongodb.getDb().db().collection('contacts').find();

        //converting the result to an array and sending it as a json response
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
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
        const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });

        //converting the result to an array and sending it as a json response
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const db = await mongodb.getDb().db().collection('contacts');

        // Extract filter and update data from request body
        const filter = { _id: new ObjectId(req.params.id) }; // or use email, username, etc.
        const update = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday,
                contact: req.body.contact
                // Add other fields to update
            }
        };

        const result = await db.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Contact updated successfully' });
        } else {
            res.status(404).json({
                message: 'Contact not found or no changes made'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const db = await mongodb.getDb().db().collection('contacts');

        const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday,
                contact: req.body.contact
                // Add other fields to update
        };

        const result = await db.insertOne(newUser);

        if (result.acknowledged) {
            res.status(201).json({
                message: 'Contact created successfully',
                userId: result.insertedId
            });
        } else {
            res.status(500).json({ message: 'Failed to create contact' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const db = await mongodb.getDb().db().collection('contacts');

        const userId = new ObjectId(req.params.id);
        const result = await db.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//exporting the functions to be used in other files
module.exports = {
    getAllContacts,
    getSingle,
    updateContact,
    createContact,
    deleteContact
};
