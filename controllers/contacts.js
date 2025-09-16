const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const contacts = await mongodb.getDatabase().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Fetching contacts failed.' });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const contacts = await mongodb.getDatabase().collection('contacts').find({ _id: contactId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } catch (err) {
        res.status(500).json({ message: 'Fetching contact failed.' });
    }
};


module.exports = {
    getAll,
    getSingle
};