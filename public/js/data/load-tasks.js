import { appendElement } from "../utils/append-elements.js"
import { showModal } from "../utils/modal-toggle.js"

document.addEventListener('DOMContentLoaded', () => {
    const modalTitle = document.getElementById('title-alert-modal')
    const modalMessage = document.getElementById('message-alert-modal')

    loadTaskData(modalTitle, modalMessage)
})

/**
 * Counts the task in the given sub-task list.
 * @param {Array<Object>} list - The sub-task list to count.
 * @returns {String} The total number of task in format done/total items.
 */
function countTask(list) {
    let all = 0
    let done = 0
    if (list) {
        all = list.length
        list.forEach(item => {
            if (item.done) {
                done++
            }
        })
    }

    return `${done}/${all}`
}

/**
 * Prepares an array of configuration objects to create and add elements to the DOM.
 * @param {Array<Object>} data - The list of tasks retrieved from the database.
 * @returns {Array<Object>} An array of configuration objects to be used for creating and adding elements to the DOM.
 */
function prepareConfigurationObject(data) {
    let objectConfig = []

    if (data) {
        data.forEach((item, index) => {
            objectConfig.push({
                element: {
                    element: 'tr',
                    children: [
                        {
                            element: 'td',
                            id: item._id,
                            text: index + 1,
                        },
                        {
                            element: 'td',
                            text: item.title.toUpperCase(),
                        },
                        {
                            element: 'td',
                            text: countTask(item.list),
                        }
                        ,
                        {
                            element: 'td',
                            text: item.clasification,
                        },
                        {
                            element: 'td',
                            class: 'display-flex h-around',
                            children: [
                                {
                                    element: 'a',
                                    class: 'border-radius-2',
                                    id: 'update-item',
                                    name: 'update-item',
                                    dataAttributes: { id: item._id },
                                    children: [
                                        {
                                            element: 'i',
                                            class: 'bi bi-pen fs-2',
                                        }
                                    ]
                                },
                                {
                                    element: 'a',
                                    class: 'border-radius-2',
                                    id: 'drop-item',
                                    name: 'drop-item',
                                    dataAttributes: { id: item._id },
                                    children: [
                                        {
                                            element: 'i',
                                            class: 'bi bi-trash fs-2',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            })
        })
    }

    return objectConfig
}

/**
 * Loads the data into the table.
 * @returns {Array<Object>} An array objects containing the data retrieved from the database.
 */
export async function loadTaskData(modalTitle, modalMessage) {
    const data = await fetchTaskData()

    if (data) {
        const objectConfig = prepareConfigurationObject(data)
        objectConfig.forEach(objectConfig => appendElement(objectConfig.element, 'taskList'))
    } else {
        modalTitle.innerHTML = 'Sin registros'
        modalMessage.innerHTML = 'Actualmente no hay tareas registradas. Comience agregando una para gestionarlas mejor.'
        showModal('#alert-modal')
    }
}

/**
 * Fetches the list of documents from the server and processes the data.
 * - Sends a GET request to retrieve all documents.
 * - Checks if the response is marked as readable ('read').
 * - Updates the task list and appends elements to the DOM using the configuration objects.
 * @returns {void}
 */
export async function fetchTaskData() {
    try {
        const res = await axios.get('http://localhost:3001/find/documents/all')
        if (!res.data) return

        const { data, read, message } = res.data

        if (read) {
            return data
        } else {
            console.log(message)
            return null
        }
    } catch (err) {
        console.error('Axios error: ', err)
        return null
    }
}

/**
 * Fetches a specific document from the server and processes the data.
 * - Sends a GET request to retrieve the task.
 * - Checks if the response is marked as readable ('read').
 * @returns {void}
 */
export async function fetchTask(itemId) {
    try {
        const res = await axios.get(`http://localhost:3001/find/document/${itemId}`)
        const { data, read, message } = res.data

        if (read) {
            return data
        } else {
            console.log(message)
            return null
        }
    } catch (err) {
        console.error('Axios error: ', err)
        return null
    }
}