import { showModal } from "../utils/modal-toggle.js"
import { reload } from "./reload.js"

document.addEventListener('DOMContentLoaded', () => {
    const modalTitle = document.getElementById('title-alert-modal')
    const modalMessage = document.getElementById('message-alert-modal')
    const confirmButton = document.getElementById('confirm-update-task-modal')
    const updateForm = document.getElementById('form-update-task-modal')
    const updateContainer = ['content-on-course', 'content-unstarted', 'content-completed']

    if (!confirmButton || !modalTitle || !modalMessage || !updateForm) return

    // Set event
    confirmButton.addEventListener('click', () => {
        const itemId = confirmButton.dataset?.id
        if (!itemId) return

        const formData = new FormData(updateForm)
        const updatedValues = transformData(Object.fromEntries(formData.entries()))

        confirmUpdate(itemId, updatedValues, modalTitle, modalMessage)
    })

    // Use event delegation (AÑADIENDO NUEVO)
    updateContainer.forEach(name => {
        const container = document.querySelector(`[name="${name}"]`)
        if (!container) return

        container.addEventListener('click', (event) => {
            const target = event.target

            if (target.type === 'checkbox') return
            if (target.tagName === 'LABEL') {
                const checkbox = document.getElementById(target.getAttribute('for'))
                if (checkbox) return
            }

            event.preventDefault()

            const isButton = event.target.name === 'update-card'
            const itemId = event.target.dataset.id
            const form = event.target.closest('form')

            if (!isButton || !itemId || !form) return

            const updatedValues = transformDataFromCard(form)
            confirmUpdate(itemId, updatedValues, modalTitle, modalMessage)
        })
    })
})

/**
 * Prepares and formats the values from the card form.
 * @param {HTMLFormElement} form - The form element containing the card details.
 * @returns The formatted data.
 */
function transformDataFromCard(form) {
    const taskTitle = form.querySelector('#card-header h3').innerText.trim()
    const taskClasification = form.dataset.clasification
    const taskObservation = form.querySelector('#card-footer div textarea').value
    const inputs = form.querySelectorAll('#input-group')

    const task = {
        task: {
            title: taskTitle || '',
            clasification: taskClasification || '',
            observation: taskObservation.charAt(0).toUpperCase() + taskObservation.slice(1) || '',
            list: [],
        }
    }

    inputs.forEach(group => {
        const checkbox = group.querySelector('input[type="checkbox"]')
        const label = group.querySelector('label')

        if (checkbox && label) {
            task.task.list.push({
                task: label.innerText.trim(),
                done: checkbox.checked,
            })
        }
    })

    return task
}

/**
 * Prepares and formats the values from the form.
 * @param {Object} data - The object containing the form values.
 * @returns {Object} The formatted data.
 */
function transformData(data) {
    const task = {
        task: {
            title: data['update-title-task'],
            clasification: data['update-clasification'],
            observation: '',
            list: [],
        }
    }

    // Regular expression to capture the dynamic index
    const taskRegex = /^update-input-group-(\d+)$/
    const newTaskRegex = /^update-input-group-new-(\d+)$/

    // Iterate over the object keys
    for (let key in data) {
        let matchTask = key.match(taskRegex)
        let matchNewTask = key.match(newTaskRegex)

        if (matchTask && data[key]) {
            // Add the existing task
            task.task.list.push({
                task: data[key].charAt(0).toUpperCase() + data[key].slice(1),
                done: data[`update-input-group-sel-${matchTask[1]}`] === 'true'
            })
        } else if (matchNewTask && data[key]) {
            // Add new task
            task.task.list.push({
                task: data[key].charAt(0).toUpperCase() + data[key].slice(1),
                done: data[`update-input-group-new-sel-${matchNewTask[1]}`] === 'true'
            })
        }
    }

    return task
}

/**
 * Updates the specified task.
 * @param {String} itemId - The ID of the task to update.
 * @param {Object} updatedValues - An object containig the updated task details.
 * @param {HTMLElement} modalTitle - The HTML element for the modal title.
 * @param {HTMLElement} modalMessage - The HTML element for the modal message.
 * @returns {void}
 */
async function confirmUpdate(itemId, updatedValues, modalTitle, modalMessage) {
    try {
        const res = await updateTask(itemId, updatedValues)

        if (!res.updated) {
            modalTitle.innerHTML = 'Tarea actualizada exitosamente'
            modalMessage.innerHTML = 'La tarea y subtareas se han actualizado correctamente.'

            reload()
        } else {
            modalTitle.innerHTML = 'Error'
            modalMessage.innerHTML = 'No se pudo actualizar la informacion de la tarea especificada.'
        }

        showModal('#alert-modal')
    } catch (err) {
        console.error('Error ', err)
    }
}

/**
 * Sends a request to update the specified task.
 * @param {String} itemId - The ID of the task to be updated.
 * @param {Object} updatedValues - An object containing the updated task details.
 * @returns {Object} The response object.
 */
async function updateTask(itemId, updatedValues) {
    try {
        const res = await axios.put(`http://localhost:3001/update-task/${itemId}`, updatedValues)
        return res
    } catch (err) {
        console.log('Axios error: ', err)
        return null
    }
}