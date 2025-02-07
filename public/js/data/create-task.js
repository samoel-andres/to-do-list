import { showModal } from "../utils/modal-toggle.js"
import { reload } from "./reload.js"

document.addEventListener('DOMContentLoaded', () => {
    const modalTitle = document.getElementById('title-alert-modal')
    const modalMessage = document.getElementById('message-alert-modal')
    const confirmButton = document.getElementById('save-task-modal')
    const newTaskForm = document.getElementById('form-new-task-modal')

    if (!confirmButton || !modalTitle || !modalMessage || !newTaskForm) return

    // Use event delegation
    confirmButton.addEventListener('click', () => {
        const formData = new FormData(newTaskForm)
        const taskData = transformData(Object.fromEntries(formData.entries()))

        if (taskData.task.list.length !== 0) {
            const taskData = transformData(Object.fromEntries(formData.entries()))
            const res = createTask(taskData)

            if (!res.saved) {
                modalTitle.innerHTML = 'Registro exitoso'
                modalMessage.innerHTML = 'El registro se ha realizado correctamente.'
                
                reload()
            } else {
                modalTitle.innerHTML = 'Error'
                modalMessage.innerHTML = 'Ha ocurrido un error, el registro no se pudo realizar.'
            }
        } else {
            modalTitle.innerHTML = 'Error'
            modalMessage.innerHTML = 'Lo sentimos, es necesario que registre al menos una subtarea.'
        }
        showModal('#alert-modal')
    })
})

/**
 * Formats the provided data into the required strucure.
 * @param {Object} data - The input data to be formatted.
 * @returns The formatted object with the required structure.
 */
function transformData(data) {
    const task = {
        task: {
            title: data['title-task'],
            clasification: data['clasification'],
            observation: '',
            list: [],
        }
    }

    // Regular expression to capture the dynamic index
    const taskRegex = /^input-group-(\d+)$/

    // Iterate over the object keys
    for (let key in data) {
        let matchTask = key.match(taskRegex)

        if (matchTask && data[key]) {
            // Add the existing task
            task.task.list.push({
                task: data[key].charAt(0).toUpperCase() + data[key].slice(1),
                done: data[`input-group-sel-${matchTask[1]}`] === 'true'
            })
        }
    }

    return task
}

/**
 * Sends a request to create an item.
 * @param {Object} data - An object containing the response data.
 * @returns A response object.
 */
async function createTask(data) {
    try {
        const res = await axios.post('http://localhost:3001/create-task', data)
        return res
    } catch (err) {
        console.log('Axios error: ', err)
        return null
    }
}