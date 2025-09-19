const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await mongodb.getDb().collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Fetching contacts failed.' });
  }
};

// GET a single contact by ID
const getSingle = async (req, res) => {
  try {
    let contactId;
    try {
      contactId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const contact = await mongodb.getDb().collection('contacts').findOne({ _id: contactId });
    if (!contact) return res.status(404).json({ message: 'Contact not found.' });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Fetching contact failed.' });
  }
};

// CREATE a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };

    const response = await mongodb.getDb().collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// UPDATE an existing contact
const updateContact = async (req, res) => {
  try {
    let userId;
    try {
      userId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };

    const response = await mongodb.getDb().collection('contacts').replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found or nothing to update.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// DELETE a contact
const deleteContact = async (req, res) => {
  try {
    let userId;
    try {
      userId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
