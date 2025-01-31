const mongoose = require('mongoose')
const TaskModel = require('../models/task')

/**
 * Reads an specific document by ID or retrieves all documents based on the provided parameters.
 * @param {object} req - The request object.
 * @param {string} req.params.doc - The type of document to retrieve ("document" for a specific document or "documents" for all).
 * @param {string} [req.params._id] - The ID of the specific document to retrieve (optional for retrieving all documents).
 * @param {object} res - The response object.
 * @returns {object} 200 - Returns the required document(s) in JSON format.
 * @returns {object} 400 - Bad request if the required parameters are missing or invalid.
 * @returns {object} 404 - Data not found.
 * @returns {object} 500 - Server error if the request fails.
 */
const readTask = async (req, res) => {
    const { doc, _id } = req.params

    try {
        if (doc === 'document') {
            if (!_id) return res.status(400).send({ read: false, message: 'ID is required' })
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(400).send({ read: false, message: 'Invalid ObjectId format' })
            }

            const data = await TaskModel.find({ _id })

            if (!data) {
                return res.status(404).send({ read: false, message: 'Task not found' })
            }

            return res.status(200).send({ data, read: true, message: 'Document found' })
        } else if (doc === 'documents') {
            const data = await TaskModel.find({})

            if (!data || data.length === 0) {
                return res.status(404).send({ read: false, message: 'No documents found' })
            }

            return res.status(200).send({ data, read: true, message: 'Documents retrieved' })
        }
    } catch (err) {
        console.error(err.message)
        return res.status(500).send({ read: false, message: 'Error retrieving data' })
    }
}

/**
 * Creates a new document in the database.
 * @param {object} req - The request object containing the task data.
 * @param {object} req.body - The task data to be created.
 * @param {object} req.body.task - The task data to be updated.
 * @param {string} req.body.task.title - The title of the task.
 * @param {string} req.body.task.clasification - The clasificacion of the task, must be 'Normal' or 'Muy importante'.
 * @param {array<object>} req.body.task.list - An array of sub-tasks associated with the task.
 * @param {string} req.body.task.list.task - The title of the sub-task.
 * @param {boolean} req.body.task.list.done - The status of the sub-task, whether it's done (true) or not (false).
 * @param {object} res - The response object.
 * @returns {object} 201 - The document has been created successfully.
 * @returns {object} 400 - Bad request if required fields are missing or empty.
 * @returns {object} 404 - Failed to create document.
 * @returns {object} 500 - Server error if the request fails.
 */
const createTask = async (req, res) => {
    if (!req.body.task || !req.body.task.title || !req.body.task.clasification) {
        return res.status(400).send({ saved: false, message: 'Missing required fields' })
    }

    const { task } = req.body

    try {
        const data = await TaskModel.create(task)

        if (!data) {
            return res.status(404).send({ saved: false, message: 'Not saved' })
        }

        return res.status(201).send({ data, saved: true, message: 'Saved succesfully' })
    } catch (err) {
        console.error(err.message)
        return res.status(500).send({ saved: false, message: 'Not saved' })
    }
}

/**
 * Updates a task based on the provided ID.
 * @param {object} req - The request object containing the updated task data.
 * @param {string} req.params._id - The ID of the task to be updated.
 * @param {object} req.body - The updated task data.
 * @param {object} req.body.task - The task details to be updated.
 * @param {string} req.body.task.title - The title of the task.
 * @param {string} req.body.task.clasification - The clasificacion of the task, must be 'Normal' or 'Muy importante'.
 * @param {array<object>} req.body.task.list - An array of sub-tasks associated with the task.
 * @param {string} req.body.task.list.task - The title of the sub-task.
 * @param {boolean} req.body.task.list.done - The status of the sub-task, whether it's done (true) or not (false).
 * @param {object} res - The response object.
 * @returns {object} 200 - The document has been updated successfully.
 * @returns {object} 400 - Bad request if required fields are missing or invalid.
 * @returns {object} 404 - Document updating failed.
 * @returns {object} 500 - Server error if the request fails.
 */
const updateTask = async (req, res) => {
    const { _id } = req.params
    const { task } = req.body

    if (!_id) {
        return res.status(400).send({ updated: false, message: 'ID is required' })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send({ updated: false, message: 'Invalid ObjectId format' })
    }

    try {
        const data = await TaskModel.findOneAndUpdate(
            { _id },
            { $set: task },
            { returnDocument: "after", runValidators: true }
        )

        if (!data) {
            return res.status(404).send({ updated: false, message: 'Task not found' })
        }

        return res.status(200).send({ data, updated: true, message: 'Updated successfully' })
    } catch (err) {
        console.error(err.message)
        return res.status(500).send({ updated: false, message: 'Update failed' })
    }
}

/**
 * Deletes a task based on the provided ID.
 * @param {object} req - The request object.
 * @param {string} req.params._id - The ID of the task to be deleted.
 * @param {object} res - The response object.
 * @returns {object} 200 - The document has been deleted successfully.
 * @returns {object} 400 - Bad request if the ID format is invalid or empty.
 * @returns {object} 404 - Task not found with the provided ID.
 * @returns {object} 500 - Server error if the request fails.
 */
const deleteTask = async (req, res) => {
    try {
        const { _id } = req.params

        if (!_id) {
            return res.status(400).send({ deleted: false, message: 'ID is required' })
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ deleted: false, message: 'Invalid ObjectId format' })
        }

        const data = await TaskModel.findByIdAndDelete(_id)

        if (!data) {
            return res.status(404).send({ deleted: false, message: 'Delete failed' })
        }

        return res.status(200).send({ data, deleted: true, message: 'Deleted successfully' })
    } catch (err) {
        console.error(err.message)
        return res.status(500).send({ deleted: false, message: 'Delete failed' })
    }
}

module.exports = { createTask, updateTask, deleteTask, readTask }