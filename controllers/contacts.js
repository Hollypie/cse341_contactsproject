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
    const contacts = await mongodb
      .getDatabase()
      .collection('contacts')
      .find({ _id: contactId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json({ message: 'Fetching contact failed.' });
  }
};

const createContact = async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.favoriteColor ||
      !req.body.birthday
    ) {
      return res.status(400).json('All fields are required');
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json('Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json(err.message || 'Unexpected error');
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};