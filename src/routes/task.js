const express = require('express')
const router = express.Router()
const { createTask, updateTask, deleteTask, readTask } = require('../controllers/task')

/**
 * @route GET /find/:doc/:id
 * @description Read a specific document by its ID if :doc is "document", or all documents if :doc is "documents".
 * @param {string} doc - The type of the request. Either 'document' for a specific document or 'documents' for all documents.
 * @param {string} _id - The ID of the document to find (only needed if :doc is "document").
 * @returns {object} 200 - The document found or a list of all documents.
 * @returns {object} 400 - Bad request if the ID format is incorrect or if :doc is invalid.
 * @returns {object} 404 - Document not found if the ID does not exists (only for specific document retrieval)
 * @returns {object} 500 - Server error if the request fails.
 */
router.get('/find/:doc/:_id', readTask)

/**
 * @route POST /create-task
 * @description Create a new task and save it to the database.
 * @param {object} task - The task data to be created.
 * @param {string} task.title - The title of the task.
 * @param {string} task.clasification - The clasificacion of the task, must be 'Normal' or 'Muy importante'.
 * @param {array<object>} task.list - An array of sub-tasks associated with the task.
 * @param {string} task.list.task - The title of the sub-task.
 * @param {boolean} task.list.done - The status of the sub-task, whether it's done (true) or not (false).
 * @returns {object} 201 - The document has been successfully created and saved.
 * @returns {object} 400 - Bad request if the data is invalid or empty.
 * @returns {object} 404 - Document not saved.
 * @returns {object} 500 - Server error if the request fails.
 */
router.post('/create-task', createTask)

/**
 * @route PUT /update-task/:-_id
 * @description Updates a specific task in the database.
 * @param {string} _id - The ID of the task to be updated.
 * @param {object} task - The task data to be updated.
 * @param {string} task.title - The title of the task.
 * @param {string} task.clasification - The clasificacion of the task, must be 'Normal' or 'Muy importante'.
 * @param {array<object>} task.list - An array of sub-tasks associated with the task.
 * @param {string} task.list.task - The title of the sub-task.
 * @param {boolean} task.list.done - The status of the sub-task, whether it's done (true) or not (false).
 * @returns {object} 200 - The document has been updated successfully.
 * @returns {object} 400 - The ID format is invalid or empty.
 * @returns {object} 404 - Task not found with the provided ID.
 * @returns {object} 500 - Server error if the request fails.
 */
router.put('/update-task/:_id', updateTask)

/**
 * @route DELETE /delete-task/:_id
 * @description Deletes a specific task from the database.
 * @param {string} _id - The ID of the task to be deleted.
 * @returns {object} 200 - The document has been deleted successfully.
 * @returns {object} 400 - The ID format is invalid or empty.
 * @returns {object} 404 - Task not found with the provided ID.
 * @returns {object} 500 - Server error if the request fails.
 */
router.delete('/delete-task/:_id', deleteTask)

module.exports = router