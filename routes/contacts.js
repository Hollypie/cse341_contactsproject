const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

/**
 * @route GET /contacts
 * @summary Get all contacts
 * @group Contacts
 * @returns {object[]} 200 - An array of contacts
 */
router.get('/', contactsController.getAll);

/**
 * @route GET /contacts/{id}
 * @summary Get a single contact by ID
 * @group Contacts
 * @param {string} id.path.required - Contact ID
 * @returns {object} 200 - A single contact
 * @returns {Error} 404 - Contact not found
 */
router.get('/:id', contactsController.getSingle);

/**
 * @route POST /contacts
 * @summary Create a new contact
 * @group Contacts
 * @param {object} request.body.required - Contact info
 * @param {string} request.body.firstName.required
 * @param {string} request.body.lastName.required
 * @param {string} request.body.email.required
 * @param {string} request.body.favoriteColor.required
 * @param {string} request.body.birthday.required
 * @returns {object} 201 - The created contact
 * @returns {Error} 400 - Missing required fields
 */
router.post('/', contactsController.createContact);

/**
 * @route PUT /contacts/{id}
 * @summary Update a contact by ID
 * @group Contacts
 * @param {string} id.path.required - Contact ID
 * @param {object} request.body.required - Contact info to update
 * @param {string} request.body.firstName.required
 * @param {string} request.body.lastName.required
 * @param {string} request.body.email.required
 * @param {string} request.body.favoriteColor.required
 * @param {string} request.body.birthday.required
 * @returns {object} 200 - Updated contact
 * @returns {Error} 400 - Invalid ID or missing fields
 * @returns {Error} 404 - Contact not found
 */
router.put('/:id', contactsController.updateContact);

/**
 * @route DELETE /contacts/{id}
 * @summary Delete a contact by ID
 * @group Contacts
 * @param {string} id.path.required - Contact ID
 * @returns {string} 200 - Success message
 * @returns {Error} 400 - Invalid ID
 * @returns {Error} 404 - Contact not found
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
