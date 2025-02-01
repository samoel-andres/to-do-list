import { showModal } from "../utils/modal-toggle.js"

document.addEventListener('DOMContentLoaded', () => {
    const modalTitle = document.getElementById('title-alert-modal')
    const modalMessage = document.getElementById('message-alert-modal')
    const confirmButton = document.getElementById('confirm-drop-task-modal')

    if (!confirmButton || !modalTitle || !modalMessage) return

    // Use event delegation
    confirmButton.addEventListener('click', () => {
        const itemId = confirmButton.dataset?.id
        if (!itemId) return

        confirmDelete(itemId, modalTitle, modalMessage)
    })
})

/**
 * Deletes a specified task.
 * @param {String} itemId - The ID of the task to be deleted.
 * @param {HTMLElement} modalTitle - The HTML element for the modal title.
 * @param {HTMLElement} modalMessage - The HTML element for the modal message.
 * @returns {void}
 */
async function confirmDelete(itemId, modalTitle, modalMessage) {
    try {
        const res = await deleteTask(itemId)

        if (!res.deleted) {
            modalTitle.innerHTML = 'Tarea eliminada exitosamente'
            modalMessage.innerHTML = 'La tarea y subtareas se ha eliminado correctamente.'
        } else {
            modalTitle.innerHTML = 'Error'
            modalMessage.innerHTML = 'No se pudo eliminar la tarea especificada.'
        }

        showModal('#alert-modal')
    } catch (err) {
        console.error('Error ', err)
    }
}

/**
 * Sends a request to delete the specified task.
 * @param {String} itemId - The ID of the task to be deleted.
 * @returns {Object} The response object.
 */
async function deleteTask(itemId) {
    try {
        const res = await axios.delete(`http://localhost:3001/delete-task/${itemId}`)
        return res
    } catch (err) {
        console.log('Axios error: ', err)
        return null
    }
}